const express = require('express');
const { deleteCard, getAllPartnerItems, getPartnerItems, launchCard, updateCard } = require('../controller/partnerController');
const { isPartner, isSignedIn } = require('../controller/authController.js');
const { upload } = require('../helper/multer.js');

const partnerRouter = express.Router();

partnerRouter.get('/getAllPartnerItems', isSignedIn, isPartner, getAllPartnerItems);
partnerRouter.post('/createProducts', isSignedIn, isPartner, launchCard);
partnerRouter.get('/getItem', isSignedIn, isPartner, getPartnerItems);
partnerRouter.put('/updateItem/:id', isSignedIn, isPartner, updateCard);
partnerRouter.delete('/deleteItem/:id', isSignedIn, isPartner, deleteCard);

module.exports = partnerRouter;
