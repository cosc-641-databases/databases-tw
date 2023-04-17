const axios = require('axios');
const HttpError = require('../models/http-error');
require("dotenv").config({ path: "../config.env" });
// const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

async function getDC() {
  // Return coordinates of Washington, DC.
  return {
    lat: 38.9072,
    lon: -77.0369
  };
}

async function getLA() {
  // Return coordinates of Los Angeles.
  return {
    lat: 34.0522,
    lon: -118.2347
  };
}

async function getLondon() {
  // Return coordinates of London, UK.
  return {
    lat: 51.5072,
    lon: -0.1276
  }
}

async function getTokyo() {
  // Return coordinates of Tokyo, Japan.
  return {
    lat: 35.6528,
    lon: 139.8394
  }
}

// First pass at dynamic location resolver.
async function getCoordsFromAddress(address) {
  const res = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(address)}&limit=1&appid=${WEATHER_API_KEY}`
  );
  const data = await res.data;

  // Error handling.
  if (!data || data.cod == "404") {
    const error = new HttpError(
      'Could not find location for the specified address.',
      422
    );
    throw error;
  }

  return data[0];

  // ALTERNATE APPROACH USING GOOGLE GEOCODE API.
  // const res = await axios.get(
    // Google Geocode API.
    // `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GEOCODE_API_KEY}`
  // );
  // const data = await res.data;

  // Error handling for Google Geocoding API.
  // if (!data || data.status === 'ZERO_RESULTS') {
  //   const error = new HttpError(
  //     'Could not find location for the specified address.',
  //     422
  //   );
  //   throw error;
  // }

  // Return Google geocode object with lat/lng values.
  // const coords = await data.results[0].geometry.location;
  // return coords;

}

module.exports = getDC;
module.exports = getLA;
module.exports = getLondon;
module.exports = getTokyo;
module.exports = getCoordsFromAddress;

