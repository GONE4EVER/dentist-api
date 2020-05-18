const mongoose = require('mongoose');

/**
 * TODO: availabilities ref
 */
const doctorSchema = new mongoose.Schema({
  availability: {
    type: [ Date ],
    default: [],
  },
  firstName: {
    type: String,
    required: true,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
  },
});


module.exports = mongoose.model('Doctor', doctorSchema);
