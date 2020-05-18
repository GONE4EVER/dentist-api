const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /.+@.+\..+/,
  },
  firstName: {
    type: String,
    required: true,
    min: 3,
  },
  job: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
  },
  notes: {
    type: String,
    required: false,
    max: 256,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('Patient', patientSchema);
