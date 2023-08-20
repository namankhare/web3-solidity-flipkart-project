// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./FungibleToken.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract LoyaltyProgram {
    using SafeMath for uint256;
    FungibleToken public token;
    struct LoyaltyPointEntry {
        uint256 tokenId; // Token ID to uniquely identify entries
        string orderId;
        string orderName;
        uint256 amount;
        string action;
        uint256 timestamp;
        uint256 expireTimestamp;
        uint256 deductedPoints;
        uint256[] fromTokenIds; // Array of token IDs used for redemption
        bool expired; // Flag indicating if the entry is expired
    }

    mapping(address => uint256) public totalPoints;
    mapping(address => uint256) public tokenCounter;
    mapping(address => mapping(uint256 => LoyaltyPointEntry))
        public loyaltyPoints;

    constructor(address _token) {
        token = FungibleToken(_token);
    }

    event PointsEarned(
        address indexed user,
        uint256 tokenId,
        string orderId,
        string orderName,
        uint256 amount,
        string action,
        uint256 timestamp,
        uint256 expireTimestamp
    );
    event PointsRefund(
        address indexed user,
        uint256 tokenId,
        string orderId,
        string orderName,
        uint256 amount,
        string action,
        uint256 timestamp,
        uint256 expireTimestamp
    );
    event PointsExpired(
        address indexed user,
        uint256 tokenId,
        string orderId,
        uint256 amount,
        string action,
        uint256 timestamp,
        uint256 expireTimestamp
    );
    event PointsRedeemed(
        address indexed user,
        uint256 tokenId,
        string orderId,
        string orderName,
        uint256 amount,
        string action,
        uint256 timestamp,
        uint256 expireTimestamp,
        uint256 deductedPoints,
        uint256[] fromTokenIds
    );

    function earnPoints(
        uint256 amount,
        string memory orderId,
        string memory orderName
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        uint256 tokenId = tokenCounter[msg.sender];
        uint256 expireTimestamp = block.timestamp + 365 days; // Set expiration time to 1 minute from now

        uint256[] memory fromTokenIds;
        fromTokenIds = _appendToArray(fromTokenIds, tokenId);
        loyaltyPoints[msg.sender][tokenId] = LoyaltyPointEntry(
            tokenId,
            orderId,
            orderName,
            amount,
            "earn",
            block.timestamp,
            expireTimestamp,
            0,
            fromTokenIds,
            false
        );
        totalPoints[msg.sender] = totalPoints[msg.sender].add(amount);
        tokenCounter[msg.sender]++;

        emit PointsEarned(
            msg.sender,
            tokenId,
            orderId,
            orderName,
            amount,
            "earn",
            block.timestamp,
            expireTimestamp
        );
    }

    // refund points in case of any failure
    function refundPoints(
        uint256 amount,
        string memory orderId,
        string memory orderName
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        uint256 tokenId = tokenCounter[msg.sender];
        uint256 expireTimestamp = block.timestamp + 5 minutes; // Set expiration time to 1 minute from now

        uint256[] memory fromTokenIds;
        fromTokenIds = _appendToArray(fromTokenIds, tokenId);
        loyaltyPoints[msg.sender][tokenId] = LoyaltyPointEntry(
            tokenId,
            orderId,
            orderName,
            amount,
            "refund",
            block.timestamp,
            expireTimestamp,
            0,
            fromTokenIds,
            false
        );
        totalPoints[msg.sender] = totalPoints[msg.sender].add(amount);
        tokenCounter[msg.sender]++;

        emit PointsRefund(
            msg.sender,
            tokenId,
            orderId,
            orderName,
            amount,
            "refund",
            block.timestamp,
            expireTimestamp
        );
    }

    function redeemPoints(
        uint256 amount,
        string memory orderId,
        string memory orderName
    ) external {
        require(amount > 0, "Points must be greater than 0");
        require(totalPoints[msg.sender] >= amount, "Insufficient points");

        uint256 tokenId = tokenCounter[msg.sender];
        uint256 remainingRedeemAmount = amount;
        uint256 deductedPoints = 0;
        uint256[] memory fromTokenIds;

        // Find the available "earn" entries with enough points and not expired
        for (uint256 i = 0; i < tokenId; i++) {
            if (
                loyaltyPoints[msg.sender][i].amount > 0 &&
                loyaltyPoints[msg.sender][i].expireTimestamp >=
                block.timestamp &&
                keccak256(bytes(loyaltyPoints[msg.sender][i].action)) ==
                keccak256("earn")
            ) {
                uint256 availablePoints = loyaltyPoints[msg.sender][i]
                    .amount
                    .sub(loyaltyPoints[msg.sender][i].deductedPoints);
                uint256 redeemAmount = remainingRedeemAmount > availablePoints
                    ? availablePoints
                    : remainingRedeemAmount;
                uint256 newDeductedPoints = loyaltyPoints[msg.sender][i]
                    .deductedPoints
                    .add(redeemAmount);
                uint256 fromTokenId = loyaltyPoints[msg.sender][i].tokenId;

                // Update the "earn" entry with deducted points
                loyaltyPoints[msg.sender][i].deductedPoints = newDeductedPoints;

                deductedPoints = deductedPoints.add(redeemAmount);
                fromTokenIds = _appendToArray(fromTokenIds, fromTokenId);

                remainingRedeemAmount = remainingRedeemAmount.sub(redeemAmount);

                if (remainingRedeemAmount == 0) {
                    break; // Exit the loop once fully redeemed
                }
            }
        }

        // Ensure that points are deducted before proceeding
        require(deductedPoints > 0, "No points available for redemption");

        // Update the totalPoints and transfer tokens
        totalPoints[msg.sender] = totalPoints[msg.sender].sub(deductedPoints);
        token.transfer(msg.sender, deductedPoints);

        // Create a new entry for the redemption
        uint256 newTokenId = tokenCounter[msg.sender];
        loyaltyPoints[msg.sender][newTokenId] = LoyaltyPointEntry(
            newTokenId,
            orderId,
            orderName,
            deductedPoints,
            "redeem",
            block.timestamp,
            block.timestamp,
            deductedPoints,
            fromTokenIds,
            false
        );
        tokenCounter[msg.sender]++;

        emit PointsRedeemed(
            msg.sender,
            newTokenId,
            orderId,
            orderName,
            deductedPoints,
            "redeem",
            block.timestamp,
            block.timestamp,
            deductedPoints,
            fromTokenIds
        );
    }

    function expirePoints(uint256 tokenId, string memory orderId) external {
        require(
            loyaltyPoints[msg.sender][tokenId].amount > 0,
            "Invalid token ID"
        );

        // Only allow expiring 'earn' points
        require(
            keccak256(bytes(loyaltyPoints[msg.sender][tokenId].action)) ==
                keccak256("earn"),
            "Only 'earn' points can be expired"
        );

        // Skip if the points entry is already expired
        if (loyaltyPoints[msg.sender][tokenId].expired) {
            return;
        }

        // Skip if the entry is not yet expired based on the timestamp
        if (
            block.timestamp < loyaltyPoints[msg.sender][tokenId].expireTimestamp
        ) {
            return;
        }

        uint256 expiredAmount = loyaltyPoints[msg.sender][tokenId].amount.sub(
            loyaltyPoints[msg.sender][tokenId].deductedPoints
        );
        require(expiredAmount > 0, "No points to expire");

        // Set the entry to expired
        loyaltyPoints[msg.sender][tokenId].expired = true;

        // Deduct the remaining points from totalPoints
        totalPoints[msg.sender] = totalPoints[msg.sender].sub(expiredAmount);
        uint256[] memory fromTokenIds;
        fromTokenIds = _appendToArray(fromTokenIds, tokenId);
        // Create a new entry for the expired points
        uint256 newTokenId = tokenCounter[msg.sender];
        loyaltyPoints[msg.sender][newTokenId] = LoyaltyPointEntry(
            newTokenId,
            orderId,
            "Expired Coins",
            expiredAmount,
            "expire",
            block.timestamp,
            block.timestamp,
            0,
            fromTokenIds,
            true
        );
        tokenCounter[msg.sender]++;

        emit PointsExpired(
            msg.sender,
            newTokenId,
            orderId,
            expiredAmount,
            "expire",
            block.timestamp,
            block.timestamp
        );
    }

    function getTotalEarnedPoints(
        address user
    ) external view returns (uint256) {
        return totalPoints[user];
    }

    function getEarnedPointsWithTimestamps(
        address user
    ) external view returns (LoyaltyPointEntry[] memory) {
        uint256 userTokenCounter = tokenCounter[user];
        LoyaltyPointEntry[] memory earnedPoints = new LoyaltyPointEntry[](
            userTokenCounter
        );

        for (uint256 i = 0; i < userTokenCounter; i++) {
            earnedPoints[i] = loyaltyPoints[user][i];
        }

        return earnedPoints;
    }

    function _appendToArray(
        uint256[] memory array,
        uint256 element
    ) private pure returns (uint256[] memory) {
        uint256[] memory newArray = new uint256[](array.length + 1);
        for (uint256 i = 0; i < array.length; i++) {
            newArray[i] = array[i];
        }
        newArray[array.length] = element;
        return newArray;
    }
}
