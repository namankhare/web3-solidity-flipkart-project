const User = require('../model/user.js');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');
const { mintAndEarnPoints } = require('../web3/utils/helper.js');

// User signup function
const signup = async (req, res, next) => {
    // Destructuring properties from the request body
    const { username, email, name, password, address, phone, referredBy, role, walletAddress } = req.body;

    // Validation for required fields
    if (!(username && email && name && password)) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Role validation
    if (role > 2) return res.status(400).json({ message: "Not Allowed" });

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        res.status(400).json({ message: "User already exists, login instead" });
    } else {
        // Hash the password
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
            // Save the user
            let saveSignup = await user.save();
            let { password, ...signupdata } = saveSignup._doc;
            try {
                // Handle referral logic
                if (referredBy !== '' && referredBy !== null) {
                    let info = await User.findOneAndUpdate({ username: referredBy },
                        { $push: { referredUsers: signupdata._id } });
                    await mintAndEarnPoints(info.userWallet, process.env.POINTS_ON_REFER, signupdata._id.toString(), `Referral Reward: ${signupdata.name.toString()}`);
                }
            } catch (error) {
                console.log(error);
            }
            res.status(201).json({ data: signupdata, message: "Signup Successful", status: "success" });
        } catch (error) {
            return res.status(500).json({ message: error.message, status: "error" });
        }
    }
};

// User signin function
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
        } else {
            const isPasswordCorrect = await bycrypt.compare(plainPassword, password);
            if (!isPasswordCorrect) {
                res.status(400).json({ message: "Invalid credentials" });
            } else {
                // Generate tokens for authentication
                const token = jwt.sign({ _id: existingUser._id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

                res.cookie("token", token, { expires: new Date(Date.now() + 60 * 1000 * 24), httpOnly: true, sameSite: "None", secure: true })

                const refreshToken = jwt.sign({ _id: existingUser._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

                res.status(200).json({
                    user: existingUser,
                    message: "Successfully logged in",
                    token,
                    refreshToken,
                    status: 'success'
                })
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Parse JWT token
const parseJwt = (token) => {
    try {
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    } catch (error) {
        return null;
    }
};

// Refresh access token
const refresh = async (req, res, next) => {
    try {
        const cookies = req.headers.cookie;
        if (cookies === undefined) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const previousAccessToken = req.cookies.token
        const previousRefreshToken = req.body.refreshToken;

        const parsedAccessToken = parseJwt(previousAccessToken);
        const parsedRefreshToken = parseJwt(previousRefreshToken);

        if (!previousRefreshToken) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        const accessToken = jwt.sign({ _id: parsedAccessToken._id, email: parsedAccessToken.email }, process.env.JWT_SECRET, { expiresIn: "1min" });

        res.cookie("token", accessToken, { expires: new Date(Date.now() + 60 * 1000 * 24), httpOnly: true, sameSite: "None", secure: true })

        const refreshToken = jwt.sign({ _id: parsedRefreshToken._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            message: "Successfully refreshed access",
            accessToken,
            refreshToken,
            status: 'success'
        })
    } catch (error) {
        res.status(200).json({
            message: "Error Occurred",
            status: 'error'
        })
        console.log(error)
    }
};

// Refresh authentication state
const refreshAuthState = async (req, res, next) => {
    const accessToken = req.cookies.token || req.body.refreshToken

    if (!accessToken) {
        return res.json({ message: "User not authenticated!", status: false })
    }
    if (accessToken === "undefined") {
        return res.json({ message: "User not authenticated!", status: false })
    }

    let parsedAccessToken = await parseJwt(accessToken)
    const user = await User.findOne({ _id: parsedAccessToken._id });
    const { password, ...existingUser } = user._doc;

    let token = jwt.sign({ _id: parsedAccessToken._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME || "1d" });
    res.cookie("token", token, { expire: new Date() + 9999, httpOnly: true, sameSite: "None", secure: true })
    let newRefreshToken = jwt.sign({ _id: parsedAccessToken._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
    return res.json({ token: token, refreshToken: newRefreshToken, status: "success", user: existingUser });
};

// ExpressJWT middleware for checking user authentication
const isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET || "flipkartLoyaltyRewards",
    algorithms: ['HS256'],
    userProperty: 'auth',
    getToken: (req) => {
        if (req.cookies.token) {
            const token = req.cookies.token
            return token;
        } else {
            return null;
        }
    }
});

// Middleware for checking admin role
const isAdmin = (req, res, next) => {
    if (req.auth.role < 3) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
};

// Middleware for checking partner role
const isPartner = (req, res, next) => {
    if (req.auth.role < 2) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
};

// Middleware for checking seller role
const isSeller = (req, res, next) => {
    if (req.auth.role < 1) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
};

// Middleware for checking user role
const isUser = (req, res, next) => {
    if (req.auth.role == 1) {
        return res.status(403).json({ message: "You are not authorized" });
    }
    next();
};

// User signout function
const signout = (req, res, next) => {
    res.clearCookie("token");
    res.status(200).json({ data: null, message: "Successfully logged out", status: "success" });
};

// Export all the necessary functions
module.exports = {
    signin,
    signup,
    refresh,
    isSignedIn,
    isAdmin,
    isPartner,
    isSeller,
    isUser,
    signout,
    refreshAuthState
};
