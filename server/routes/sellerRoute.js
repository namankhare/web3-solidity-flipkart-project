import express from 'express';
import {afterPaymentSeller, deleteItem, getAllItems, launchProduct, updateItem} from '../controller/sellerController.js';
import { isSeller, isSignedIn } from '../controller/authController.js';

const sellerRouter = express.Router();

sellerRouter.post('/createProducts', isSignedIn ,isSeller, launchProduct);
sellerRouter.get('/getAllItems', isSignedIn ,isSeller, getAllItems);
sellerRouter.put('/updateItem/:id', isSignedIn ,isSeller, updateItem);
sellerRouter.delete('/deleteItem/:id', isSignedIn ,isSeller, deleteItem);
sellerRouter.post('/afterPayment', afterPaymentSeller);


export default sellerRouter;