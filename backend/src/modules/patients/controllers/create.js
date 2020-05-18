const Patient = require('../models/patient');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const { patient } = req.body;

  const data = new Patient(patient);
  const { _id: id } = await data.save();

  res
    .status(201)
    .send({ id });
};
