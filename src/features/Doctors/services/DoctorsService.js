import Doctor from 'entities/Doctor.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import fakeBackend from 'temp/fakeBackend';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => emitFetch(
    () => {
      const data = fakeBackend.getDoctors();

      return data.map((dataItem) => new Doctor(dataItem));
    },
    '', // 'Data loading error',
    2000,
  ),
  update: async (payload) => emitFetch(
    () => fakeBackend.updateDoctor(payload),
  ),
};
