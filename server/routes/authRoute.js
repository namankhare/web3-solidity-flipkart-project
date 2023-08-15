import express from "express";
import { isSignedIn, refresh, signin, signout, signup } from "../controller/authController.js";
const authRoute = express.Router();

authRoute.post("/signup", signup);

authRoute.post("/signin", signin);

authRoute.post("/refresh",refresh);

// authRoute.get("/user",isSignedIn,(req,res)=>{
//     res.send(req.auth)
// });

authRoute.get("/signout", isSignedIn, signout);


export default authRoute;