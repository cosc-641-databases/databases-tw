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
router.post('/login',
  [
    check('username')
      .not().isEmpty(),
    check('password')
      .not().isEmpty()
  ],
  userControllers.login
);

module.exports = router;
