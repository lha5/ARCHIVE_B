const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { auth } = require('../middleware/auth');

// ------------------------
//          User
// ------------------------

router.get('/auth', auth, userController.auth);

router.post('/signup', userController.signup);

// router.post('/login', userController.login);

// router.get('/logout', auth, userController.logout);

module.exports = router;
