import formatters from 'utils/formatters';

import doctors from 'temp/doctors';
import patients from 'temp/patients';
import records from 'temp/records';


export default {
  getPatients: () => patients,
  createPatient: (payload) => payload,
  updatePatient(payload) {
    const itemToUpdate = patients.find((p) => p.id === payload.id);

    return itemToUpdate
      ? { ...itemToUpdate, ...payload }
      : null;
  },

  getDoctors: () => doctors,
  updateDoctor(payload) {
    const { id, recordDate } = payload;
    const itemToUpdate = doctors.find((d) => d.id === id);

    return {
      ...itemToUpdate,
      availability: itemToUpdate.availability.filter((a) => {
        const date = formatters.fullDate.format(a);

        return date === formatters.fullDate.format(recordDate);
      }),
    };
  },

  getRecords: () => records,
  createRecord(payload) {
    const {
      date,
      time,
    } = payload;

    const recordDate = new Date(`${date}, ${time}`);

    return {
      ...payload,
      date: recordDate,
    };
  },
  updateRecord(payload) {
    const itemToUpdate = records.find((r) => r.id === payload.id);

    return itemToUpdate
      ? { ...itemToUpdate, ...payload }
      : null;
  },
};
