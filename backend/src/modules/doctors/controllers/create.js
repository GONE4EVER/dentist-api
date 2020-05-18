const Doctor = require('../models/doctor');

/**
 * TODO: error handling
 */
module.exports = async (req, res) => {
  const { doctor } = req.body;

  const doctorData = {
    ...doctor,
    availability: doctor.availability.map((i) => new Date(i)),
  };

  const data = new Doctor(doctorData);
  const { _id: id } = await data.save();

  res
    .status(201)
    .send({ id });
};
