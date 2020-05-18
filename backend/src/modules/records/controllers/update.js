const Doctor = require('../../doctors/models/doctor');
const Patient = require('../../patients/models/patient');
const Record = require('../models/record');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const { record: { id, notes } } = req.body;

  const result = await Record
    .findByIdAndUpdate(
      id,
      { notes },
      { new: true },
    )
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

  res
    .status(200)
    .send(result);
};
