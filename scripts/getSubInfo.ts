import { SubscriptionManager } from "@chainlink/functions-toolkit";
import { abi, bytecode } from "../contracts/abi/FunctionsConsumer.json";
import { wallet, signer } from "./connection.ts";
import { networks } from "../networks.js";
import { Contract, ContractFactory, utils } from "ethers";

const subscriptionId = ""; // TODO @dev
const NETWORK = ""; // TODO @dev set this to one of the supported networks in networks.js

const linkTokenAddress = networks[NETWORK].linkToken;
const functionsRouterAddress = networks[NETWORK].functionsRouter;

const getSubInfo = async () => {
  const subscriptionManager = new SubscriptionManager({
    signer,
    linkTokenAddress,
    functionsRouterAddress,
  });

  await subscriptionManager.initialize();

  if (!subscriptionId) {
    throw new Error(
      "Please set the subscriptionId variable in scripts/05_getInfo.ts"
    );
  }

  return await subscriptionManager.getSubscriptionInfo(subscriptionId);
};

getSubInfo()
  .then(info => {
    console.log(info);
  })
  .catch(e => {
    console.log("\nError getting sub info: ", e);
    throw e;
  });
