import { DOCTORS_API_URI } from 'common/constants/api';
import axiosInstance from 'utils/axios';


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
