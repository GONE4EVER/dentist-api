const Patient = require('../models/patient');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const { patient: { id, notes } } = req.body;

  const result = await Patient.findByIdAndUpdate(
    id,
    { notes },
    { new: true },
  );

  res
    .status(200)
    .send(result);
};
