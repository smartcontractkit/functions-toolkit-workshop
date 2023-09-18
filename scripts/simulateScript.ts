import {
  simulateScript,
  decodeResult,
  ReturnType,
} from "@chainlink/functions-toolkit";

import fs from "fs";
import path from "path";

require("@chainlink/env-enc").config();
// require('dotenv').config()

const simulate = async () => {
  const source = fs
    .readFileSync(path.resolve(__dirname, "../API-request-example.js"))
    .toString();

  const args = ["1", "bitcoin", "btc-bitcoin", "btc"]; // Bitcoin CoinIds on various APIs. CMC Coin Id, CoinGecko Coin Id, CoinPaprika Coin Id, Bad API Coin Id

  if (!process.env.COINMARKETCAP_API_KEY) {
    throw Error("Please set the COINMARKETCAP_API_KEY environment variable");
  }

  const secrets: Record<string, string> = {
    apiKey: process.env.COINMARKETCAP_API_KEY!,
  };

  const { responseBytesHexstring, errorString, capturedTerminalOutput } =
    await simulateScript({
      source,
      secrets,
      args,
    });

  if (errorString) {
    console.log(
      "Error decoded to : ",
      decodeResult(errorString, ReturnType.string)
    );
  }
  if (responseBytesHexstring) {
    console.log(
      "Response Bytes decoded to : ",
      decodeResult(responseBytesHexstring, ReturnType.uint256).toString()
    );
  }
  if (capturedTerminalOutput) {
    console.log("Simulation Logs decoded to : ", capturedTerminalOutput);
  }
};

simulate().catch((err: any) => {
  console.log("\nError running source simulator: ", err);
});
