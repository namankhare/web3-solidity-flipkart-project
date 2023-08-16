import express from 'express';
import {afterPaymentSeller, deleteItem, getAllItems, launchProduct, updateItem} from '../controller/sellerController.js';
import { isSignedIn } from '../controller/authController.js';

const sellerRouter = express.Router();

sellerRouter.post('/createProducts', isSignedIn , launchProduct);
sellerRouter.get('/getAllItems', isSignedIn , getAllItems);
sellerRouter.put('/updateItem/:id', isSignedIn , updateItem);
sellerRouter.delete('/deleteItem/:id', isSignedIn , deleteItem);
sellerRouter.post('/afterPayment', afterPaymentSeller);


export default sellerRouter;