import express from 'express';
import { afterPaymentSeller, deleteItem, getAllItems, getItem, launchProduct, updateItem } from '../controller/sellerController.js';
import { isPartner, isSignedIn } from '../controller/authController.js';
import { upload } from '../helper/multer.js';
import { getAllPartnerItems } from '../controller/partnerController.js';

const partnerRouter = express.Router();

partnerRouter.get('/getAllPartnerItems', isSignedIn, isPartner, getAllPartnerItems);

// partnerRouter.post('/createProducts', isSignedIn, isSeller, upload.single('photo'), launchProduct);
// partnerRouter.get('/getItem/:id', isSignedIn, isSeller, getItem);
// partnerRouter.put('/updateItem/:id', isSignedIn, isSeller, upload.single('photo'), updateItem);
// partnerRouter.delete('/deleteItem/:id', isSignedIn, isSeller, deleteItem);
// partnerRouter.post('/afterPayment', afterPaymentSeller);


export default partnerRouter;