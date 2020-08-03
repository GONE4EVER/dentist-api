import axiosInstance from 'utils/axios';

import { DOCTORS_API_URI } from 'common/constants/api';


/**
 * TODO: error handling
 * TODO: resolve date initialization
 * TODO: update
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get(DOCTORS_API_URI);

    return data;
  },
  /* update: async (payload) => {

  } */
};
