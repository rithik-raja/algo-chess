import React, { useState } from "react"
import { useEffect } from "react"
import Header from "./Header"
import Body from "./Body"
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"
import Axios from "axios"
import * as backend from './build/index.main.mjs'
import { loadStdlib } from "@reach-sh/stdlib"

import { useMediaQuery } from "react-responsive"

const REACT_APP_ACCOUNT = process.env.REACT_APP_ACCOUNT
const REACT_APP_URL = process.env.REACT_APP_URL

const stdlib = loadStdlib("ALGO")

let redirect = null
let alreadyHasGame = 0
//let UrlsLoaded = false

let opponentAddress
let wagerSetByOpponent
let contractSetByOpponent
let variantSetByOpponent
let timeControlSetByOpponent
let timeIncrementSetByOpponent

let CSRF_TOK
export {CSRF_TOK}

export default function App() {

  const IS_LAPTOP_QUERY = useMediaQuery({minWidth: 1025}, undefined, (isThis) => {SET_IS_LAPTOP(isThis)})
  const IS_TABLET_QUERY = useMediaQuery({minWidth: 480, maxWidth: 1024}, undefined, (isThis) => {SET_IS_TABLET(isThis)})
  const IS_PHONE_QUERY = useMediaQuery({maxWidth: 479}, undefined, (isThis) => {SET_IS_PHONE(isThis)})

  const [IS_LAPTOP, SET_IS_LAPTOP] = useState(null)
  const [IS_TABLET, SET_IS_TABLET] = useState(null)
  const [IS_PHONE, SET_IS_PHONE] = useState(null)

  useEffect(() => {
    SET_IS_LAPTOP(IS_LAPTOP_QUERY)
    SET_IS_TABLET(IS_TABLET_QUERY)
    SET_IS_PHONE(IS_PHONE_QUERY)
  },
  [])

  const [UrlsLoaded, setUrlsLoaded] = useState(false)
  let pathname = useLocation().pathname
  pathname = pathname.slice(1, pathname.length)

  const navigate = useNavigate()
  
  
  useEffect(() => {
    const fetchData = async () => {

      Axios.defaults.withCredentials = true
      CSRF_TOK = (await Axios.get(REACT_APP_URL + "/api/getcsrftoken")).data.csrfToken
      Axios.defaults.headers.common["csrf-token"] = CSRF_TOK

      const res = await Axios.get(REACT_APP_URL + "/api/checkurls")

      const urls = res.data.map((item) => item.slug)
      const p1s = res.data.map((item) => item.p1)
      const p2s = res.data.map((item) => item.p2)
      const wagers = res.data.map((item) => item.wager)
      const contracts = res.data.map((item) => item.contract)
      const gameVariants = res.data.map((item) => item.gameVariant)
      const timeControls = res.data.map((item) => item.timeControl)
      const timeIncrements = res.data.map((item) => item.timeIncrement)

      const currentAccount = localStorage.getItem("storedMyAccount")

      if (!urls.includes(Number(pathname)) && pathname !== "") redirect = ""

      if (currentAccount) {
        if (p1s.includes(currentAccount)) {
          const idx = p1s.indexOf(currentAccount)

          const tempAcc = await stdlib.newAccountFromMnemonic(REACT_APP_ACCOUNT)
          const tempCtCId = contracts[idx]
          const tempCtc = tempAcc.contract(backend, tempCtCId)
          let stg = JSON.parse(JSON.stringify(await tempCtc.views.stage()))[1]
          if (stg !== null) stg = parseInt(stg.hex, 16)
          if (stg !== 0) {
            alreadyHasGame = 1
            if (pathname !== "") redirect = ""
          } else {
            await Axios.post(REACT_APP_URL + "/api/declinegame", {contract: tempCtCId})
          }

        } else if (p2s.includes(currentAccount)) {
          const idx = p2s.indexOf(currentAccount)

          const tempAcc = await stdlib.newAccountFromMnemonic("cabin canoe multiply grab rookie twenty across oval sea detect wedding between glove symptom video shrug sing gentle life marine core black sail abandon cheap")
          const tempCtCId = contracts[idx]
          const tempCtc = tempAcc.contract(backend, tempCtCId)
          let stg = JSON.parse(JSON.stringify(await tempCtc.views.stage()))[1]
          if (stg !== null) stg = parseInt(stg.hex, 16)
          if (stg === 2) {
            const tempPath = urls[idx]
            if (pathname != tempPath) redirect = tempPath // cannot use !== here as data types vary
            alreadyHasGame = 2
          } else {
            await Axios.post(REACT_APP_URL + "/api/undoaccept", {contract: tempCtCId})
          }
        }
      }
      if (alreadyHasGame === 2 || (redirect === null && pathname !== "")) {
        const idx = urls.indexOf(parseInt(pathname))
        opponentAddress = p1s[idx]
        wagerSetByOpponent = wagers[idx]
        contractSetByOpponent = contracts[idx]
        variantSetByOpponent = gameVariants[idx]
        timeControlSetByOpponent = timeControls[idx]
        timeIncrementSetByOpponent = timeIncrements[idx]
      }

      if (redirect !== null && redirect != pathname) navigate("/" + redirect, {replace: true}) // cannot use !== here as data types vary
      else setUrlsLoaded(true)
    }
    if (!UrlsLoaded) fetchData()
  })

  //{!BobURLAccepted() && <Navigate to="/" replace={true} />}
  return (
    <div className="App">
      <Header devices={[IS_LAPTOP, IS_TABLET, IS_PHONE]} />
      <Routes>
        <Route path="/"
        element={<Body
          user="Alice"
          loading={UrlsLoaded ? 0 : 1}
          devices={[IS_LAPTOP, IS_TABLET, IS_PHONE]}
          alreadyHasGame={alreadyHasGame}/>} />
        <Route path="/*"
        element={<Body
          user="Bob"
          loading={UrlsLoaded ? 0 : 1}
          devices={[IS_LAPTOP, IS_TABLET, IS_PHONE]}
          alreadyHasGame={alreadyHasGame} slug={pathname}
          opponentAddress={opponentAddress}
          wagerSetByOpponent={wagerSetByOpponent}
          contractSetByOpponent={contractSetByOpponent}
          variantSetByOpponent={variantSetByOpponent}
          timeControlSetByOpponent={timeControlSetByOpponent}
          timeIncrementSetByOpponent={timeIncrementSetByOpponent} />} />
      </Routes>
    </div>
  );
}


/*
TODO:
handle errors:
overspend on both side
backend failure
bob accepts after alice had cancelled contract
user rejects transactions
input is 0 or exceeds minimum balance

update contract to check for incorrect outcome
getexistinggame fails when the contract expires but the page is left open
*/