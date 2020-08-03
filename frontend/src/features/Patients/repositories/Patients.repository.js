import axiosInstance from 'utils/axios';

import { PATIENTS_API_URI } from 'common/constants/api';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get(PATIENTS_API_URI);

    return data;
  },
  create: async (payload) => {
    const { data: { _id } } = await axiosInstance
      .post(PATIENTS_API_URI, { patient: payload });

    return { ...payload, _id };
  },
  update: async (payload) => {
    const { data } = await axiosInstance
      .patch(PATIENTS_API_URI, { patient: payload });

    if (!data) { return null; }

    return data;
  },
};
