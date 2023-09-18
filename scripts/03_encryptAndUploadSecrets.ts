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
  const secretsManager = new SecretsManager({
    signer,
    functionsRouterAddress,
    donId,
  });

  // initialize secrets manager.
  await secretsManager.initialize();

  // Encrypt secrets & upload them to the DON.
  // Set the TTL to 60 minutes  (enough for the demo!)
  if (!process.env.COINMARKETCAP_API_KEY) {
    throw new Error(
      "Please set the COINMARKETCAP_API_KEY environment variable"
    );
  }

  const secrets = { apiKey: process.env.COINMARKETCAP_API_KEY };
  
  console.log("\nEncrypting secrets...")
  const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  
  const gatewayUrls = networks[NETWORK].gatewayUrls;
  const slotId = 0; //  @dev this can be to whatever slotId you want to use/update. For now we use 0.
  const minutesUntilExpiration = 60;

  console.log("\nUploading encrypted secrets to DON...")
  const { version, success } = await secretsManager.uploadEncryptedSecretsToDON(
    {
      slotId,
      minutesUntilExpiration,
      gatewayUrls,
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
    }
  );

  const encryptedSecretsReference = secretsManager.buildDONHostedEncryptedSecretsReference({
    slotId,
    version,
  })

  console.log("\nPlease make a note of this encryptedSecretsReference:  ", encryptedSecretsReference)

};

encryptAndUploadSecrets().catch((err: any) => {
  console.log("Error creating and funding subscription: ", err);
});
