import axiosInstance from 'utils/axios';

import { RECORDS_API_URI } from 'common/constants/api';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get(RECORDS_API_URI);

    return data;
  },
  create: async (payload) => {
    const { data } = await axiosInstance
      .post(RECORDS_API_URI, { record: payload });

    if (!data) { return null; }

    return data;
  },
  update: async (payload) => {
    const { data } = await axiosInstance
      .patch(RECORDS_API_URI, { record: payload });

    const { _id } = data;

    return {
      ...data,
      _id,
    };
  },
};
