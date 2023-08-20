const express = require('express');

const router = express.Router();

// Authentication Router
const authRoute = require('./routes/authRoute.js');
router.use('/auth', authRoute);

// User Router
const userRoute = require('./routes/userRoute.js');
router.use('/user', userRoute);

// Seller Router
const sellerRoute = require('./routes/sellerRoute.js');
router.use('/seller', sellerRoute);

// Partner Router
const partnerRoute = require('./routes/partnerRoute.js');
router.use('/partner', partnerRoute);

// Admin Router
const adminRoute = require('./routes/adminRoute.js');
router.use('/admin', adminRoute);

// Web3 Router
const userDetailRoute = require('./web3/routes/userDetailRoute.js');
router.use('/web3', userDetailRoute);

module.exports = router;
