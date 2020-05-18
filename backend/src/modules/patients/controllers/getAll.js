const Patient = require('../models/patient');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const patients = await Patient.find();

  res.send(patients);
};
