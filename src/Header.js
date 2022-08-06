import React from "react"
import { useState, useEffect } from "react"

import WalletConnect from "@walletconnect/client"
import QRCodeModal from "algorand-walletconnect-qrcode-modal"
import algosdk, { Algod } from "algosdk"
import { formatJsonRpcRequest } from "@json-rpc-tools/utils"

import { loadStdlib } from "@reach-sh/stdlib"
import { ALGO_WalletConnect } from "@reach-sh/stdlib"

import { textStyle, flexStyle } from "./styleFuncs"

const REACT_APP_CONNECTOR = process.env.REACT_APP_CONNECTOR

const algodToken = ''
const algodServer = (REACT_APP_CONNECTOR === "MAINNET") ? "https://mainnet-api.algonode.cloud" : "https://testnet-api.algonode.cloud"
const algodPort = ''
const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort)

const stdlib = loadStdlib("ALGO")
let globalConnectedAddress = ""
let globalConnectedSession = {}
let globalReachAccount = {}
let sendAlgo, getLastBlock
export {globalConnectedAddress, globalConnectedSession, globalReachAccount, sendAlgo, getLastBlock}


let connector = null
export default function Header(props) {

    const [IS_LAPTOP, IS_TABLET, IS_PHONE] = props.devices

    // get the account and session information if they exist
    let tempWCSession = JSON.parse(localStorage.getItem("storedWCSession"))
    let tempMyAccount = localStorage.getItem("storedMyAccount")
    tempWCSession = tempWCSession ? tempWCSession : null
    tempMyAccount = tempMyAccount ? tempMyAccount : ""


    const [wcSession, setWCSession] = useState(tempWCSession)
    const [myAccount, setMyAccount] = useState(tempMyAccount)
    globalConnectedAddress = myAccount
    globalConnectedSession = wcSession


    // update session information when changed
    useEffect(
        () => {
            localStorage.setItem("storedWCSession", JSON.stringify(wcSession))
            globalConnectedSession = wcSession
        },
        [wcSession]
    )

    // update account when changed
    useEffect(
        () => {
            localStorage.setItem("storedMyAccount", myAccount)
            globalConnectedAddress = myAccount
        },
        [myAccount]
    )
    
    // on first render, set state of the create/join button in Body.js. Also, restore session if exists
    useEffect(
        () => {if (myAccount) handleConnectWalletClick()},
        []
    )

    // truncated address as seen in header
    const myShortAccount = myAccount ? myAccount.slice(0, 10) + "..." : ""
    const myVeryShortAccount = myAccount ? myAccount.slice(0, 5) + "..." : ""

    // On connect and session update, set the account, session, and reach object
    const connectWallet = async (error, payload) => {
        if (error) {
          throw error
        }
        const { accounts } = payload.params[0]
        setMyAccount(accounts[0])
        setWCSession(connector.session)

        await connectReach()
        const createGameButton = document.getElementById("create-game")
        if (createGameButton.classList.contains("disabled")) createGameButton.classList.remove("disabled")
        //window.location.reload()
    }

    const connectReach = async () => {
        stdlib.setWalletFallback(stdlib.walletFallback(
            {
                providerEnv: {
                    ALGO_TOKEN: '',
                    ALGO_SERVER: (REACT_APP_CONNECTOR === "MAINNET") ? "https://mainnet-api.algonode.cloud" : "https://testnet-api.algonode.cloud",
                    ALGO_PORT: '',
                    ALGO_INDEXER_TOKEN: '',
                    ALGO_INDEXER_SERVER: (REACT_APP_CONNECTOR === "MAINNET") ? "https://mainnet-idx.algonode.cloud" : "https://testnet-idx.algonode.cloud",
                    ALGO_INDEXER_PORT: '',
                },
                WalletConnect: ALGO_WalletConnect,
                connector: connector
            }
        ))
        globalReachAccount = await stdlib.getDefaultAccount()
    }

    const handleConnectWalletClick = async () => {
        
        // create connector
        if (wcSession === null) {
            connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org",
                qrcodeModal: QRCodeModal
            })
        } else {
            connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org",
                qrcodeModal: QRCodeModal,
                session: wcSession
            })
            await connectReach()
        }

        // connect if not connected
        if (!connector.connected) {
            connector.createSession()
        }
    
        // Get accounts on connection
        connector.on("connect", connectWallet)
    
        // get updated accounts
        connector.on("session_update", connectWallet)
     
          // disconnected from wallet side
        connector.on("disconnect", (error, payload) => {
            if (error) {
              throw error
            }
            setMyAccount("")
            setWCSession(null)
            globalReachAccount = {}
            // do not need to update create/join button disable/enable state as page is being refreshed
            // reload page due to issue with reach not being able to connect new wallet otherwise
            window.location.reload()
        })

    }
    
    const handleDisconnectWalletClick = () => {
        if (connector === null) {
            connector = new WalletConnect({
                bridge: "https://bridge.walletconnect.org",
                qrcodeModal: QRCodeModal,
                session: wcSession
            })
        }
        connector.killSession()
        setMyAccount("")
        setWCSession(null)
        globalReachAccount = {}
        // do not need to update create/join button disable/enable state as page is being refreshed
        // reload page due to issue with reach not being able to connect new wallet otherwise
        window.location.reload()

    }

    sendAlgo = async (toWho, amt) => {

        let params = await algodClient.getTransactionParams().do();
        params.fee = algosdk.ALGORAND_MIN_TX_FEE;
        params.flatFee = true;

        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: myAccount,
            to: toWho,
            amount: amt,
            suggestedParams: params
        })
        const txID = txn.txID().toString()
        const txns = [txn]
        const txnsToSign = txns.map(txn => {
            const encodedTxn = Buffer.from(algosdk.encodeUnsignedTransaction(txn)).toString("base64")
            return {
                txn: encodedTxn,
                message: 'AlgoChess',
            }
        })
        const requestParams = [txnsToSign]
        const request = formatJsonRpcRequest("algo_signTxn", requestParams)
        try {
            const result = await connector.sendCustomRequest(request)
            const decodedResult = result.map(element => {
                return element ? new Uint8Array(Buffer.from(element, "base64")) : null;
            })
            await algodClient.sendRawTransaction(decodedResult).do()
            await algosdk.waitForConfirmation(algodClient, txID, 2)
            return [true]
            
        } catch (e) {
            console.log(e)
            return [false, JSON.stringify(e.message)]
        }
        
    }

    getLastBlock = async () => {
        const lastround = (await algodClient.status().do())["last-round"]
        return lastround
    }

    return (
        <nav className="header">
            <span style={textStyle({fontWeight: "thin", color: "var(--light-blue)", margin: `0px auto 0px ${IS_LAPTOP ? 50 : IS_TABLET ? 30 : 10}px`}, props.devices)}>AlgoChess</span>
            {
                myAccount ?
                <div style={flexStyle({alignItems: "center"})}>
                    <span style={textStyle({color: "var(--light-blue)", margin: `0px ${IS_LAPTOP ? 20 : IS_TABLET ? 15 : 10}px 0px 0px`, fontSize: `${IS_LAPTOP ? 20 : IS_TABLET ? 18 : 15}px`}, props.devices)}>{IS_PHONE ? myVeryShortAccount : myShortAccount}</span>
                    <button className="connect-wallet-button" style={IS_PHONE ? {marginRight: "10px"} : {marginRight: "40px"}} onClick={handleDisconnectWalletClick}>DISCONNECT</button>
                </div> :
                <div>
                    <button className="connect-wallet-button" style={IS_PHONE ? {marginRight: "10px"} : {marginRight: "40px"}} onClick={handleConnectWalletClick}>{IS_PHONE ? "CONNECT" : "CONNECT WALLET"}</button>
                </div>
            }
        </nav>
    )
}

