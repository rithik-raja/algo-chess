'reach 0.1';
'use strict';

export const main = Reach.App(() => {

  const Deployer = Participant('Admin', {
    hasDeployed: Fun([], Null),
    aliceAddress: Address,
    adminAddress: Address,
  })

  const PlayerAPI = API('PlayerAPI', {
    alicePaysWager: Fun([UInt, UInt], Bool),
    bobPaysWager: Fun([UInt], Bool),
    sendOutcome: Fun([UInt, UInt], Bool),
  })

  const vMain = View({stage: UInt, outcome: UInt});

  init()
  Deployer.only(() => {
    const aliceAddress = declassify(interact.aliceAddress)
    const adminAddress = declassify(interact.adminAddress)
  })
  Deployer.publish(aliceAddress, adminAddress)
  Deployer.interact.hasDeployed()


  var prevOutcome = 0
  invariant(balance() == 0)
  while (true) {

    vMain.stage.set(0) // wager not yet sent or previous game outcome decided
    vMain.outcome.set(prevOutcome)
    commit()


    const [[wager, deadline], k1] = call(PlayerAPI.alicePaysWager)
    .check((wager_, _) => {check(this == aliceAddress && wager_ < 10000000000000)})
    .pay((wager_, _) => wager_)
    k1(true)
    if (wager != 0) {
      vMain.stage.set(1) // alice paid
      commit()
      const [[isAbort2], k2] = call(PlayerAPI.bobPaysWager)
      .check((isAbort_) => {check(isAbort_ == 0 || isAbort_ == 1)})
      .pay((isAbort_) => wager * (1 - isAbort_))
      k2(true)
      const bobAddress = this
      if (isAbort2 == 0) {
        vMain.stage.set(2) // bob paid
        commit()
        const endTime = lastConsensusTime() + deadline
        const [[outcome, _], k3] = call(PlayerAPI.sendOutcome)
        .check((outcome_, curTime) => {
          check(curTime < endTime + 2, "err1") // 2 block margin for safety. Use this check to see whether it is safe to abort
          check((this == adminAddress || this == aliceAddress || this == bobAddress) && (outcome_ == 0 || outcome_ == 1 || outcome_ == 2), "err2")
        })
        k3(true)
        
        const timeoutViolation = thisConsensusTime() < endTime && this != adminAddress
        if (this == adminAddress) {
          transfer(wager * (2 - outcome) * 98 / 100).to(aliceAddress)
          transfer(wager * outcome * 98 / 100).to(bobAddress)
          transfer(balance()).to(adminAddress)
          prevOutcome = outcome
          continue
        } else {
          if (timeoutViolation) {
            if (this == aliceAddress) {
              transfer(balance()).to(bobAddress)
              prevOutcome = 5
              continue
            } else {
              transfer(balance()).to(aliceAddress)
              prevOutcome = 6
              continue
            }
          } else {
            transfer(wager).to(aliceAddress)
            transfer(wager).to(bobAddress)
            prevOutcome = 3
            continue
          }
        }

      }
      transfer(wager).to(aliceAddress)
      prevOutcome = 4
      continue
    }
    continue


    
  }


  commit()
  exit()
})
