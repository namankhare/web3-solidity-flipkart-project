import User from '../model/user.js';
import Product from '../model/product.js';
import { signout } from './authController.js';

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        res.status(200).json({ message: user });
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

const checkoutWithPoints = async (req, res, next) => {
    try {
        const data = req.body.products;
        if (!data) {
            return res.status(404).json({ message: "No products found" });
        }
        // console.log(req.auth);
        let totalDiscountWithPoints = 0;
        let finalAmount = 0;
        const user = await User.findById(req.auth._id);
        let userCurrentPoints = user.points;

        const payHelper = async (item) => {
            let product = await Product.findById(item.id);
            let currentPrice = (product.MRP - product.discount) * item.qnt;
            // console.log(currentPrice, product.points);
            let coinsReq = product.points * item.qnt;
            let enough = false;

            if (userCurrentPoints >= coinsReq) {
                totalDiscountWithPoints += coinsReq;
                userCurrentPoints -= coinsReq;
                enough = true;
            }
            else {
                coinsReq = 0;
            }

            finalAmount += currentPrice - coinsReq;
            return (
                {
                    id: item.id,
                    qnt: item.qnt,
                    pointsEarned: pointsGainWithPurchase(currentPrice - coinsReq),
                    pointsRedeemed: coinsReq,
                    price: currentPrice - coinsReq
                }
            )
        };


        const items = await Promise.all(data.map(item => payHelper(item)));
        console.log(totalDiscountWithPoints, userCurrentPoints);
        const FLT = (pointsGainWithPurchase(finalAmount));

        res.status(200).json({ message: "Amount to be paid", items, totalDiscountWithPoints, userCurrentPoints, FLT, finalAmount });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const checkoutWithoutPoints = async (req, res, next) => {
    try {
        const data = req.body.products;
        if (!data) {
            return res.status(404).json({ message: "No products found" });
        }

        let finalAmount = 0;
        let totalDiscountWithPoints = 0;
        const user = await User.findById(req.auth._id);
        let userCurrentPoints = user.points;

        const payHelper = async (item) => {
            let product = await Product.findById(item.id);
            let currentPrice = (product.MRP - product.discount) * item.qnt;
            finalAmount += currentPrice;
            return (
                {
                    id: item.id,
                    qnt: item.qnt,
                    pointsEarned: pointsGainWithPurchase(currentPrice),
                    pointsRedeemed: 0,
                    price: currentPrice
                }
            )
        };

        const items = await Promise.all(data.map(item => payHelper(item)));
        const FLT = pointsGainWithPurchase(finalAmount);

        res.status(200).json({ message: "Amount to be paid", items, totalDiscountWithPoints, userCurrentPoints, FLT, finalAmount });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const afterPaymentUser = async (req, res, next) => {
    try {

        const { userCurrentPoints, FLT, items } = req.body;

        const currentUser = await User.findById(req.auth._id);
        let OrderHistory = currentUser.OrderHistory;

        const order = await Promise.all(items.map(async (product) => {
            return {
                productId: product.id,
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

        const updatedPoins = userCurrentPoints + FLT;

        const user = await User.findByIdAndUpdate(req.auth._id, { points: updatedPoins, OrderHistory }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Updated the points", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getUser, updateUser, deleteUser, viewProducts, getItem, checkoutWithPoints, checkoutWithoutPoints, afterPaymentUser };