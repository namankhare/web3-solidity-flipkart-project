// migrations/2_deploy_fungible_token.js
const FungibleToken = artifacts.require('FungibleToken');

module.exports = function (deployer) {
  deployer.deploy(FungibleToken, 'FlipCoin', 'FLP');
};
