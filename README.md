# Flipshop Loyalty Coin

## Guide to install the application

Blockchain-based Loyalty and Rewards Program using Fungible Tokens" is a loyalty and rewards system implemented using blockchain technology. Instead of traditional loyalty programs that might involve physical cards or centralized databases, this approach leverages the security and transparency of blockchain. Fungible tokens are used as the rewards mechanism. Each customer's loyalty and engagement can be tracked on the blockchain, and as they accumulate points or rewards, these are represented as fungible tokens in the blockchain system.

## Folder Structure

- client
- server
  -- web3

## Installation

### frontend

- git clone the repository
- `cd` into `client` folder.
- run `yarn` or `npm install` to install the packages.
- use `yarn run dev` or `npm run dev` to start the project.

### backend

- `cd` into `server` folder.
- run `yarn` or `npm install` to install the packages.
- use `yarn run dev` or `npm run dev` to start the project.
- change `CONTRACT_ADMIN_WALLET` inside `.env` file

### backend(web3)

- `cd` into `server\web3` folder.
- we have solidity smart contracts inside the `web3\contracts` folder and build contracts ready for deployement inside the `web3\build\contracts`

### truffle to deploy contract

- `cd` into `server\web3` folder.
- install traffle using `npm install -g truffle`.
- update RPC URL and PORT inside `truffle-config.js` file. `eg: HTTP://127.0.0.1:7545`
- open console and run `truffle console`.
- compile contract using `compile --all`.
- migrate contract to ganache using `migrate --reset`.
