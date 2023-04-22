const express = require('express');
const userControllers = require('../controllers/user-controllers');
const router = express.Router();
const { check } = require('express-validator');

// The /register page.
router.post('/register',
  [
    check('username')
      .not().isEmpty(),
    check('password')
      .isLength({ min: 8 })
      .not().isEmpty()
  ],
  userControllers.register
);

// The /login page.
router.post('/login', userControllers.login);

// Retrieve user object.
router.get('/user/:uid', userControllers.getUserById);

// User account settings dashboard.
router.post('/update/:uid', userControllers.updateUser);

module.exports = router;
