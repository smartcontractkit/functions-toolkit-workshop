# SmartCon 2023 - Demonstrating the Power of Chainlink Functions

This workshop demonstrates Chainlink Functions.  The key dependency used is the [Chainlink Functions Toolkit NPM Package](https://github.com/smartcontractkit/functions-toolkit)

In this workshop, we will make API requests from 3 valid and 1 invalid APIs to get the latest BTC/USD exchange rate and medianize the responses.

We do this using custom JS code that makes HTTP requests, and uses API secrets to access the data.

The source code that will be executed by Chainlink Functions is in `./API-request-example.js`.  This is the code that gets sent on-chain and then onto the Chainlink Decentralized Oracle Network for decentralized execution.

## Prerequisites
1. Metamask funded with LINK tokens - [fund here.](faucets.chain.link).  Also ensure you have enough test Avalanche Fuji Avax, Mumbai Matic or Sepolia Eth. This project can support any of those three networks, but for the live Workshop we will use Avalanche Fuji.  The other network configs are in `./networks.js`.

2. Install NPM and Node > v 17. If you wish to simulate the execution of your Chainlink Functions Locally using the in-built simulator (done in the `./scripts/simulateScript.ts` script) you will also need to install [Deno](https://deno.land/manual/getting_started/installation).

3. The following environment variables should be readily available:
```
The following ENV VARIABLE values
PRIVATE_KEY --> Wallet private key
RPC_URL ||  AVALANCHE_FUJI_RPC_URL --> RPC URL (eg Sepolia – i’ll use Avalanche Fuji for demo speed)
COINMARKETCAP_API_KEY  --> API key from here https://pro.coinmarketcap.com/
SECOND_PRIVATE_KEY --> Optional if you want to experiment with transferring subscriptions to another account you own
```

## Steps

1. Go to the [Functions Subscriptions App](https://functions.chain.link). This is the subscription management UI for functions. Connect your wallet to Polygon Mumbai on the Functions web app. 

    Create your first subscription. This include two transactions:
        - one to accept the Terms of Service that adds your wallet address to the Allowlist, and
        - the other to create your Functions Subscription on-chain.

    Take a note of your Subscription Id as you will need it when using Chainlink Functions programmatically.

    Once a Functions Subscription is created you can manage it from the UI.
</br>

2.  Please add at least 3 LINK to your subscription to run this project's code. This can be done from the ACTIONS button when your wallet is connected. 
</br>

3.  clone this `main` branch and then run `npm install`. 
</br>

4. Set your environment variables using the `env-enc` package included.  
    -  Set password with `npx env-enc set-pw`.  Remember this password otherwise you will have to set the env vars each time!
    -  Set the above-mentioned env vars with `npx env-enc set`...and then follow the prompts.
    -   after you set all the env vars, you can view the decrypted, human-readable version by running `npx env-enc view`

**Note** each time you open a fresh terminal or restart a terminal session you will need to run `npx env-enc set-pw` but not the other steps.

5.  Completed reference code can be found in the  `01_Workshop` [branch](https://github.com/zeuslawyer/sc2023-toolkit-workshop/tree/01_Workshop). 
</br>
4. We run completed scripts with `npx ts-node 0*_script_filename` for each of the sequenced steps in the `./scripts` directory.
</br>
5. Script 2 (`02_createSubscription`) can be skipped if you use the UI to create a subscription, fund it and add the Consumer Contract to it. If your wallet is not allowlisted this is the best way to get allowlisted and create your subscription at the same time.
6. When running your request script in `./scripts/04_request.ts` you can open a new terminal window or tab, set the env-enc password with `npx env-enc set-pw` (so that your environment variables can be read) and then run a listener for your request with `npx ts-node scripts/06_listen.ts`.  This will run a listener, and when your request is fulfilled it will print the results of that request fulfillment to your console.
