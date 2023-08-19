import { Web3 } from 'web3'
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // Update with your Ganache host and port
const web3 = new Web3(provider);

import dotenv from 'dotenv';
dotenv.config();

import LoyaltyProgramArtifact from './build/contracts/LoyaltyProgram.json'assert { type: "json" };
import FungibleTokenArtifact from "./build/contracts/FungibleToken.json"assert { type: "json" };


const loyaltyProgramAddress = LoyaltyProgramArtifact.networks["5777"].address;
const tokenAddress = FungibleTokenArtifact.networks["5777"].address;

const loyaltyProgramContract = new web3.eth.Contract(
    LoyaltyProgramArtifact.abi,
    loyaltyProgramAddress
);

const fungibleTokenContract = new web3.eth.Contract(FungibleTokenArtifact.abi, tokenAddress);


export { web3, loyaltyProgramContract, fungibleTokenContract, loyaltyProgramAddress }
