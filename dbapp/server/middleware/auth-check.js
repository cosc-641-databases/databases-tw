const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config.env" });
// Declare in global scope for usage.
const JWT_KEY = process.env.JWT_AUTH_KEY;

module.exports = (req, res, next) => {
  try {
    // Get the 'Authorization' header from the request.
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // Use JWT key phrase to decode user token.
    const decodedToken = jwt.verify(token, JWT_KEY);
    // Set "userData" object on request header.
    req.userData = { userId: decodedToken.userId };
  } catch (err) {
    const error = new HttpError(
      'Authentication failed!',
      401
    );
    return next(error);
  }

};
