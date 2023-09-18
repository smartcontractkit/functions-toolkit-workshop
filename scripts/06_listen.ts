// Loads environment variables from .env.enc file (if it exists)
require("@chainlink/env-enc").config("../.env.enc");
// require('dotenv').config()

import {
  ResponseListener,
  decodeResult,
  ReturnType,
} from "@chainlink/functions-toolkit";
import { provider } from "./connection.ts" 

import { networks } from "../networks.js";

const subscriptionId = parseInt(""); // TODO @dev update this  to show your subscription Id
const networkName = ""; // TODO @dev update this to your network name

if (!subscriptionId || isNaN(subscriptionId)) {
  throw Error(
    "Please update the subId variable in scripts/listen.js to your subscription ID."
  );
}

// Mount Response Listener
const functionsRouterAddress = networks[networkName]["functionsRouter"];

const responseListener = new ResponseListener({
  provider,
  functionsRouterAddress,
});


// Remove existing listeners
console.log("\nRemoving existing listeners...");
responseListener.stopListeningForResponses();

console.log(
  `\nListening for Functions Responses for subscriptionId ${subscriptionId} on network ${networkName}...`
);
// Listen for response
responseListener.listenForResponses(subscriptionId, (response: any) => {
  console.log(
    `\n✅ Request ${response.requestId} fulfilled. Functions Status Code: ${response.fulfillmentCode}`
  );
  if (!response.errorString) {
    console.log(
      "\nFunctions response received!\nData written on chain:",
      response.responseBytesHexstring,
      "\n and that decodes to an int256 value of: ",
      decodeResult(
        response.responseBytesHexstring,
        ReturnType.int256
      ).toString(),
      "\n"
    );
  } else {
    console.log(
      "\n❌ Error during the execution: ",
      response.errorString,
      "\n"
    );
  }
});
