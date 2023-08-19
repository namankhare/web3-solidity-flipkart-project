import { fungibleTokenContract, loyaltyProgramAddress, loyaltyProgramContract, web3 } from "../main.js";

const ownerAccount = process.env.CONTRACT_ADMIN_WALLET

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
            if (entry.expireTimestamp > 0 && entry.expireTimestamp <= currentTimestamp && entry.action === "earn") {
                // Expire the points
                try {
                    const result = await loyaltyProgramContract.methods
                        .expirePoints(i)
                        .send({ from: walletAddress, gas: 500000 });

                    // console.log(`Expired points for entry ${i}, Transaction Hash:`, result.transactionHash);
                } catch (error) {

                }
            }
        }

        return 'success'

    } catch (error) {
        console.log(error)
        return 'error'
    }
}


const totalUserPoints = async (walletAddress) => {
    try {
        await fixExpiredToken(walletAddress)
        // Get user's total earned points
        const totalEarnedPoints = await loyaltyProgramContract.methods
            .getTotalEarnedPoints(walletAddress)
            .call();

        return convertFromWei(totalEarnedPoints);

    } catch (error) {
        return 'error'
    }
}

const mintAndEarnPoints = async (walletAddress, pointsToEarn) => {
    try {
        await fixExpiredToken(walletAddress)
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
            .earnPoints(convertToWei(pointsToEarn))
            .send({ from: walletAddress, gas: 5000000 });
        return 'success'

    } catch (error) {
        console.log(error)
        return 'error'
    }
}

const redeemUserPoints = async (walletAddress, pointsToRedeem) => {
    try {
        await fixExpiredToken(walletAddress)
        const redeemResult = await loyaltyProgramContract.methods
            .redeemPoints(convertToWei(pointsToRedeem))
            .send({ from: walletAddress, gas: 5000000 });

        // console.log("Redeem Points Transaction Hash:", redeemResult.transactionHash);
        return 'success'

    } catch (error) {
        console.log(error)
        return 'error'
    }
}

const getUserPointsHistory = async (walletAddress) => {
    try {
        BigInt.prototype.toJSON = function () {
            return this.toString();
        };
        await fixExpiredToken(walletAddress)
        // Retrieve and print transaction logs with amount and timestamps for each earned point
        const earnedPoints = await loyaltyProgramContract.methods
            .getEarnedPointsWithTimestamps(walletAddress)
            .call();

        return earnedPoints

    } catch (error) {
        console.log(error)
        return 'error'
    }
}

const convertToWei = (amount) => {
    return web3.utils.toWei(amount, "ether");
}
const convertFromWei = (amount) => {
    return web3.utils.fromWei(amount, "ether");
}

export { totalUserPoints, mintAndEarnPoints, fixExpiredToken, redeemUserPoints, getUserPointsHistory }