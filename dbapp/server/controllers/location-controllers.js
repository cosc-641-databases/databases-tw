const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../config.env" });
const HttpError = require('../models/http-error');
const Location = require('../models/location');
const getCoordsFromAddress = require('../utils/location');

/////////////////////////////
// HANDLE SAVING LOCATION. //
/////////////////////////////
const saveLoc = async (req, res, next) => {


} //end saveLoc

//////////////////////////////
// HANDLE GETTING LOCATION. //
//////////////////////////////
const getLoc = async (req, res, next) => {
    let locObject
    try {
        // Mongo query to find locations where uID = current user
        locObj = await Location.find({uID: ""}, { _id: req.params.uid });
      } catch (err) {
        const error = new HttpError(
          'Could not retrieve location.',
          500
        );
        return next(error);
      }
      res.json(locObj);
    
} //end saveLoc

exports.saveLoc = saveLoc;
exports.getLoc = getLoc;