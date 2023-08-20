// migrations/3_deploy_loyalty_program.js
const LoyaltyProgram = artifacts.require('LoyaltyProgram');
const FungibleToken = artifacts.require('FungibleToken');

module.exports = async function (deployer) {
    const tokenInstance = await FungibleToken.deployed();
    await deployer.deploy(LoyaltyProgram, tokenInstance.address);
};
