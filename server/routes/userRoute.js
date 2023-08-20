const express = require('express');
const { isSeller, isSignedIn } = require('../controller/authController.js');
const { getUser, updateUser, deleteUser, viewProducts, getItem, checkout, addAndGetWalletAddress, claimReward } = require('../controller/userController.js');

const userRoute = express.Router();

// Route to get user information (authentication required)
userRoute.get('/getUser', isSignedIn, getUser);

// Route to add and get wallet address (authentication required)
userRoute.post('/addandgetwalletaddress', isSignedIn, addAndGetWalletAddress);

// Route to update user information (authentication required)
userRoute.put('/updateUser', isSignedIn, updateUser);

// Route to delete user (authentication and seller role required)
userRoute.delete('/deleteUser', isSignedIn, isSeller, deleteUser);

// Route to view products
userRoute.get('/viewProducts', viewProducts);

// Route to get item details by ID
userRoute.get('/getItem/:id', getItem);

// Route to perform checkout
userRoute.post('/checkout', isSignedIn, checkout);

// Route to claim reward
userRoute.post('/claimReward', isSignedIn, claimReward);

// Export the userRoute
module.exports = userRoute;
