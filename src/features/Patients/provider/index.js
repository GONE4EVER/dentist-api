// import pipe from 'utils/pipe';
import Patient from 'entities/Patient.entity';

import data from './temp';

const emitCall = (callback, errorMessage = '', delay = 1000) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (errorMessage) {
      // TODO: error handling; custom errors
      reject(new Error(errorMessage));
    } else {
      resolve(callback());
    }
  }, delay);
});


// TODO: error handling
export default {
  getAll: async () => emitCall(
    () => data.map((dataItem) => new Patient(dataItem)),
    // 'Data loading error',
  ),
  create: async (payload) => emitCall(
    () => new Patient(payload),
    // 'Data loading error',
  ),
  update: async (payload) => emitCall(
    () => {
      const originalItem = data.find(({ id }) => id === payload.id);

      return originalItem
        ? new Patient({ ...originalItem, ...payload })
        : null;
    },
    // 'Loading error occured',
  ),
};
