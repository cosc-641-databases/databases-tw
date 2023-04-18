const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Main schema for new User documents in MongoDB.
const locationSchema = new mongoose.Schema({
  // Make usernames unique to create a MongoDB index on this field.
  name: { type: String, unique: false, required: true },
  uID: {type:String, unique: false, required: true },
  location: {
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
});

// Use 'mongoose-unique-validator' plugin to validate unique fields.
locationSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Location', locationSchema);
