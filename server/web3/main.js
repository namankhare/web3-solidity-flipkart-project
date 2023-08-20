// Import required modules and packages
const { Web3 } = require('web3');
const dotenv = require('dotenv');

// Initialize dotenv to load environment variables from .env file
dotenv.config();

// Create a provider for connecting to a local Ethereum network (e.g., Ganache)
const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545'); // Update with your Ganache host and port
const web3 = new Web3(provider);

// Import the JSON artifacts of the smart contracts
const LoyaltyProgramArtifact = require('./build/contracts/LoyaltyProgram.json');
const FungibleTokenArtifact = require('./build/contracts/FungibleToken.json');

// Get the contract addresses from the JSON artifacts
const loyaltyProgramAddress = LoyaltyProgramArtifact.networks["5777"].address;
const tokenAddress = FungibleTokenArtifact.networks["5777"].address;

// Create instances of the contracts using their ABI and addresses
const loyaltyProgramContract = new web3.eth.Contract(
    LoyaltyProgramArtifact.abi,
    loyaltyProgramAddress
);

const fungibleTokenContract = new web3.eth.Contract(
    FungibleTokenArtifact.abi,
    tokenAddress
);

// Export necessary variables and contracts
module.exports = {
    Web3,
    loyaltyProgramContract,
    fungibleTokenContract,
    loyaltyProgramAddress
};
