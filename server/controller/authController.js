import User from '../model/user.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';

const signup = async (req, res, next) => {
    const { username, email, name, password, address, phone, referredBy, role, walletAddress } = req.body;

    if (!(username && email && name && password && role)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (role > 2) return res.status(400).json({ message: "Not Allowed" });


    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400).json({ message: "User already exists, login instead" });
    }
    else {
        const hashedPassword = await bycrypt.hash(password, 12);
        let data = {
            name: name,
            username: username,
            email: email,
            address: address,
            phone: phone,
            password: hashedPassword,
            referredBy: referredBy,
            role: role,
            userWallet: walletAddress
        }
        const user = new User(data);

        try {
            let saveSignup = await user.save();
            let { password, ...signupdata } = saveSignup._doc;
            console.log(signupdata)
            try {
                if (referredBy !== '' && referredBy !== null) {
                    await User.findOneAndUpdate({ username: referredBy },
                        { $push: { referredUsers: signupdata._id } });
                }
            } catch (error) {
                console.log(error)
            }
            res.status(201).json({ data: signupdata, message: "Signup Successfull", staus: "success" });
        } catch (error) {
            return res.status(500).json({ message: error.message, staus: "error" });
        }
    }
}

const signin = async (req, res, next) => {
    const { email } = req.body;
    const plainPassword = req.body.password;
    try {
        if (!(email && plainPassword)) {
            res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        const { password, ...existingUser } = user._doc;


        if (!existingUser) {
            res.status(400).json({ message: "User not found, signup please" });
        }
        else {
            const isPasswordCorrect = await bycrypt.compare(plainPassword, password);
            if (!isPasswordCorrect) {
                res.status(400).json({ message: "Invalid credentials" });
            }
            else {
                const token = jwt.sign({ _id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

                res.cookie("token", token, { expires: new Date(Date.now() + 60 * 1000 * 24), httpOnly: true, sameSite: "None", secure: true })

                const refreshToken = jwt.sign({ _id: existingUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

                res.status(200).json({
                    user: existingUser,
                    message: "Sucessfully logged in",
                    token,
                    refreshToken,
                    status: 'success'
                })


            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// payload extraction
const parseJwt = (token) => {
    try {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch (error) {
        return null
    }
}
const refresh = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        if (cookies === undefined) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const previousAccessToken = req.cookies.token
        const previousRefreshToken = req.body.refreshToken;

        console.log(previousAccessToken, previousRefreshToken);

        const parsedAccessToken = parseJwt(previousAccessToken);
        const parsedRefreshToken = parseJwt(previousRefreshToken);

        if (!previousRefreshToken) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const accessToken = jwt.sign({ _id: parsedAccessToken._id, email: parsedAccessToken.email }, process.env.JWT_SECRET, { expiresIn: "1min" });

        res.cookie("token", accessToken, { expires: new Date(Date.now() + 60 * 1000 * 24), httpOnly: true, sameSite: "None", secure: true })

        const refreshToken = jwt.sign({ _id: parsedRefreshToken._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Sucessfully refreshed access",
            accessToken,
            refreshToken,
            status: 'success'
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Occoured",
            status: 'error'
        })
        console.log(error)
    }

}

const refreshAuthState = async (req, res, next) => {
    const accessToken = req.cookies.token || req.body.refreshToken

    if (!accessToken) {
        return res.json({ message: "User not authenticated!", status: false })
    }
    if (accessToken === "undefined") {
        return res.json({ message: "User not authenticated!", status: false })
    }
    // console.log(accessToken)
    let parsedAccessToken = await parseJwt(accessToken)
    const user = await User.findOne({ _id: parsedAccessToken._id });
    const { password, ...existingUser } = user._doc;

    let token = jwt.sign({ _id: parsedAccessToken._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME || "1d" });
    res.cookie("token", token, { expire: new Date() + 9999, httpOnly: true, sameSite: "None", secure: true })
    let newRefreshToken = jwt.sign({ _id: parsedAccessToken._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return res.json({ token: token, refreshToken: newRefreshToken, status: "success", user: existingUser })
}

const isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET || "flipkartLoyaltyRewards",
    algorithms: ['HS256'],
    userProperty: 'auth',
    getToken: (req) => {
        if (req.cookies.token) {
            const token = req.cookies.token
            return token;
        }
        else {
            return null;
        }
    }
})

const isAdmin = (req, res, next) => {
    if (req.auth.role < 3) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
}
const isPartner = (req, res, next) => {
    if (req.auth.role < 2) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
}
const isSeller = (req, res, next) => {
    if (req.auth.role < 1) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
}
const isUser = (req, res, next) => {
    if (req.auth.role == 1) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
}

const signout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ data: null, message: "Sucessfully logged out", status: "success" });
}

export { signin, signup, refresh, isSignedIn, isAdmin, isPartner, isSeller, isUser, signout, refreshAuthState };