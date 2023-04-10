const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config.env" });
const HttpError = require('../models/http-error');
const User = require('../models/user');
const getCoordsFromAddress = require('../utils/location');

///////////////////////////////
// HANDLE USER REGISTRATION. //
///////////////////////////////
const register = async (req, res, next) => {
  // Validate request body sent to Express server.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid input, please check your data.', 422)
    );
  }
  // Assign variable values from request body.
  const { username, password, address, fname, lname } = req.body;

  // Check if user email already exists.
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  }
  // If this check fails, throw custom 500 server error.
  catch (err) {
    const error = new HttpError(
      'Sign up failed, please try again later.',
      500
    );
    return next(error);
  }
  // If username already exists in db, throw custom 422 error.
  if (existingUser) {
    const error = new HttpError(
      'Username already in use. Please enter a different username.',
      422
    )
    return next(error);
  }

  // Create hashed password.
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Could not create user.',
      500
    );
    return next(error);
  }

  // Get coordinates from user input address.
  let coords;
  try {
    coords = await getCoordsFromAddress(address);
  } catch(err) {
    console.log(err);
    return next(err);
  }

  // Comment out later. Leave for now to see coordinates when registering users.
  console.log(coords);

  // If registration process succeeds up to here, create new User object.
  const createdUser = new User({
    username,
    password: hashedPassword,
    location: {
      // Use null coalescence (??) to return empty string if coords unset.
      lat: coords.lat ?? '',
      lon: coords.lng ?? ''
    },
    name: {
      // Null coalesce for name values also.
      fname: fname ?? '',
      lname: lname ?? ''
    }
  });

  try {
    // Insert user in MongoDB database via Mongoose save() method.
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again.',
      500
    );
    return next(error);
  }

  // Create JWT-signed Token.
  let token;
  try {
    token = jwt.sign(
      {
        userId: createdUser.id,
        username: createdUser.username
      },
      // Stored Environment Variable for generating/checking JWT Token.
      process.env.JWT_AUTH_KEY,
      {
        // JWT Options.
        expiresIn: '1h'
      }
    );
  } catch (err) {
    const error = new HttpError(
      'Creating user failed, please try again.',
      500
    );
    return next(error);
  }

  // Return success response code.
  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    token: token
  });

}; // End register().

////////////////////////
// HANDLE USER LOGIN. //
////////////////////////
const login = async (req, res, next) => {
  const { username, password } = req.body;

  // Check if username exists.
  let existingUser;
  try {
    existingUser = await User.findOne({ username: username });
  }
  // If this check fails, throw custom 500 server error.
  catch (err) {
    const error = new HttpError(
      'Login failed, please try again later.',
      500
    );
    return next(error);
  }
  // Check if username came back as valid.
  if (!existingUser) {
    const error = new HttpError(
      'Invalid username, could not log you in.',
      401
    )
    return next(error);
  }
  // Check password.
  let isValidPassword = false;
  try {
    // Use bcrypt's compare method to check that password could have
    // been created by bcryptjs.
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Error: Please check your credentials.',
      500
    );
    return next(error);
  }
  // Throw 401 error if password is invalid.
  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid username, could not log you in.',
      401
    )
    return next(error);
  }
  // Create JWT-signed Token.
  let token;
  try {
    token = jwt.sign(
      {
        userId: existingUser.id,
        username: existingUser.username
      },
      // Stored Environment Variable for generating/checking JWT Token.
      process.env.JWT_AUTH_KEY,
      {
        // JWT Options.
        expiresIn: '1h'
      }
    );
  } catch (err) {
    const error = new HttpError(
      'Login failed, please try again.',
      500
    );
    return next(error);
  }

  // If successful login, send response.
  res.json({
    userId: existingUser.id,
    username: existingUser.username,
    token: token
  });

}; // End login().

exports.register = register;
exports.login = login;
