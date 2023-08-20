import express from "express";
import { isSeller, isSignedIn } from "../controller/authController.js";
import { getUser, updateUser, deleteUser, viewProducts, getItem, checkout, addAndGetWalletAddress } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/getUser", isSignedIn, getUser);
userRoute.post("/addandgetwalletaddress", isSignedIn, addAndGetWalletAddress);
userRoute.put("/updateUser", isSignedIn, updateUser);
userRoute.delete("/deleteUser", isSignedIn, isSeller, deleteUser);
userRoute.get("/viewProducts", viewProducts);
userRoute.get('/getItem/:id', getItem);
// userRoute.post('/checkoutPoints',isSignedIn,isSeller, checkoutWithPoints);
userRoute.post('/checkout', isSignedIn, checkout);
// userRoute.post('/afterPayment',isSignedIn,isSeller, afterPaymentUser);

export default userRoute;