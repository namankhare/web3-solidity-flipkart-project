import express from "express";
import { earnUserPoints, getPointsHistory, getUserPoints, redeemPoints } from "../controller/userDetailController.js";
import { isSignedIn } from "../../controller/authController.js";

const userDetailRoute = express.Router();

userDetailRoute.get("/getuserpoints", getUserPoints);
userDetailRoute.post("/earnuserpoints", earnUserPoints);
userDetailRoute.post("/redeempoints", redeemPoints);
userDetailRoute.get("/getpointshistory", getPointsHistory);

export default userDetailRoute;