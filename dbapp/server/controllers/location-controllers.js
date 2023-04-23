require("dotenv").config({ path: "../config.env" });
const HttpError = require('../models/http-error');
const Location = require('../models/location');
const axios = require('axios');
const api = {
    key: process.env.WEATHER_API_KEY,
    base: "https://api.openweathermap.org/data/2.5/"
  };

/////////////////////////////
// HANDLE SAVING LOCATION. //
/////////////////////////////
const saveLoc = async (req, res, next) => {
  const { uID, name, lat, lon } = req.body;
  // Populate fields of new Location document.
  const savedLocation = new Location({
    name: name,
    uID: uID,
    location: {
      lat: lat,
      lon: lon
    }
  });
  try {
    // Insert document to MongoDB.
    await savedLocation.save();
  } catch (err) {
    const error = new HttpError(
      'Could not save location to user.',
      500
    );
    return next(error);
  };
  return res.status(201).json({
    locId: savedLocation.id
  });
} //end saveLoc()

//////////////////////////////
// HANDLE GETTING LOCATION. //
//////////////////////////////
const getLocs = async (req, res, next) => {
  let locArr = [];
  try {
    // MongoDB query to find locations where uID = current user.
    locArr = await Location.find({ uID: req.params.uid });
  } catch (err) {
    const error = new HttpError(
      'Could not retrieve location.',
      500
    );
    return next(error);
  }
  res.json(locArr);

} //end getLoc().

/////////////////////////////
// HANDLE LOCATION SEARCH. //
/////////////////////////////
const search = async (req, res, next) => {
  let response;
  let data;
  const { search } = req.body;
  try {
    response = await axios.get(`${api.base}weather?q=${search}&units=imperial&APPID=${api.key}`);
    data = await response.data;
  }
  catch (err) {
    const error = new HttpError(
      'Could not retrieve weather data.',
      500
    );
    return next(error);
  }
  return res.json(data);

}; // end search().

////////////////////////////////////////
// HANDLE LOCATION SEARCH BY LAT/LON. //
////////////////////////////////////////
const latLonWeather = async (req, res, next) => {
  let response;
  let data;
  const { lat, lon } = req.body;
  try {
    response = await axios.get(`${api.base}weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${api.key}`);
    data = await response.data;
  }
  catch (err) {
    const error = new HttpError(
      'Could not retrieve weather data.',
      500
    );
    return next(error);
  }
  return res.json(data);
}

exports.saveLoc = saveLoc;
exports.getLocs = getLocs;
exports.search = search;
exports.latLonWeather = latLonWeather;
