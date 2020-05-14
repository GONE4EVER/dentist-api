import Doctor from 'entities/Doctor.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import data from 'temp/doctors';


// TODO: error handling
export default {
  getAll: async () => emitFetch(
    () => data.map((dataItem) => new Doctor(dataItem)),
    '', // 'Data loading error',
    2000,
  ),
};
