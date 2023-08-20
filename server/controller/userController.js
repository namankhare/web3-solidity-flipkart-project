const User = require('../model/user.js');
const Product = require('../model/product.js');
const PartnerProduct = require('../model/partnerProduct.js');
const { signout } = require('./authController.js');
const { mintAndEarnPoints, redeemUserPoints, totalUserPoints } = require('../web3/utils/helper.js');
const { v4: uuidv4 } = require('uuid');


const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        res.status(200).json({ message: "fetched successfully", data: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const addAndGetWalletAddress = async (req, res, next) => {
    try {
        let user = await User.findById(req.auth._id);
        if (!user.userWallet) {
            user = await User.findByIdAndUpdate(req.auth._id,
                { userWallet: req.body.walletAddress },
                { new: true });

        } else if (user.userWallet && user.userWallet !== req.body.walletAddress) {
            return res.status(501).json({ message: "Another account is already linked with this account", data: null, status: 'error' });
        }

        return res.status(200).json({ message: "Connected successfully", data: user.userWallet });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res, next) => {
    try {

        const data = req.body;
        const { password, name, points, SoldItemsHistory, role, referredTo, referredBy, ...others } = data;

        const user = await User.findByIdAndUpdate(req.auth._id, others, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: user });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res, next) => {

    try {
        const user = await User.findByIdAndDelete(req.auth._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Deleted successfully", user: user });
        signout();

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const viewProducts = async (req, res, next) => {
    try {

        const products = await Product.find({});
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json({ data: products, message: "Products fetched successfully", status: "success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getItem = async (req, res, next) => {
    const productId = req.params.id;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product: product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const pointsGainWithPurchase = (total) => {
    let FLT = Math.floor(total / 100) * 2;
    if (FLT > 50) FLT = 50;

    return FLT;
}

const checkout = async (req, res, next) => {
    try {
        const data = req.body.products;
        const usePoints = req.body.usePoints;
        const walletAddress = req.body.wallet
        if (!data) {
            return res.status(404).json({ message: "No products found" });
        }
        let totalDiscountWithPoints = 0;
        let finalAmount = 0;
        const user = await User.findById(req.auth._id);
        let userCurrentPoints = user.points;
        let productName = '';
        let orderUUID = uuidv4();

        const payHelper = async (item) => {
            let product = await Product.findById(item._id);
            let currentPrice = (product.MRP - product.discount) * item.qnt;
            // console.log(currentPrice, product.points);
            let coinsReq = 0

            if (usePoints === true) coinsReq = (product.points / 100) * currentPrice;


            let enough = false;

            if (userCurrentPoints >= coinsReq) {
                totalDiscountWithPoints += coinsReq;
                userCurrentPoints -= coinsReq;
                enough = true;
            }
            else {
                coinsReq = 0;
            }
            productName += item.name + " "

            finalAmount += currentPrice - coinsReq;
            return (
                {
                    id: item._id,
                    name: item.name,
                    qnt: item.qnt,
                    pointsEarned: pointsGainWithPurchase(currentPrice - coinsReq),
                    pointsRedeemed: coinsReq,
                    price: currentPrice - coinsReq
                }
            )
        };


        const items = await Promise.all(data.map(item => payHelper(item)));
        // console.log(totalDiscountWithPoints, userCurrentPoints);

        // earn points
        const FLT = (pointsGainWithPurchase(finalAmount));

        // redeem points: totalDiscountWithPoints

        // first check if blockchain have enough points
        if (usePoints === true) {
            let blockHaveEnoughPoints = await totalUserPoints(walletAddress) || 0
            console.log("blockHaveEnoughPoints", blockHaveEnoughPoints, totalDiscountWithPoints)
            if (blockHaveEnoughPoints < totalDiscountWithPoints && totalDiscountWithPoints > 0) {
                return res.status(200).json({ message: "You don't have enough points to redeem", data: null, status: "error" });
            } else if (blockHaveEnoughPoints >= totalDiscountWithPoints && totalDiscountWithPoints > 0) {
                // if have enough points redeem item
                let redeemPoints = await redeemUserPoints(walletAddress, totalDiscountWithPoints, orderUUID, productName)
                if (redeemPoints !== "success") {
                    return res.status(200).json({ message: "oho! error occoured! cannot proceed this time", data: null, status: "error" });
                }
            }
        }
        // lets mint and send earned points to the users wallet
        console.log(walletAddress, FLT, orderUUID, productName)
        let isMintSuccessfull = await mintAndEarnPoints(walletAddress, FLT, orderUUID, productName)
        console.log("isMintSuccessfullyaah", isMintSuccessfull)
        if (isMintSuccessfull !== "success") {
            return res.status(200).json({ message: "oho! error occoured! cannot proceed this time", data: null, status: "error" });
        }

        let OrderHistory = user.OrderHistory;

        const order = await Promise.all(items.map(async (product) => {
            return {
                productId: product.id,
                productName: product.name,
                quantity: product.qnt,
                pointsEarned: product.pointsEarned,
                pointsRedeemed: product.pointsRedeemed,
                price: product.price,
                paymentMethod: product.paymentMethod,
                dateOfOrder: new Date(),
                uuid: orderUUID
            }
        }));

        OrderHistory.push(order);

        const updatedPoints = userCurrentPoints + FLT;

        await User.findByIdAndUpdate(req.auth._id, { points: updatedPoints, OrderHistory }, { new: true });

        res.status(200).json({ message: "Order Placed successfully!", items, totalDiscountWithPoints, updatedPoints, FLT, finalAmount, OrderHistory });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const claimReward = async (req, res, next) => {
    try {
        const data = req.body.rewardId;
        const walletAddress = req.body.wallet;
        if (!walletAddress) {
            return res.status(200).json({ message: "connect your wallet again!" });
        }
        if (!data) {
            return res.status(404).json({ message: "No Reward found" });
        }

        let orderUUID = uuidv4();

        // const user = await User.findById(req.auth._id); 
        const partnerProduct = await PartnerProduct.findById(data);
        let productName = partnerProduct.reward_name;
        let totalDiscountWithPoints = partnerProduct.loyalty_coins_required

        // first check if blockchain have enough points
        let blockHaveEnoughPoints = await totalUserPoints(walletAddress) || 0
        console.log("blockHaveEnoughPoints", blockHaveEnoughPoints, totalDiscountWithPoints)
        if (blockHaveEnoughPoints < totalDiscountWithPoints && totalDiscountWithPoints > 0) {
            return res.status(200).json({ message: "You don't have enough points to redeem", data: null, status: "error" });
        } else if (blockHaveEnoughPoints >= totalDiscountWithPoints && totalDiscountWithPoints > 0) {
            // if have enough points redeem item
            let redeemPoints = await redeemUserPoints(walletAddress, totalDiscountWithPoints, orderUUID, productName)
            if (redeemPoints !== "success") {
                return res.status(200).json({ message: "oho! error occoured! cannot proceed this time", data: null, status: "error" });
            }
        }

        // refrund if any issue occoured
        // let isMintSuccessfull = await mintAndEarnPoints(walletAddress, FLT, orderUUID, productName)
        // console.log("isMintSuccessfull", isMintSuccessfull)
        // if (isMintSuccessfull !== "success") {
        //     return res.status(200).json({ message: "oho! error occoured! cannot proceed this time", data: null, status: "error" });
        // }

        let ClaimedCoupon = {
            rewardsCouponId: data,
            reward_name: partnerProduct.reward_name,
            validUntil: new Date(partnerProduct.details.valid_until),
            applicableOn: partnerProduct.details.applicable_on,
            couponCode: orderUUID,
            description: partnerProduct.description,
            loyaltyCoinsUsed: partnerProduct.loyalty_coins_required
        }
        await User.findByIdAndUpdate(
            req.auth._id,
            {
                points: parseFloat(blockHaveEnoughPoints - totalDiscountWithPoints),
                $push: { ClaimedCoupon }
            },
            { new: true }
        );
        res.status(200).json({ message: "Coupon Claimed successfully!", status: 'success' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// const checkoutWithoutPoints = async (req, res, next) => {
//     try {
//         const data = req.body.products;
//         if (!data) {
//             return res.status(404).json({ message: "No products found" });
//         }

//         let finalAmount = 0;
//         let totalDiscountWithPoints = 0;
//         const user = await User.findById(req.auth._id);
//         let userCurrentPoints = user.points;

//         const payHelper = async (item) => {
//             let product = await Product.findById(item.id);
//             let currentPrice = (product.MRP - product.discount) * item.qnt;
//             finalAmount += currentPrice;
//             return (
//                 {
//                     id: item.id,
//                     qnt: item.qnt,
//                     pointsEarned: pointsGainWithPurchase(currentPrice),
//                     pointsRedeemed: 0,
//                     price: currentPrice
//                 }
//             )
//         };

//         const items = await Promise.all(data.map(item => payHelper(item)));
//         const FLT = pointsGainWithPurchase(finalAmount);

//         res.status(200).json({ message: "Amount to be paid", items, totalDiscountWithPoints, userCurrentPoints, FLT, finalAmount });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const afterPaymentUser = async (req, res, next) => {
    try {

        const { userCurrentPoints, FLT, items } = req.body;

        const currentUser = await User.findById(req.auth._id);
        let OrderHistory = currentUser.OrderHistory;

        const order = await Promise.all(items.map(async (product) => {
            return {
                productId: product._id,
                quantity: product.qnt,
                pointsEarned: product.pointsEarned,
                pointsRedeemed: product.pointsRedeemed,
                price: product.price,
                paymentMethod: product.paymentMethod,
                dateOfOrder: product.dateOfOrder
            }
        }));

        OrderHistory.push(order);
        console.log(OrderHistory);

        const updatedPoints = userCurrentPoints + FLT;

        const user = await User.findByIdAndUpdate(req.auth._id, { points: updatedPoints, OrderHistory }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Updated the points", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { claimReward, getUser, updateUser, deleteUser, viewProducts, getItem, checkout, addAndGetWalletAddress };
