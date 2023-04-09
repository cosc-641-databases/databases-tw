const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Main schema for new User documents in MongoDB.
const userSchema = new mongoose.Schema({
  // Make usernames unique to create a MongoDB index on this field.
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true, minlength: 8 },
  location: {
    lat: { type: Number, required: false },
    lon: { type: Number, required: false }
  },
  name: {
    fname: { type: String, required: false },
    lname: { type: String, required: false }
  }
});

// Use 'mongoose-unique-validator' plugin to validate unique fields.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
