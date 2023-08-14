import express from 'express';

const router = express.Router();

// Authentication Router
import authRoute from './routes/authRoute.js';
router.use('/auth', authRoute);


export default router;