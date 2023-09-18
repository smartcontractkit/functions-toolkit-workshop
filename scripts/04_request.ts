import { Contract } from "ethers";
import fs from "fs";
import path from "path";
import { ethers } from "ethers";

import { signer } from "./connection.ts";
import { abi } from "../contracts/abi/FunctionsConsumer.json";
import { Location } from "@chainlink/functions-toolkit";

require("@chainlink/env-enc").config();
// require('dotenv').config()

const consumerAddress = ""; // TODO @dev get this from step 01
const encryptedSecretsReference = ""; // TODO @dev get this from previous step
const subscriptionId = ""; // TODO @dev


const sendRequest = async () => {
  if (!consumerAddress || !encryptedSecretsReference || !subscriptionId) {
    throw new Error("Please set the variables in script 04");
  }

  // Attach to the FunctionsConsumer contract
  const functionsConsumer = new Contract(consumerAddress, abi, signer);

  const source = fs
    .readFileSync(path.resolve(__dirname, "../API-request-example.js"))
    .toString();

  const args = ["1", "bitcoin", "btc-bitcoin", "btc"];  // Bitcoin CoinIds on various APIs. CMC Coin Id, CoinGecko Coin Id, CoinPaprika Coin Id, Bad API Coin Id
  const callbackGasLimit = 300000;

  // get the request ID by simulating a Tx with a static call
  const requestTx = await functionsConsumer.sendRequest(
    source, // source
    Location.DONHosted, // location of the secrets 
    encryptedSecretsReference,
    args,
    [], // bytesArgs - arguments can be encoded off-chain to bytes.
    subscriptionId,
    callbackGasLimit,
  );

  const requestTxReceipt = await requestTx.wait(1)

  const requestId = requestTxReceipt.events[2].args.id

  console.log("\nRequest made. RequestId is: ", requestId);
};

sendRequest().catch((err: any) => {
  console.log("Error sending the request to Functions Consumer: ", err);
});
