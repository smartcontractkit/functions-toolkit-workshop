require("@chainlink/env-enc").config()
// require('dotenv').config()

import {providers, Wallet} from "ethers"

const RPC_URL =process.env.RPC_URL || process.env.AVALANCHE_FUJI_RPC_URL

const provider = new providers.JsonRpcProvider(RPC_URL)
const wallet = new Wallet(process.env.PRIVATE_KEY || "UNSET")
const signer = wallet.connect(provider)

export {provider, wallet, signer}
