import { SecretsManager,  } from "@chainlink/functions-toolkit";

import { signer } from "./connection";
import { networks } from "../networks.js";

require("@chainlink/env-enc").config();
// require('dotenv').config()

const NETWORK = ""; // TODO @dev set this to one of the supported networks in networks.js

if (!NETWORK) {
  throw new Error("Please set the NETWORK var in scripts/03_encryptAndUploadSecrets");
}
const donId = networks[NETWORK].donId;
const functionsRouterAddress = networks[NETWORK].functionsRouter;

const encryptAndUploadSecrets = async () => {
  // @dev TODO in the workshop
};

encryptAndUploadSecrets().catch((err: any) => {
  console.log("Error creating and funding subscription: ", err);
});
