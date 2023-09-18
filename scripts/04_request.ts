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

  // @dev TODO in the workshop
};

sendRequest().catch((err: any) => {
  console.log("Error sending the request to Functions Consumer: ", err);
});
