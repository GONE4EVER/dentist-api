const Doctor = require('../models/doctor');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const doctors = await Doctor.find();

  res.send(doctors);
};
