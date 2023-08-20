const {
    getUserPointsHistory,
    mintAndEarnPoints,
    redeemUserPoints,
    totalUserPoints,
} = require("../utils/helper.js");

const getUserPoints = async (req, res, next) => {
    try {
        const walletAddress = req.query.wallet;
        // Get user's total earned points
        let result = await totalUserPoints(walletAddress);
        res.status(200).json({
            data: result,
            status: "success",
            message: "points fetched successfully!",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, status: "error", message: error.message });
    }
};

const earnUserPoints = async (req, res, next) => {
    try {
        const data = req.body;
        // Get user's total earned points
        let result = await mintAndEarnPoints(
            data.walletAddress,
            data.pointsToEarn,
            req.body.orderId,
            req.body.orderName
        );
        res.status(200).json({
            data: result,
            status: "success",
            message: "points added successfully!",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, status: "error", message: error.message });
    }
};

const redeemPoints = async (req, res, next) => {
    try {
        const data = req.body;
        // Get user's total earned points
        let result = await redeemUserPoints(
            data.walletAddress,
            data.pointsToRedeem,
            req.body.orderId,
            req.body.orderName
        );
        res.status(200).json({
            data: result,
            status: "success",
            message: "points redeemed successfully!",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, status: "error", message: error.message });
    }
};

const getPointsHistory = async (req, res, next) => {
    try {
        const walletAddress = req.query.wallet;
        /// Get user's total earned points
        let result = await getUserPointsHistory(walletAddress);
        res.status(200).json({
            data: result,
            status: "success",
            message: "data fetched successfully!",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ data: null, status: "error", message: error.message });
    }
};

module.exports = { getUserPoints, earnUserPoints, redeemPoints, getPointsHistory };
