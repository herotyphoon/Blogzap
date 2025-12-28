const express = require('express');

const {
    handleRenderSignupPage,
    handleRenderLoginPage,
    handleUserSignup,
    handleUserLogin,
    handleUserLogout
} = require('../controllers/user.controllers.js');
const { verifyPassword } = require('../middleware/auth.middleware.js')

const router = express.Router();

router.get('/signup', handleRenderSignupPage);

router.get('/login', handleRenderLoginPage);

router.post('/signup', handleUserSignup);

router.post('/login', handleUserLogin);

router.get('/logout', handleUserLogout);


module.exports = router;