import express from "express";
import { isSignedIn } from "../controller/authController.js";
import { getUser, updateUser, deleteUser, viewProducts, getItem, checkoutWithPoints, checkoutWithoutPoints, afterPaymentUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/getUser", isSignedIn, getUser);
userRoute.put("/updateUser", isSignedIn, updateUser);
userRoute.delete("/deleteUser", isSignedIn, deleteUser);
userRoute.get("/viewProducts", viewProducts);
userRoute.get('/getItem/:id', getItem);
userRoute.post('/checkoutPoints',isSignedIn, checkoutWithPoints);
userRoute.post('/checkout',isSignedIn, checkoutWithoutPoints);
userRoute.post('/afterPayment',isSignedIn, afterPaymentUser);

export default userRoute;