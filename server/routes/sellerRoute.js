import express from 'express';
import { afterPaymentSeller, deleteItem, getAllItems, getItem, launchProduct, updateItem } from '../controller/sellerController.js';
import { isSeller, isSignedIn } from '../controller/authController.js';
import { upload } from '../helper/multer.js';

const sellerRouter = express.Router();

sellerRouter.post('/createProducts', isSignedIn, isSeller, upload.single('photo'), launchProduct);
sellerRouter.get('/getAllItems', isSignedIn, isSeller, getAllItems);
sellerRouter.get('/getItem/:id', isSignedIn, isSeller, getItem);
sellerRouter.put('/updateItem/:id', isSignedIn, isSeller, upload.single('photo'), updateItem);
sellerRouter.delete('/deleteItem/:id', isSignedIn, isSeller, deleteItem);
sellerRouter.post('/afterPayment', afterPaymentSeller);


export default sellerRouter;