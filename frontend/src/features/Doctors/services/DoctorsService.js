import axiosInstance from 'utils/axios';

import Doctor from 'entities/Doctor.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import fakeBackend from 'temp/fakeBackend';


/**
 * TODO: error handling
 * TODO: solve date issue
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get('/api/doctors');

    return data.map(({ _id, availability, ...rest }) => new Doctor({
      ...rest,
      availability: availability.map((d) => new Date(d)), // TODO: remove
      id: _id,
    }));
  },
  update: async (payload) => emitFetch(
    () => fakeBackend.updateDoctor(payload),
  ),
};
