import axiosInstance from 'utils/axios';

import Doctor from 'entities/Doctor.entity';

import { DOCTORS_API_URI } from 'constants/api';


/**
 * TODO: error handling
 * TODO: resolve date initialization
 * TODO: update
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get(DOCTORS_API_URI);

    return data.map(({ availability, ...rest }) => new Doctor({
      ...rest,
      availability: availability.map((d) => new Date(d)), // TODO: remove
    }));
  },
  /* update: async (payload) => {

  } */
};
