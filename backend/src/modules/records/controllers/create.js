const moment = require('moment');

const Doctor = require('../../doctors/models/doctor');
const Patient = require('../../patients/models/patient');
const Record = require('../models/record');

/**
 * TODO: error handling
 * TODO: patient ref update
 * TODO: solve too-many-requests problem
 */
module.exports = async (req, res) => {
  const { record: recordData } = req.body;

  const {
    date,
    time,
    doctor: doctorId,
  } = recordData;

  const formattedDate = `${date}T${time}`;

  const doctorData = await Doctor.findById(doctorId); // #1 request

  const isRecordDateValid = doctorData.availability
    .some((d) => moment(formattedDate).isSame(d));

  if (isRecordDateValid) {
    const doctor = await Doctor.findByIdAndUpdate( // #2 request
      doctorId,
      {
        availability: doctorData.availability // replace with $pull & $push
          .filter((d) => !moment(formattedDate).isSame(d)),
      },
      { new: true },
    );

    const record = await Record // #3 request
      .create({
        ...recordData,
        date: formattedDate,
      });

    const result = await Record.populate(record, [ // #4 request
      { path: 'doctor', model: Doctor },
      { path: 'patient', model: Patient },
    ]);

    return res
      .status(200)
      .send({
        doctor,
        record: result,
      });
  }

  return res.sendStatus(204);
};
