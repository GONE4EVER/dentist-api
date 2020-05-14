import Patient from 'entities/Patient.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import data from 'temp/patients';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => emitFetch(
    () => data.map((dataItem) => new Patient(dataItem)),
    // 'Data loading error',
  ),
  create: async (payload) => emitFetch(
    () => new Patient(payload),
    // 'Data loading error',
  ),
  update: async (payload) => emitFetch(
    () => {
      const originalItem = data.find(({ id }) => id === payload.id);

      return originalItem
        ? new Patient({ ...originalItem, ...payload })
        : null;
    },
    // 'Loading error occured',
  ),
};
