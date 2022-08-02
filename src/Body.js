import { loadStdlib } from "@reach-sh/stdlib"
import * as backend from './build/index.main.mjs';

import React, { useEffect, useState } from "react"
import AxiosConstructor from "axios"

import {ReactComponent as IntroImg} from "./images/intro-div-img.svg"
import {ReactComponent as GearImg} from "./images/gear.svg"

import "./spinner/Spinner.css"
import Spinner from "./spinner/Spinner"
import Collapsible from "react-collapsible"

import { CSRF_TOK } from "./App.js";
import { globalReachAccount, globalConnectedAddress, sendAlgo, getLastBlock } from "./Header"
import { textStyle, flexStyle } from "./styleFuncs"

const REACT_APP_CONNECTOR = process.env.REACT_APP_CONNECTOR
const REACT_APP_ADMIN_ADDRESS = process.env.REACT_APP_ADMIN_ADDRESS
const REACT_APP_URL = process.env.REACT_APP_URL

const stdlib = loadStdlib("ALGO")

const Axios = AxiosConstructor.create()
const Axios2 = AxiosConstructor.create()
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = process.env.REACT_APP_ORIGIN

let isModalShownOnRerender = 0 // when state is set, whether to show modal
let wagerDefaultValueOnRerender = 5 // when state is set, wager displayed in wager box
let wagerDisableStatusOnRerender = false // when wager submitted, state is set, so wager value must not be changed
let globalContractId // contract ID, used by Alice alone
let globalSlug // slug, used by Alice alone
// globalReachAccount and globalConnectedAddress are used by both Alice and Bob, though
let isHandleContractBegun = false // if user already has game, used to prevent "handle contract" function from being called more than once
let globalGameLink
let mayCheckOutcome = 0

const timeControls = [0, "¼", "½", "¾", 1, 1.5, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30, 35, 40, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180]
const timeIncrements = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30, 35, 40, 45, 60, 90, 120, 150, 180]
const REACT_APP_CONTRACT_DEADLINE = Number(process.env.REACT_APP_CONTRACT_DEADLINE)

let visibilityChange
let allowEnterOnPageFocus = true
if (typeof document.hidden !== "undefined") {
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  visibilityChange = "webkitvisibilitychange";
}

const tryCheckOutcome = async () => {
  if (document.visibilityState === "visible" && allowEnterOnPageFocus && mayCheckOutcome){
    allowEnterOnPageFocus = false
    let res
    try {
      res = (await Axios2.get("https://lichess.org/game/export/" + mayCheckOutcome, {headers: {"Content-Type": "application/x-chess-pgn"}, params: {moves: false, clocks: false, evals: false, opening: false}})).data
    } catch (_) {}
    setTimeout(() => {allowEnterOnPageFocus = true}, 5000)
    if (res === undefined) return
    if (!res.includes("Unterminated")) {
      mayCheckOutcome = 0
    }
  }
}
document.addEventListener(visibilityChange, async () => {
  await tryCheckOutcome()
})


