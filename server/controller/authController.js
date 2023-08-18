import User from '../model/user.js';
import bycrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {expressjwt} from 'express-jwt';

const signup = async (req, res, next) => {
    const {username, email, name, password} = req.body;

    if(!(username && email && name && password)){
        res.status(400).json({message: "All fields are required"});
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        res.status(400).json({message: "User already exists, login instead"});
    }
    else{

        const hashedPassword = await bycrypt.hash(password, 12);
        const user = new User({...req.body, password: hashedPassword});

        try {
            await user.save();
            res.status(201).json({message: user});
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    } 
}

const signin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        if(!(email && password)){
            res.status(400).json({message: "All fields are required"});
        }
    
        const existingUser = await User.findOne({email});
    
        if(!existingUser){
            res.status(400).json({message: "User not found, signup please"});
        }
        else{
            const isPasswordCorrect = await bycrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect){
                res.status(400).json({message: "Invalid credentials"});
            }
            else{

                const token = jwt.sign({_id: existingUser._id, email: existingUser.email}, process.env.JWT_SECRET, {expiresIn: "60s"});
                res.cookie(existingUser._id, token, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 60 * 1000),
                    sameSite: 'lax',
                    secure: true
                })
                const refreshToken = jwt.sign({_id: existingUser._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"});
                
                res.status(200).json({
                    message: "Sucessfully logged in",
                    token,
                    refreshToken
                })
                
                
            }
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

// payload extraction
const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}
const refresh = async (req, res, next) => {
    const cookies = req.headers.cookie;
    if(cookies === undefined){
        return res.status(401).json({message: "Not authenticated"});
    }
    const previousAccessToken = cookies.split('=')[1];
    const previousRefreshToken = req.body.refreshToken;

    console.log(previousAccessToken, previousRefreshToken);

    const parsedAccessToken = parseJwt(previousAccessToken);
    const parsedRefreshToken = parseJwt(previousRefreshToken);

    if(!previousRefreshToken){
        return res.status(401).json({message: "Not authenticated"});
    }

    const accessToken = jwt.sign({_id: parsedAccessToken._id, email: parsedAccessToken.email}, process.env.JWT_SECRET, {expiresIn: "1min"});
    res.cookie(parsedAccessToken._id, accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
        sameSite: 'lax',
        secure: true
    })
    const refreshToken = jwt.sign({_id: parsedRefreshToken._id}, process.env.JWT_REFRESH_SECRET, {expiresIn: "7d"});
    
    res.status(200).json({
        message: "Sucessfully refreshed access",
        accessToken,
        refreshToken
    })
    
}

const isSignedIn = expressjwt({
    secret: process.env.JWT_SECRET || "flipkartLoyaltyRewards",
    algorithms: ['HS256'],
    userProperty: 'auth',
    getToken: (req) => {
        if(req.headers.cookie){
            const cookies = req.headers.cookie;
            const token = cookies.split('=')[1];
            return token;
        }
        else{

             return null;
        }
    }
})

const signout = (req, res, next) => {
    res.clearCookie(req.auth._id);
    res.status(200).json({message: "Sucessfully logged out"});
}

export {signin, signup, refresh, isSignedIn, signout};