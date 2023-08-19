import express from 'express';

const router = express.Router();

// Authentication Router
import authRoute from './routes/authRoute.js';
router.use('/auth', authRoute);

// User Router
import userRoute from './routes/userRoute.js';
router.use('/user', userRoute);

// Seller Router
import sellerRoute from './routes/sellerRoute.js';
router.use('/seller', sellerRoute);

// Admin Router
import adminRoute from './routes/adminRoute.js';
router.use('/admin', adminRoute);

// web3 Router
import userDetailRoute from './web3/routes/userDetailRoute.js';
router.use('/web3', userDetailRoute);




export default router;