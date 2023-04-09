const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config.env" });
// Declare in global scope for usage here.
const JWT_AUTH_KEY = process.env.JWT_AUTH_KEY;

module.exports = (req, res, next) => {
  // Handle edge case request method.
  if (req.method === 'OPTIONS') {
    return next(); // Skip and continue to next middleware in Express.
  }
  try {
    // Get the 'Authorization' header from the request.
    // JWT auth tokens are structured as "bearer {TOKEN}", therefore we split
    // on the space and use the second item in resulting array.
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // Use JWT key phrase to decode user token.
    const decodedToken = jwt.verify(token, JWT_AUTH_KEY);
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
