const express = require('express');
const locationControllers = require('../controllers/location-controllers');
const router = express.Router();
const { check } = require('express-validator');

// User search for location.
router.post('/search',
  [check('search').not().isEmpty()],
  locationControllers.search
);

// Save location to MongoDB.
router.post('/saveLoc', locationControllers.saveLoc);

// Retrieve saved locations by userId.
router.get('/locations/:uid', locationControllers.getLocs);

// Get data by location Lat/Lon.
router.post('/locations/latlon', locationControllers.latLonWeather);

module.exports = router;
