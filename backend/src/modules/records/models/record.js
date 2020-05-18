const mongoose = require('mongoose');


const recordSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
  },
  notes: {
    type: String,
    required: false,
    default: '',
    max: 256,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  },
});


module.exports = mongoose.model('Record', recordSchema);
