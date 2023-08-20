const { fungibleTokenContract, loyaltyProgramAddress, loyaltyProgramContract, Web3 } = require('../main.js');

const ownerAccount = process.env.CONTRACT_ADMIN_WALLET;

// Function to fix expired tokens for a user
const fixExpiredToken = async (walletAddress) => {
    try {
        const totalEntries = await loyaltyProgramContract.methods
            .tokenCounter(walletAddress)
            .call();

        for (let i = 0; i < totalEntries; i++) {
            const entry = await loyaltyProgramContract.methods
                .loyaltyPoints(walletAddress, i)
                .call();

            const currentTimestamp = Math.floor(Date.now() / 1000);
            if (!entry.expired) {
                if (entry.expireTimestamp > 0 && entry.expireTimestamp <= currentTimestamp && entry.action === "earn") {
                    // Expire the points
                    try {
                        const result = await loyaltyProgramContract.methods
                            .expirePoints(i, entry.orderId)
                            .send({ from: walletAddress, gas: 500000 });
                        // console.log(`Expired points for entry ${i}, Transaction Hash:`, result.transactionHash);
                    } catch (error) {
                        // Handle error if needed
                    }
                }
            }
        }

        return 'success';

    } catch (error) {
        console.log(error);
        return 'error';
    }
};

// Function to get total user points
const totalUserPoints = async (walletAddress) => {
    try {
        await fixExpiredToken(walletAddress);

        // Get user's total earned points
        const totalEarnedPoints = await loyaltyProgramContract.methods
            .getTotalEarnedPoints(walletAddress)
            .call();

        return convertFromWei(totalEarnedPoints);

    } catch (error) {
        return 'error';
    }
};

// Function to mint and earn points for a user
const mintAndEarnPoints = async (walletAddress, pointsToEarn, orderId, orderName) => {
    try {
        await fixExpiredToken(walletAddress);
        console.log(ownerAccount, walletAddress)
        // Authorize the LoyaltyProgram contract to mint tokens
        await fungibleTokenContract.methods
            .authorizeLoyaltyProgram(loyaltyProgramAddress)
            .send({ from: ownerAccount, gas: 5000000 });

        // Earn points for userAccount
        await fungibleTokenContract.methods
            .mint(walletAddress, convertToWei(pointsToEarn))
            .send({ from: ownerAccount, gas: 5000000 });

        await fungibleTokenContract.methods
            .approve(loyaltyProgramAddress, convertToWei(pointsToEarn))
            .send({ from: walletAddress, gas: 5000000 });

        const earnResult = await loyaltyProgramContract.methods
            .earnPoints(convertToWei(pointsToEarn), orderId, orderName)
            .send({ from: walletAddress, gas: 5000000 });

        return 'success';

    } catch (error) {
        console.log(error);
        return 'error';
    }
};

// Function to redeem user points
const redeemUserPoints = async (walletAddress, pointsToRedeem, orderId, orderName) => {
    try {
        await fixExpiredToken(walletAddress);

        const redeemResult = await loyaltyProgramContract.methods
            .redeemPoints(convertToWei(pointsToRedeem), orderId, orderName)
            .send({ from: walletAddress, gas: 5000000 });

        return 'success';

    } catch (error) {
        console.log(error);
        return 'error';
    }
};

// Function to get user points history
const getUserPointsHistory = async (walletAddress) => {
    try {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };

        await fixExpiredToken(walletAddress);

        // Retrieve and return transaction logs with amount and timestamps for each earned point
        const earnedPoints = await loyaltyProgramContract.methods
            .getEarnedPointsWithTimestamps(walletAddress)
            .call();

        return earnedPoints;

    } catch (error) {
        console.log(error);
        return 'error';
    }
};

// Function to convert to Wei
const convertToWei = (amount) => {
    return Web3.utils.toWei(String(amount), "ether");
};

// Function to convert from Wei
const convertFromWei = (amount) => {
    return Web3.utils.fromWei(String(amount), "ether");
};

// Function to convert timestamp to Date
const timestamptoDate = (timestamp) => {
    return new Date(parseInt(timestamp) * 1000);
};

// Exporting all the necessary functions
module.exports = {
    totalUserPoints,
    mintAndEarnPoints,
    fixExpiredToken,
    redeemUserPoints,
    getUserPointsHistory,
    timestamptoDate
};
