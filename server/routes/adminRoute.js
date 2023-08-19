import express from 'express';
import { viewAllCustomer , viewAllSellers, updateUser, deleteUser} from '../controller/adminController.js';
import { isAdmin, isSignedIn } from '../controller/authController.js';
const adminRoute = express.Router();

adminRoute.get('/viewAllCustomer',isSignedIn,isAdmin, viewAllCustomer);
adminRoute.get('/viewAllSellers',isSignedIn,isAdmin, viewAllSellers);
adminRoute.put('/updateUser/:id',isSignedIn,isAdmin, updateUser);
adminRoute.delete('/deleteUser/:id', isSignedIn,isAdmin, deleteUser);

export default adminRoute;