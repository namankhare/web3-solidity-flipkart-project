const express = require('express');
const {
    afterPaymentSeller,
    deleteItem,
    getAllItems,
    getItem,
    launchProduct,
    updateItem,
} = require('../controller/sellerController.js');
const { isSeller, isSignedIn } = require('../controller/authController.js');
const { upload } = require('../helper/multer.js');

const sellerRouter = express.Router();

sellerRouter.post('/createProducts', isSignedIn, isSeller, upload.single('photo'), launchProduct);
sellerRouter.get('/getAllItems', isSignedIn, isSeller, getAllItems);
sellerRouter.get('/getItem/:id', isSignedIn, isSeller, getItem);
sellerRouter.put('/updateItem/:id', isSignedIn, isSeller, upload.single('photo'), updateItem);
sellerRouter.delete('/deleteItem/:id', isSignedIn, isSeller, deleteItem);
sellerRouter.post('/afterPayment', afterPaymentSeller);

module.exports = sellerRouter;
