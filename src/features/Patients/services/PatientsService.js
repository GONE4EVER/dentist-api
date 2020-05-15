import Patient from 'entities/Patient.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import fakeBackend from 'temp/fakeBackend';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => emitFetch(
    () => {
      const data = fakeBackend.getPatients();

      return data.map((dataItem) => new Patient(dataItem));
    },
    '', // 'Data loading error',
    1500,
  ),
  create: async (payload) => emitFetch(
    () => {
      const data = fakeBackend.createPatient(payload);

      return new Patient(data);
    },
    '', // 'Data loading error',
  ),
  update: async (payload) => emitFetch(
    () => {
      const data = fakeBackend.updatePatient(payload);

      return data
        ? new Patient(data)
        : null;
    },
    '', // 'Data loading error',
  ),
};
