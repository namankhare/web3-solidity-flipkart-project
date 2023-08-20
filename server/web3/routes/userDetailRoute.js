const express = require("express");
const { earnUserPoints, getPointsHistory, getUserPoints, redeemPoints } = require("../controller/userDetailController.js");
const { isSignedIn } = require("../../controller/authController.js");

const userDetailRoute = express.Router();

userDetailRoute.get("/getuserpoints", getUserPoints);
userDetailRoute.post("/earnuserpoints", earnUserPoints);
userDetailRoute.post("/redeempoints", redeemPoints);
userDetailRoute.get("/getpointshistory", getPointsHistory);

module.exports = userDetailRoute;
