import Doctor from 'entities/Doctor.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import doctors from 'temp/doctors';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => emitFetch(
    () => doctors.map((dataItem) => new Doctor(dataItem)),
    '', // 'Data loading error',
    2000,
  ),
  /* update: async (payload) => emitFetch(
    () => {
      const {id: doctorId} = payload;

      const item = doctors.find(({id}) => id === doctorId);
      const updatedAvailability = item.availability.filter()

      return item
        ? new Doctor()
    }
  ) */
};
