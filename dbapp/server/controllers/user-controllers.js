const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config.env" });

const HttpError = require('../models/http-error');
const User = require('../models/user');

// Handle user registration.
const register = async (req, res, next) => {
  // Validate request body sent to Express server.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError(
        'Invalid input, please check your data.',
        422
      )
    );
  }
  // Assign variable values from request body.
  const { username, password, location, settings_id, name } = req.body;

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
  // If user email already exists in db, throw custom 422 error.
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
    const error = new HttpError(
      'Could not create user.',
      500
    );
    return next(error);
  }

  // If registration process succeeds up to here, create new User object.
  const createdUser = new User({
    username,
    password: hashedPassword,
    location,
    settings_id,
    name
  });

  // Save user entry to MongoDB database.
  try {
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
      // Stored Environment Variable.
      process.env.JWT_AUTH_KEY,
      {
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

// Handle login.
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
  // Check if user/pass combo exists and is valid.
  if (!existingUser) {
    const error = new HttpError(
      'Invalid username, could not log you in.',
      401
    )
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Error: Please check your credentials.',
      500
    );
    return next(error);
  }

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
      // Stored Environment Variable.
      process.env.JWT_AUTH_KEY,
      {
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
