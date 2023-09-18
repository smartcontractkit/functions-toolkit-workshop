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
  const subscriptionManager = new SubscriptionManager({
    signer,
    linkTokenAddress,
    functionsRouterAddress,
  });

  // initialize subscription
  await subscriptionManager.initialize();

  // Create subscription.  If you pass in a consumerAddress, that consumer contract will automatically 
  // be added to the subscription.
  // If you do not pass in a consumer address, you can add a consumer contract later with subscriptionManager.addConsumer()
  // or using the Functions Web app functions.chain.link
  const subscriptionId = await subscriptionManager.createSubscription({
    consumerAddress, 
  });

  console.log(`\nSubscription created with ID: ${subscriptionId}`)

  // Fund your subscription
  const juelsAmount = utils.parseUnits(LINK_AMOUNT, 18).toString();
  const fundConsumerTx = await subscriptionManager.fundSubscription({
    subscriptionId,
    juelsAmount,
  });

  console.log(`\nFunding subscription with ${utils.formatEther(juelsAmount)} LINK...`);
};

createAndFundSubscription().catch((err: any) => {
  console.log("Error creating and funding subscription: ", err);
});
