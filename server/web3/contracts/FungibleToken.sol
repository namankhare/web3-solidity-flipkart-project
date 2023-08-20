// contracts/FungibleToken.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FungibleToken is ERC20, Ownable {
    mapping(address => bool) public isAuthorizedMinter;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        isAuthorizedMinter[msg.sender] = true; // Contract deployer is an authorized minter
    }

    // Address of the LoyaltyProgram contract
    address public loyaltyProgram;

    modifier onlyAuthorizedMinter() {
        require(
            isAuthorizedMinter[msg.sender] || msg.sender == loyaltyProgram,
            "Not an authorized minter"
        );
        _;
    }

    function authorizeLoyaltyProgram(
        address _loyaltyProgram
    ) external onlyOwner {
        isAuthorizedMinter[_loyaltyProgram] = true;
    }

    function setAuthorizedMinter(
        address minter,
        bool status
    ) external onlyOwner {
        isAuthorizedMinter[minter] = status;
    }

    function mint(
        address to,
        uint256 amount
    ) public onlyAuthorizedMinter returns (bool) {
        _mint(to, amount);
        return true;
    }
}
