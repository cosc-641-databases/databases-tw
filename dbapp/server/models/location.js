const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Main schema for new Locations documents in MongoDB.
const locationSchema = new mongoose.Schema({
  name: { type: String, unique: false, required: true },
  uID: {type:String, unique: false, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
});

module.exports = mongoose.model('Location', locationSchema);
