import { decodeResult, ReturnType } from "@chainlink/functions-toolkit";
import { Contract, utils } from "ethers";

import { signer } from "./connection.ts";
import { abi } from "../contracts/abi/FunctionsConsumer.json";

const consumerAddress = ""; // TODO @dev get this from step 01

const readResponse = async () => {
  if (!consumerAddress) {
    throw new Error("Please set the consumerAddress variable in scripts/03_encryptAndUploadSecrets.ts");
  }

  const functionsConsumer = new Contract(consumerAddress, abi, signer);

  const responseHex = await functionsConsumer.s_lastResponse();
  const responseDataType = ReturnType.uint256;
  const responseDecoded = decodeResult(responseHex, responseDataType);

  console.table({
    "Response Hex": responseHex,
    "Response Decoded Median BTC Price in USD":  parseInt(responseDecoded.toString())/100,
  })
};

readResponse().catch((err: any) => {
  console.log("Error reading response: ", err);
});
