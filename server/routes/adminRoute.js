import express from 'express';
import { viewAllCustomer , viewAllSellers, updateUser, deleteUser} from '../controller/adminController.js';
import { isSignedIn } from '../controller/authController.js';
const adminRoute = express.Router();

adminRoute.get('/viewAllCustomer',isSignedIn, viewAllCustomer);
adminRoute.get('/viewAllSellers',isSignedIn, viewAllSellers);
adminRoute.put('/updateUser/:id',isSignedIn, updateUser);
adminRoute.delete('/deleteUser/:id', isSignedIn, deleteUser);

export default adminRoute;