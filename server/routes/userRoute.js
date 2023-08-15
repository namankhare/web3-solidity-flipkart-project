import express from "express";
import { isSignedIn } from "../controller/authController.js";
import { getUser, updateUser, deleteUser } from "../controller/userController.js";

const userRoute = express.Router();

userRoute.get("/getUser", isSignedIn, getUser);
userRoute.put("/updateUser", isSignedIn, updateUser);
userRoute.delete("/deleteUser", isSignedIn, deleteUser);

export default userRoute;