import express from 'express';
import { deleteCard, getAllPartnerItems, getPartnerItems, launchCard, updateCard} from '../controller/partnerController';
import { isPartner, isSignedIn } from '../controller/authController.js';
import { upload } from '../helper/multer.js';

const partnerRouter = express.Router();

partnerRouter.get('/getAllPartnerItems', isSignedIn, isPartner, getAllPartnerItems);

partnerRouter.post('/createProducts', isSignedIn, isPartner, launchCard);
partnerRouter.get('/getItem', isSignedIn, isPartner, getPartnerItems);
partnerRouter.put('/updateItem/:id', isSignedIn, isPartner, updateCard);
partnerRouter.delete('/deleteItem/:id', isSignedIn, isPartner, deleteCard);


export default partnerRouter;