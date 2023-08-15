import express from 'express';

const router = express.Router();

// Authentication Router
import authRoute from './routes/authRoute.js';
router.use('/auth', authRoute);

// User Router
import userRoute from './routes/userRoute.js';
router.use('/user', userRoute);


export default router;