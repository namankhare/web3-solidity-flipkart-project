const express = require('express');
const {
    isSignedIn,
    refresh,
    refreshAuthState,
    signin,
    signout,
    signup
} = require('../controller/authController.js');

// Create a new express router for the authentication routes
const authRoute = express.Router();

// Route for user signup
authRoute.post('/signup', signup);

// Route for user signin
authRoute.post('/signin', signin);

// Route for refreshing access tokens
authRoute.post('/refresh', refresh);

// Route for refreshing authentication state
authRoute.post('/refreshauthstate', refreshAuthState);

// Route for user signout
authRoute.get('/signout', isSignedIn, signout);

// Export the authentication router
module.exports = authRoute;
