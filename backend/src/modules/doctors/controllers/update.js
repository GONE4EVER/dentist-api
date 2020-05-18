const Doctor = require('../models/doctor');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const { doctor: { id, availability } } = req.body;

  const result = await Doctor.findByIdAndUpdate(
    id,
    { availability },
    { new: true },
  );

  res
    .status(200)
    .send(result);
};
