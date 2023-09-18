import { SubscriptionManager } from "@chainlink/functions-toolkit";
import { utils } from "ethers";

import {  signer } from "./connection";
import { networks } from "../networks";

const NETWORK = ""; // TODO @dev set this to one of the supported networks in networks.js
const consumerAddress = ""; // TODO @dev get this from step 01
const LINK_AMOUNT ="3.0"

if (!consumerAddress) {
  throw new Error("Please set the consumerAddress variable in scripts/03_encryptAndUploadSecrets.ts");
}
if (!NETWORK) {
  throw new Error("Please set the NETWORK var in scripts/03_encryptAndUploadSecrets.ts");
}

const functionsRouterAddress = networks[NETWORK].functionsRouter;
const linkTokenAddress = networks[NETWORK].linkToken;

const createAndFundSubscription = async () => {
  // @dev TODO in the workshop
};

createAndFundSubscription().catch((err: any) => {
  console.log("Error creating and funding subscription: ", err);
});
