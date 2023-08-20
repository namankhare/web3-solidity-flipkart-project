const express = require('express');
const { viewAllCustomer, viewAllSellers, updateUser, deleteUser } = require('../controller/adminController.js');
const { isAdmin, isSignedIn } = require('../controller/authController.js');
const adminRoute = express.Router();

adminRoute.get('/viewAllCustomer', isSignedIn, isAdmin, viewAllCustomer);
adminRoute.get('/viewAllSellers', isSignedIn, isAdmin, viewAllSellers);
adminRoute.put('/updateUser/:id', isSignedIn, isAdmin, updateUser);
adminRoute.delete('/deleteUser/:id', isSignedIn, isAdmin, deleteUser);

module.exports = adminRoute;