export default function Body(props) {

  const [IS_LAPTOP, IS_TABLET, IS_PHONE] = props.devices

  const [isLoading, setIsLoading] = useState(props.loading) // isLoading is a prop assigned to a loadingButton; if the values match, the button loads. On first render, "create/join game" is loading
  const [newGameView, setNewGameView] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [canAbort, setCanAbort] = useState(false)
  const [timeVals, setTimeVals] = useState((() => {
    let vals = localStorage.getItem("preferredTimeControls")
    if (vals === null) vals = [9, 3]
    else vals = JSON.parse(vals)
    return vals
  })())
  const [isTimed, setIsTimed] = useState(localStorage.getItem("preferredIsTimed") === "true" || localStorage.getItem("preferredIsTimed") === null)

  useEffect(() => {
    Axios.defaults.withCredentials = true
    Axios.defaults.headers.common["csrf-token"] = CSRF_TOK
  },
  [CSRF_TOK])

  useEffect(() => {setIsLoading(props.loading)}, [props.loading]) // when loading value changes in App.js, rerender here

  useEffect(() => {
    const func = async () => {
      if (props.alreadyHasGame && !isHandleContractBegun) {
        [globalSlug, globalContractId, wagerDefaultValueOnRerender] = (await Axios.get(REACT_APP_URL + "/api/getexistinggame", {params: {p1: globalConnectedAddress}})).data
      }
      setNewGameView(props.alreadyHasGame ? (props.user === "Alice" ? 3 : 7) : 0)
    }
    func()
  },
  [props.alreadyHasGame])

  useEffect(() => { // if there is no connected address, disable create game button
    const createGameButton = document.getElementById("create-game")
    if (globalConnectedAddress) {
      createGameButton.classList.remove("disabled")
    } else {
      createGameButton.classList.add("disabled")
    }
  })

  useEffect(() => {
    localStorage.setItem("preferredIsTimed", isTimed)
    const vals = JSON.stringify(timeVals)
    if (vals !== "[0,0]") localStorage.setItem("preferredTimeControls", vals)
  },
  [timeVals, isTimed])

  const LoadingButton = (buttonProps) => { // if loading ID matches isLoading variable, create a div with spinner inside, else button
      const {text, ...newProps} = buttonProps
      return (
            (isLoading === buttonProps.loadingid) ?
            <div className={buttonProps.className + " loading-div"} style={buttonProps.style}>
              <Spinner />
              <button {...newProps} style={{display: "none"}}>{text}</button>
            </div> :
            <button {...newProps}>{text}</button>
      )
  }

  const getContractStage = async (ctc) => { // get contract view as in rsh file
    let check = JSON.parse(JSON.stringify(await ctc.views.stage()))[1]
    if (check !== null) check = parseInt(check.hex, 16)
    return check
  }
  const getContractOutcome = async (ctc) => { // get contract view as in rsh file
    let check = JSON.parse(JSON.stringify(await ctc.views.outcome()))[1]
    if (check !== null) check = parseInt(check.hex, 16)
    return check
  }

  const waitUntilStageNoLongerEquals = async (ctc, which) => { // checks once every second
    let check = await getContractStage(ctc)
    while (check === which || check === null) {
      check = await getContractStage(ctc)
      if (check === which || check === null) await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }


  const call = async (f) => {
    let res
    try {
      res = await f()
    } catch (e) {
      const errMsg = JSON.stringify(e.message)
      if (errMsg.includes("User has rejected")) setErrorMessage("Error: The user rejected the transaction request.")
      else if (errMsg.includes("overspend")) setErrorMessage("Error: Overspend. Please make sure you have enough ALGO!")
      return [res, errMsg]
    }
    return [res, null]
  }

  const cancelGame = async () => {
    setErrorMessage("")
    setNewGameView(6)
    const ctc = globalReachAccount.contract(backend, globalContractId)
    const aliceAPI = ctc.apis.PlayerAPI
    const res = await call(() => aliceAPI.bobPaysWager(1))
    if (res[0]) {
      await Axios.post(REACT_APP_URL + "/api/declinegame", {
        contract: globalContractId
      })
      setNewGameView(7)
    } else {
      setNewGameView(4)
    }
  }

  const abortGame = async () => {
    const tempCtc = props.user === "Alice" ? globalContractId : props.contractSetByOpponent
    setErrorMessage("")
    setNewGameView(props.user === "Alice" ? 14 : 8)
    const ctc = globalReachAccount.contract(backend, tempCtc)
    const aliceAPI = ctc.apis.PlayerAPI
    const res = await call(() => aliceAPI.sendOutcome(1, 0))
    if (res[0]) {
      await Axios.post(REACT_APP_URL + "/api/declinegame", {
        contract: tempCtc
      })
      setNewGameView(props.user === "Alice" ? 12 : 6)
    } else {
      setNewGameView(props.user === "Alice" ? 8 : 2)
    }
  }


  const handleAliceContract = async (usingButton) => {
    

    const inputEle = document.getElementById("wager-input")
    let wager = parseFloat(inputEle.value)
    if (isNaN(wager) || !isFinite(wager) || wager == 0 || wager < 0.000001) return
    inputEle.disabled = true
    wagerDisableStatusOnRerender = true // once state is set after clicking "wager," this prevents the input field from becoming editable again

    if (!usingButton) {
      wager = wagerDefaultValueOnRerender
    } else {
      setIsLoading(2)
      setErrorMessage("")
      wagerDefaultValueOnRerender = wager
    }

    
    if (!props.alreadyHasGame) {
      let ctcInfo
      
      ctcInfo = (await Axios.get(REACT_APP_URL + "/api/mustoptin", {params: {who: globalConnectedAddress}})).data[0]
      if (ctcInfo === 0) {
        setNewGameView(1)
        const accepted = await sendAlgo(REACT_APP_ADMIN_ADDRESS, 100000)
        if (!accepted[0]) {
          wagerDisableStatusOnRerender = false
          if (accepted[1].includes("overspend")) setErrorMessage("Error: Overspend. Please make sure you have enough ALGO!")
          if (accepted[1].includes("User has rejected")) setErrorMessage("Error: The user rejected the transaction request.")
          setIsLoading(0)
          setNewGameView(0)
          return
        }
        setNewGameView(2)
        ctcInfo = (await Axios.post(REACT_APP_URL + "/api/newcontract", {p1: globalConnectedAddress})).data[0]
      }
      if (isTimed) {
        globalSlug = Number((await Axios.post(REACT_APP_URL + "/api/newgame", { // only after this point will Alice be able to reload and continue
          contract: ctcInfo,
          p1: globalConnectedAddress,
          wager: wager,
          gameVariant: Number(localStorage.getItem("preferredVariant")),
          timeControl: (timeControls[timeVals[0]] === "¾") ? 0.75 : (timeControls[timeVals[0]] ===  "½") ? 0.5 : (timeControls[timeVals[0]] ===  "¼") ? 0.25 : timeControls[timeVals[0]],
          timeIncrement: timeIncrements[timeVals[1]],
        })).data)
      } else {
        globalSlug = Number((await Axios.post(REACT_APP_URL + "/api/newgame", { // only after this point will Alice be able to reload and continue
          contract: ctcInfo,
          p1: globalConnectedAddress,
          wager: wager,
          gameVariant: Number(localStorage.getItem("preferredVariant")),
          timeControl: 0,
          timeIncrement: 0
        })).data)
      }
      globalContractId = ctcInfo
    }

    const ctc = globalReachAccount.contract(backend, globalContractId)
    const aliceAPI = ctc.apis.PlayerAPI

    if (await getContractStage(ctc) === 0) {
      setIsLoading(0)
      setNewGameView(3)
      let callAccepted = await call(() => aliceAPI.alicePaysWager(stdlib.parseCurrency(wager), REACT_APP_CONTRACT_DEADLINE)) // wait until Alice pays
      if (!callAccepted[0]) {
        await Axios.post(REACT_APP_URL + "/api/declinegame", {
          contract: globalContractId
        })
        if (callAccepted[1].includes("User has rejected")) {
          setNewGameView(0)
          wagerDisableStatusOnRerender = false
          return
        } else if (callAccepted[1].includes("overspend")) {
          setNewGameView(0)
          wagerDisableStatusOnRerender = false
          return
        }
      }
      await waitUntilStageNoLongerEquals(ctc, 0)
    }

    if (await getContractStage(ctc) === 1) {
      setIsLoading(0)
      setNewGameView(4)
      await waitUntilStageNoLongerEquals(ctc, 1)
    }

    if (await getContractStage(ctc) === 0) {
      if (newGameView !== 4) return
      setNewGameView(5)
      return
    }

    const gameID = (await Axios.get(REACT_APP_URL + "/api/getgameurl", {params: {contract: globalContractId}})).data
    globalGameLink = "https://lichess.org/" + gameID + ((globalSlug % 2 === 0) ? "?color=white" : "?color=black")

    setNewGameView(13)
    mayCheckOutcome = gameID
    tryCheckOutcome()
    let interval
    let interval2
    interval = setInterval(() => {
      if (!mayCheckOutcome) {
        Axios.post(REACT_APP_URL + "/api/processgame", {
          slug: globalSlug,
          contract: globalContractId,
          gameID: gameID
        })
        setCanAbort(false)
        clearInterval(interval)
        clearInterval(interval2)
      }
    }, 2000)
    interval2 = setInterval(async () => {
      const res = (await call(async () => aliceAPI.sendOutcome(3, await getLastBlock())))[1]
      if (res.includes("err2")) return
      clearInterval(interval2)
      setCanAbort(true)
    }, 2000)

    await waitUntilStageNoLongerEquals(ctc, 2) // wait until game over
    clearInterval(interval)
    clearInterval(interval2)
    let res = await getContractOutcome(ctc)
    if (res === 6) {
      console.log("Timeout violation: Player 2 forfeit")
      res = 3
    } else if (res === 5) {
      console.log("Timeout violation: Player 1 forfeit")
      res = 3
    }
    setNewGameView(res + 9) // 9: win, 10: draw, 11: lose, 12: timeout

  }

  const handleBobContract = async (accepted) => {
    const ctc = globalReachAccount.contract(backend, props.contractSetByOpponent)
    const bobAPI = ctc.apis.PlayerAPI
    let gameID
    if (!accepted) {
      Axios.post(REACT_APP_URL + "/api/declinegamemakecall", {
        contract: props.contractSetByOpponent
      }).then((res) => {
        window.location.reload()
      })
    } else {
      
      if (!props.alreadyHasGame) {

        setIsLoading(2)
        setErrorMessage("")
        gameID = (await Axios.post(REACT_APP_URL + "/api/acceptgame", {
          slug: props.slug,
          address: globalConnectedAddress,
          contract: props.contractSetByOpponent,
          gameVariant: props.variantSetByOpponent,
          timeControl: props.timeControlSetByOpponent,
          timeIncrement: props.timeIncrementSetByOpponent
        })).data
        globalGameLink = "https://lichess.org/" + gameID + ((props.slug % 2 === 1) ? "?color=white" : "?color=black")
        if (gameID === "") return // should never happen 
        setIsLoading(0)

        setNewGameView(1)
        let callAccepted = await call(() => bobAPI.bobPaysWager(0)) // wait until bob pays
        if (!callAccepted[0]) {
          if (callAccepted[1].includes("User has rejected")) {
            setNewGameView(0)
            return
          } else if (callAccepted[1].includes("overspend")) {
            setNewGameView(0)
            return
          }
        }
        await waitUntilStageNoLongerEquals(ctc, 1)
        setNewGameView(7)
      }

      if (gameID === undefined) {
        gameID = (await Axios.get(REACT_APP_URL + "/api/getgameurl", {params: {contract: props.contractSetByOpponent}})).data
        globalGameLink = globalGameLink = "https://lichess.org/" + gameID + ((props.slug % 2 === 1) ? "?color=white" : "?color=black")
      }

      mayCheckOutcome = gameID
      tryCheckOutcome()
      let interval
      let interval2
      interval = setInterval(() => {
        if (!mayCheckOutcome) {
          Axios.post(REACT_APP_URL + "/api/processgame", {
            slug: props.slug,
            contract: props.contractSetByOpponent,
            gameID: gameID
          })
          setCanAbort(false)
          clearInterval(interval)
          clearInterval(interval2)
        }
      }, 2000)
      interval2 = setInterval(async () => {
        const res = (await call(async () => bobAPI.sendOutcome(3, await getLastBlock())))[1]
        if (res.includes("err2")) return
        clearInterval(interval2)
        setCanAbort(true)
      }, 2000)

      await waitUntilStageNoLongerEquals(ctc, 2) // wait until game over
      clearInterval(interval)
      clearInterval(interval2)
      let res = await getContractOutcome(ctc)
      if (res === 6) {
        console.log("Timeout violation: Player 2 forfeit")
        res = 3
      } else if (res === 5) {
        console.log("Timeout violation: Player 1 forfeit")
        res = 3
      }
      setNewGameView((res === 3) ? 6 : 5 - res)
    }
  }

  // the 2 functions below handle valid positive decimal input in wager input box. Regardless, make assertion before transacting
  let prevVal = ""
  const handleKeyDown = () => { // store previous valid input
    const inputEle = document.getElementById("wager-input")
    prevVal = inputEle.value
  }
  const handleKeyChange = () => {
    const inputEle = document.getElementById("wager-input")
    let accepted = true
    const curVal = inputEle.value
    const vals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
    let periodCount = 0

    if (curVal.length > 9) accepted = false // max input length of 9
    if (curVal[0] === ".") accepted = false // no decimal in front
    if (parseFloat(curVal) >= 10000000) accepted = false //max 9999999
    if (!accepted) {
        inputEle.value = prevVal
        return
    }

    for (let i = 0; i < curVal.length; i++) {
      if (!vals.includes(curVal[i])) {
        accepted = false
        break
      }
      if (curVal[i] === ".") periodCount += 1
    }
    if (periodCount > 1) accepted = false // only 1 decimal point
    if (!accepted) inputEle.value = prevVal // revert if rejected
  }

  const handleExcessPeriod = () => { // deletes decimal point at end when box unfocused
    const inputEle = document.getElementById("wager-input")
    if (inputEle.value[inputEle.value.length - 1] === ".")
      inputEle.value = inputEle.value.slice(0, inputEle.value.length - 1)
  }
  
  const showModal = async () => { // show modal if create/join button not disabled
    
    const createGameButton = document.getElementById("create-game")
    if (createGameButton.classList.contains("disabled")) return
    if (globalConnectedAddress === "" || Object.keys(globalReachAccount).length === 0) return
    
    const modal = document.getElementById("modal")
    modal.classList.remove("hidden")

    isModalShownOnRerender = 1
    if (!isHandleContractBegun) {
      isHandleContractBegun = true
      if (props.alreadyHasGame === 1) handleAliceContract(false)
      if (props.alreadyHasGame === 2) handleBobContract(true)
    }
  }

  const showSettings = () => {
    const modal = document.getElementById("modal-2")
    modal.classList.remove("hidden")
    isModalShownOnRerender = 2
  }
  
  const hideModal = () => { // hide modal
    const modal = document.getElementById("modal")
    const modal2 = document.getElementById("modal-2")
    modal.classList.add("hidden")
    if (isTimed && timeVals[0] === 0 && timeVals[1] === 0) {
      return
    } else {
      modal2.classList.add("hidden")
    }
    isModalShownOnRerender = 0
  }

  const plsConnectHover = () => { // prompt user to connect if create/join button disabled
    const text = document.getElementById("please-connect-text")
    if (document.getElementById("create-game").classList.contains("disabled")) {
      text.classList.remove("hidden")
    }
  }

  const plsConnectUnhover = () => { // prompt hidden when not hovered
    const text = document.getElementById("please-connect-text")
    text.classList.add("hidden")
  }

  const copyGameLink = () => {
    const text = document.getElementById("copy-game-link")
    text.textContent = "Copied!"
    navigator.clipboard.writeText("https://algochess.xyz/" + globalSlug)
    setNewGameView((x) => x)
  }

  const ErrorMessageIfExists = () => {
    return (
      (errorMessage) &&
      <div style={flexStyle({marginTop: "20px", borderColor: "indianred", borderStyle: "solid", backgroundColor: "indianred", marginBottom: "20px", borderRadius: "5px", padding: "10px", alignItems: "center", justifyContent: "center"})}>
        <span style={textStyle({fontSize: (IS_LAPTOP ? "18px" : IS_TABLET ? "15px" : "12px"), color: "white", fontWeight: "bold"})}>{errorMessage}</span>
      </div>
    )
  }

  // <<< MODAL >>>
  const Modal = () => {

      return (
          <div id="modal" className={"modal-container " + ((isModalShownOnRerender === 1) ? "" : "hidden")}>
              <div style={flexStyle({flexDirection: "column", width: (IS_LAPTOP ? "40vw" : IS_TABLET ? "70vw" : "90vw"), maxWidth: "720px", alignItems: "flex-end"})}>
                  <button className="modal-close-button" onClick={hideModal}>×</button>
                  {(props.user === "Alice") &&
                      <div style={flexStyle({width: "100%", marginTop: "10px", flexDirection: "column", backgroundColor: "var(--dark-blue)", padding: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px"), borderRadius: "10px"})}>
                          <span style={textStyle({fontSize: (IS_LAPTOP ? "40px" : IS_TABLET ? "35px" : "30px"), fontWeight: 200, margin: "0px 0px 30px 0px"})}>Enter wager amount</span>
                          <div style={flexStyle({alignItems: "center", marginBottom: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px")})}>
                              <input style={{marginRight: "15px"}} disabled={wagerDisableStatusOnRerender} defaultValue={wagerDefaultValueOnRerender} className="wager-input" id="wager-input" onBlur={handleExcessPeriod} onKeyDown={handleKeyDown} onChange={handleKeyChange} autoComplete="off"></input>
                              <span style={textStyle({fontWeight: 200}, props.devices)}>ALGO</span>
                          </div>
                          {(newGameView === 0) &&
                            <>
                              <LoadingButton loadingid={2} text="WAGER" className="confirm-wager" style={{marginBottom: (IS_LAPTOP ? "40px" : IS_TABLET ? "33px" : "25px")}} onClick={() => handleAliceContract(true)} />
                              <span style={textStyle({fontSize: (IS_LAPTOP ? "18px" : IS_TABLET ? "15px" : "12px")})}>You will receive a link to share with your friend. The game will automatically begin once both of you have wagered your funds. If either your friend fails to join or the game expires, the funds will be returned.</span>
                            </>
                          }
                          {(newGameView >= 1 && newGameView <= 14) &&
                            <>
                              <div style={flexStyle({backgroundColor: "mintcream", borderRadius: "5px", padding: "10px", alignItems: "center", justifyContent: "center"})}>
                                <span style={textStyle({color: "var(--dark-blue)", fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "16px" : "12px"), fontWeight: ((newGameView > 8) ? "bolder" : "thin")})}>
                                  {(["As this your first time creating a game, a new contract must be deployed. This will cost 0.1 ALGO. Please approve the transaction on your mobile wallet.",
                                  "Deploying the contract...",
                                  "Please sign the transactions to pay the wager.",
                                  "Waiting for Player 2...",
                                  "The wager was declined.",
                                  "Please sign the transaction to cancel the game and reclaim your funds.",
                                  "The game was cancelled.",
                                  "The game is live. After completion, please return here and wait a few seconds.",
                                  "Victory! The winnings will be sent to your wallet.",
                                  "Tie! Your wager will be returned",
                                  "You lose! Good game, and better luck next time!",
                                  "Game aborted: Your wager has been returned.",
                                  "You play the " + ((globalSlug % 2 === 0) ? "white" : "black") + " pieces.",
                                  "Please sign the transaction to abort the game and reclaim your funds."])[newGameView - 1]}
                                </span>
                              </div>
                              {(newGameView === 4 || newGameView === 8) &&
                                <>
                                  <div style={flexStyle({flexDirection: "column", marginTop: "20px", backgroundColor: "mintcream", borderRadius: "5px", padding: "10px", justifyContent: "center"})}>
                                    <span id="copy-game-link" style={textStyle({color: "var(--dark-blue)", fontSize: (IS_LAPTOP ? "15px" : IS_TABLET ? "12px" : "10px")})}>Game link:</span>
                                    <span className="hover-pointer" onClick={copyGameLink} style={textStyle({color: "var(--dark-blue)", fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "16px" : "12px"), fontWeight: "bold"})}>{"algochess.xyz/" + globalSlug}</span>
                                  </div>
                                  <span style={textStyle({marginBottom: "20px", marginTop: "20px", color: "mintcream", fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "16px" : "12px"), fontWeight: "bold"})}><a href={(REACT_APP_CONNECTOR === "MAINNET" ? "https://algoexplorer.io/application/" : "https://testnet.algoexplorer.io/application/") + globalContractId} target="_blank" rel="noopener noreferrer">View contract on AlgoExplorer</a></span>
                                  {(newGameView === 4) && <button className="cancel-game" onClick={cancelGame}>CANCEL GAME</button>}
                                </>
                              }
                              <div style={flexStyle({marginTop: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px"), flexDirection: "column"})}>
                                {
                                  (newGameView === 5 || newGameView === 7 || (newGameView >= 9 && newGameView <= 12)) &&
                                  <button className="declined-dismiss" onClick={() => window.location.reload()}>DISMISS</button>
                                }
                                {
                                  (newGameView === 13) &&
                                  <button className="got-it-button" onClick={() => {setNewGameView(8)}}>GOT IT</button>
                                }
                                {
                                  (newGameView === 8) &&
                                    <div style={flexStyle({flexDirection: "column", alignItems: "center", justifyContent: "center"})}>
                                      <button style={{marginBottom: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px")}} className="join-chess-game" onClick={() => {window.open(globalGameLink, "_blank")}}>JOIN GAME</button>
                                      {(canAbort) && <button style={{marginBottom: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px")}} className="cancel-game" onClick={abortGame}>ABORT GAME</button>}
                                    </div>
                                }
                                {
                                  (newGameView < 5 || newGameView === 6 || newGameView === 8 || newGameView === 14) &&
                                  <Spinner />
                                }
                              </div> 
                            </>
                          }
                          <ErrorMessageIfExists/>
                      </div>
                  }
                  {(props.user === "Bob") &&
                      <div style={flexStyle({width: "100%", marginTop: "10px", flexDirection: "column", backgroundColor: "var(--dark-blue)", padding: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px"), borderRadius: "10px"})}>
                          <span style={textStyle({fontSize: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px")})}>You are challenged by:</span>
                          <span style={textStyle({fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "18px" : "15px"), marginBottom: "20px"})}>{((x) => {return (x === undefined ? null : x.slice(0, 15) + "...")})(props.opponentAddress)}</span>
                          <div style={flexStyle({marginBottom: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px"), alignItems: "center"})}>
                              <span style={textStyle({marginRight: "15px"}, props.devices)}>Wager:</span>
                              <div style={{marginRight: "15px"}} className="display-wager">{props.wagerSetByOpponent}</div>
                              <span style={textStyle({}, props.devices)}>ALGO</span>
                          </div>
                          {(newGameView === 0) ?
                            <>
                              <div style={flexStyle({marginBottom: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px"), alignItems: "center"})}>
                                  <LoadingButton loadingid={2} text="ACCEPT" className="accept-wager" style={{marginRight: "20px"}} onClick={() => handleBobContract(true)} />
                                  <button className="decline-wager" onClick={() => handleBobContract(false)}>DECLINE</button>
                              </div>
                              <span style={textStyle({fontSize: (IS_LAPTOP ? "18px" : IS_TABLET ? "15px" : "12px")})}>The game will automatically begin once you have wagered your funds. If the game expires, the funds wil be returned.</span>
                            </> :
                            <div style={flexStyle({backgroundColor: "mintcream", marginBottom: "20px", borderRadius: "5px", padding: "10px", alignItems: "center", justifyContent: "center"})}>
                              <span style={textStyle({fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "16px" : "12px"), color: "var(--dark-blue)", fontWeight: ((newGameView > 2) ? "bolder" : "thin")})}>{([
                                "Please sign the transactions to pay the wager.",
                                "The game is live. After completion, please return here and wait a few seconds.",
                                "Victory! The winnings will be sent to your wallet.",
                                "Tie! Your wager will be returned",
                                "You lose! Good game, and better luck next time!",
                                "Game aborted: Your wager has been returned.",
                                "You play the " + ((props.slug % 2 === 1) ? "white" : "black") + " pieces.",
                                "Please sign the transaction to abort the game and reclaim your funds."])[newGameView - 1]}</span>
                            </div>
                          }
                          {
                            (newGameView === 2) &&
                            <>
                              <span style={textStyle({marginBottom: "20px", color: "mintcream", fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "16px" : "12px"), fontWeight: "bold"})}><a href={(REACT_APP_CONNECTOR === "MAINNET" ? "https://algoexplorer.io/application/" : "https://testnet.algoexplorer.io/application/") + props.contractSetByOpponent} target="_blank" rel="noopener noreferrer">View contract on AlgoExplorer</a></span>
                              <div style={flexStyle({flexDirection: "column", alignItems: "center", justifyContent: "center"})}>
                                <button style={{marginBottom: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px")}} className="join-chess-game" onClick={() => {window.open(globalGameLink, "_blank")}}>JOIN GAME</button>
                                {(canAbort) && <button style={{marginBottom: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px")}} className="cancel-game" onClick={abortGame}>ABORT GAME</button>}
                              </div>
                            </>
                          }
                          {
                            (newGameView >= 3 && newGameView <= 6) &&
                            <button className="declined-dismiss" onClick={() => window.location.reload()}>DISMISS</button>
                          }
                          {
                            (newGameView === 7) &&
                            <button className="got-it-button" onClick={() => {setNewGameView(2)}}>GOT IT</button>
                          }
                          {
                            (newGameView === 1 || newGameView === 2|| newGameView === 8) &&
                            <Spinner />
                          }
                          <ErrorMessageIfExists/>
                      </div>
                  }
              </div>
          </div>
      )
  }

  const SettingsModal = () => (
    <div id="modal-2" className={"modal-container " + ((isModalShownOnRerender === 2) ? "" : "hidden")}>
      <div style={flexStyle({flexDirection: "column", width: (IS_LAPTOP ? "40vw" : IS_TABLET ? "70vw" : "90vw"), maxWidth: "720px", alignItems: "flex-end"})}>
        <button className="modal-close-button" onClick={hideModal}>×</button>
        <div style={flexStyle({width: "100%", marginTop: "10px", flexDirection: "column", backgroundColor: "var(--dark-blue)", padding: (IS_LAPTOP ? "40px" : IS_TABLET ? "30px" : "20px"), borderRadius: "10px"})}>
          <span style={textStyle({fontSize: (IS_LAPTOP ? "40px" : IS_TABLET ? "35px" : "30px"), fontWeight: 200, margin: `0px 0px ${IS_LAPTOP ? 30 : IS_TABLET ? 25 : 20}px 0px`})}>Game Settings</span>
          <div style={flexStyle({alignItems: "baseline", marginBottom: (IS_LAPTOP ? "20px" : IS_TABLET ? "15px" : "15px")})}>
            <span style={textStyle({fontSize: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px"), fontWeight: 200, marginRight: "auto"})}>Variant:</span>
            <span style={textStyle({fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "18x" : "15px"), fontWeight: 200})}><a href="https://lichess.org/variant" target="_blank" rel="noopener noreferrer">What are these?</a></span>
          </div>
          <div style={flexStyle({flexWrap: "wrap", justifyContent: "space-between"})}>
            {
              (() => {
                const variants = ["Standard", "Crazyhouse", "Chess960", "King of the Hill", "Three-Check", "Antichess", "Atomic", "Horde", "Racing Kings"]
                const ret = []
                let preferred = localStorage.getItem("preferredVariant")
                if (preferred === null) preferred = 0
                for (let i = 0; i < variants.length; i++) {
                  const id_ = "variant-button-"
                  ret.push(
                  <button style={{margin: "3px 3px 3px 3px"}} className={"chess-variants" + ((i === Number(preferred)) ? " ischecked" : "")} key={i} id={id_ + i} onClick={() => {
                    for (let j = 0; j < variants.length; j++) {
                      const ele = document.getElementById(id_ + j)
                      if (j === i) {
                        ele.classList.add("ischecked")
                        localStorage.setItem("preferredVariant", i)
                      } else {
                        ele.classList.remove("ischecked")
                      }
                    }
                  }}>
                    {variants[i]}
                  </button>)
                }
                return ret
              })()
            }
          </div>
          <span style={{marginBottom: "30px"}} />
          <div style={flexStyle({alignItems: "center", marginBottom: "10px"})}>
            <label htmlFor="has-time-control" style={{margin: "0px auto 10px 0px", pointerEvents: "none"}}>
              <span style={textStyle({fontSize: (IS_LAPTOP ? "30px" : IS_TABLET ? "25px" : "20px"), position: "relative", fontWeight: 200})}>Time control:</span>
            </label>
            <input type="checkbox" id="has-time-control" className="checkbox" checked={isTimed} onChange={() => {setIsTimed((x) => !x)}} />
          </div>
          {
            (isTimed) &&
            <>
              <div style={flexStyle({alignItems: "center", marginBottom: "10px"})}>
                <span style={textStyle({fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "18px" : "15px"), fontWeight: 200, margin: "0px auto 0px 0px"})}>Minutes per side:</span>
                <button className="arrow-button left-arrow-button" onClick={() => {
                  setTimeVals((x) => ((x[0] === 0) ? x : [x[0] - 1, x[1]]))
                }}>❮</button>
                <div className="display-wager" style={(JSON.stringify(timeVals) === "[0,0]") ? {color: "indianred"} : {}}>{timeControls[timeVals[0]]}</div>
                <button className="arrow-button right-arrow-button" onClick={() => {
                  setTimeVals((x) => ((x[0] === timeControls.length - 1) ? x : [x[0] + 1, x[1]]))
                }}>❯</button>
              </div>
              <div style={flexStyle({alignItems: "center"})}>
                <span style={textStyle({fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "18px" : "15px"), fontWeight: 200, margin: "0px auto 0px 0px"})}>Increment in seconds:</span>
                <button className="arrow-button left-arrow-button" onClick={() => {
                  setTimeVals((x) => ((x[1] === 0) ? x : [x[0], x[1] - 1]))
                }}>❮</button>
                <div className="display-wager" style={(JSON.stringify(timeVals) === "[0,0]") ? {color: "indianred"} : {}}>{timeIncrements[timeVals[1]]}</div>
                <button className="arrow-button right-arrow-button" onClick={() => {
                  setTimeVals((x) => ((x[1] === timeIncrements.length - 1) ? x : [x[0], x[1] + 1]))
                }}>❯</button>
              </div>
            </>
          }
          

        </div>
      </div>
    </div>
  )

  const Accordion = () => {
    return (
      <div style={flexStyle({justifyContent: "center", alignItems: "center", flexDirection: "column"})}>
          <div>
            <Collapsible trigger="What is this?" transitionTime={200}>
              <p>A simple wagering application on the Algorand blockchain, built around chess.</p>
              <ol>
                <li>Set a wager.</li>
                <li>Send the link you receive to your opponent.</li>
                <li>Winner takes the pot.</li>
              </ol>
            </Collapsible>
            <Collapsible trigger="Why should I trust it?" transitionTime={200}>
              <p>AlgoChess utilizes smart contracts, which allow the wagering process to be executed trustlessly. Not only does this mean that your opponent cannot back out once the game has started, but no other party, including AlgoChess, can access your funds.</p>
            </Collapsible>
            <Collapsible trigger='How exactly do I "connect a wallet?"' transitionTime={200}>
              <ol>
                <li>Download the Pera Algo Wallet on either the <a href="https://apps.apple.com/us/app/algorand-wallet/id1459898525" target="_blank" rel="noopener noreferrer">App Store</a> or the <a href="https://play.google.com/store/apps/details?id=com.algorand.android" target="_blank" rel="noopener noreferrer">Play Store</a> and get an Algorand wallet address.</li>
                {(REACT_APP_CONNECTOR === "MAINNET") ?
                  <li>Purchase some ALGO from within the app or send it over from an exchange.</li> :
                  <>
                    <li>Set your wallet to TestNet mode by clicking on Settings -&gt; Developer Settings -&gt; Node Settings -&gt; TestNet</li>
                    <li>Head over to <a href="https://bank.testnet.algorand.network" target="_blank" rel="noopener noreferrer">this link</a> to get some TestNet ALGO.</li>
                  </>
                }
                <li>Click on the button in the top right corner and use the QR scanner to connect your wallet.</li>
                
                
                
              </ol>
            </Collapsible>
            <Collapsible trigger="What if I get disconnected?" transitionTime={200}>
              <p>Closing your device will not cause you to lose access to the game or your funds. You may pick up wherever you left off.</p>
            </Collapsible>
            <Collapsible trigger="Fees" transitionTime={200}>
              <p>AlgoChess charges a 2% fee on games that were successfully completed. There is also a small one-time fee of 0.1 ALGO during your first game.</p>
            </Collapsible>
            <Collapsible trigger="Timeouts" transitionTime={200}>
              <p>The game must be completed within approximately 4 hours from the time where both participants had paid the wager. After this point, either player may cancel the game, causing the wager to be returned.</p>
            </Collapsible>
            <Collapsible trigger="Contact" transitionTime={200}>
              <p id="copy-username">Made with ♡ by imfeelingitchy. Contact me on Discord—click <u className="copy-username-link" onClick={() => {
                document.getElementById("copy-username-copied").removeAttribute("hidden")
                navigator.clipboard.writeText("imfeelingitchy#3801")
              }}>here</u> to copy my username.</p>
              <p id="copy-username-copied" hidden>Copied!</p>
            </Collapsible>
          </div>
      </div>
    )
  }

  

  return (
      <div style={flexStyle({justifyContent: "center"})}>
          <Modal />
          <SettingsModal />
          <div style={flexStyle({justifyContent: "center", alignItems: "center", flexDirection: "column", width: (IS_LAPTOP ? "50vw" : IS_TABLET ? "70vw" : "90vw"), maxWidth: "720px"})}>
            <div style={flexStyle({justifyContent: "center", marginTop: (IS_LAPTOP ? "80px" : IS_TABLET ? "50px" : "20px")})}>
                <div style={flexStyle({flexDirection: "column", alignItems: "center", whiteSpace: "nowrap"})}>
                    {(REACT_APP_CONNECTOR === "TESTNET") &&
                      <span style={textStyle({color: "var(--light-blue)", fontSize: (IS_PHONE ? "18px" : "20px"), fontWeight: "thin", margin: "0px 0px 10px 0px"})}>(TestNet)</span>
                    }
                    <span style={textStyle({fontSize: (IS_LAPTOP ? "40px" : IS_TABLET ? "35px" : "30px"), fontWeight: "thin", margin: "0px 0px 10px 0px"})}>Simple Chess Wagering</span>
                    <span style={textStyle({fontSize: (IS_PHONE ? "18px" : "20px"), margin: `0px 0px ${IS_LAPTOP ? 40 : IS_TABLET ? 33 : 25}px 0px`})}>Challenge a friend. Winner takes all.</span>
                    <div style={flexStyle({alignItems: "center"})}>
                      <LoadingButton loadingid={1} text={props.alreadyHasGame ? "RESUME GAME" : (props.user === "Alice" ? "CREATE GAME" : "JOIN GAME")} id="create-game" className="create-game-button" onClick={showModal} onMouseEnter={plsConnectHover} onMouseLeave={plsConnectUnhover} />
                      {
                        (props.user === "Alice") &&
                        <button className="settings" onClick={showSettings}>
                          <GearImg height="100%" className="gear"/>
                        </button>
                      }
                    </div>
                    <span style={textStyle({fontSize: (IS_LAPTOP ? "20px" : IS_TABLET ? "16px" : "12px"), marginTop: "10px", marginBottom: "10px"})} id="please-connect-text" className="please-connect-text hidden">Please connect a wallet first.</span>
                </div>
                {(!IS_PHONE) &&
                  <IntroImg width={(IS_LAPTOP ? "300px" : "200px")}/>
                }
            </div>
            <Accordion/>
          </div>
      </div>
      
  )
}

