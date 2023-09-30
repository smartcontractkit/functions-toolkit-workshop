import { abi, bytecode } from "../contracts/abi/FunctionsConsumer.json";
import { wallet, signer } from "./connection.ts";
import { networks } from "../networks.js";
import { Contract, ContractFactory, utils } from "ethers";

const NETWORK = ""; // TODO @dev set this to one of the supported networks in networks.js

if(!NETWORK){
  throw Error("Please set the NETWORK variable in scripts/01_deployConsumer.ts to one of the supported networks in networks.js")
}
const routerAddress = networks[NETWORK].functionsRouter;
const donIdBytes32 = utils.formatBytes32String(networks[NETWORK].donId);

const deployedFunctionsConsumerContract = async (): Promise<Contract> => {
  
  const contractFactory = new ContractFactory(
    abi, 
    bytecode, 
    wallet
  );

  console.log(`\nDeploying functions consumer contract on '${NETWORK}'...`);
  const functionsConsumerContract = await contractFactory
    .connect(signer)
    .deploy(routerAddress, donIdBytes32);

  await functionsConsumerContract.deployed();
  console.log(
    `Contract deployed at address: ${functionsConsumerContract.address}`
  );

  return functionsConsumerContract;
};

deployedFunctionsConsumerContract().catch((err: any) => {
  console.log("\nError deploying Functions Consumer contract: ", err);
});
