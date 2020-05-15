import doctors from 'temp/doctors';
import patients from 'temp/patients';
import records from 'temp/records';


export default {
  getRecords: () => records,
  createRecord: (payload) => {
    const {
      date, time, doctorId, patientId,
    } = payload;

    const recordDate = new Date(`${date} ${time}`);

    const doctor = doctors.find(({ id }) => id === doctorId);
    const patient = patients.find(({ id }) => id === patientId);

    return {
      ...payload,
      date: recordDate,
      doctor,
      patient,
    };
  },
  updateRecord: (payload) => {
    const itemToUpdate = records.find(({ id }) => id === payload.id);

    return itemToUpdate
      ? { ...itemToUpdate, ...payload }
      : null;
  },
};
