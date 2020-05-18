const Doctor = require('../../doctors/models/doctor');
const Patient = require('../../patients/models/patient');
const Record = require('../models/record');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const patients = await Record
    .find()
    .populate([
      {
        path: 'doctor',
        model: Doctor,
      },
      {
        path: 'patient',
        model: Patient,
      },
    ]);

  res.send(patients);
};
