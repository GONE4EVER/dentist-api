import axiosInstance from 'utils/axios';

import Record from 'entities/Record.entity';
import Doctor from 'entities/Doctor.entity';

import { RECORDS_API_URI } from 'constants/api';


/**
 * TODO: error handling
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get(RECORDS_API_URI);

    return data.map((r) => new Record(r));
  },
  create: async (payload) => {
    const { data } = await axiosInstance
      .post(RECORDS_API_URI, { record: payload });

    if (!data) { return null; }

    const { record, doctor } = data;

    return {
      doctor: new Doctor(doctor),
      record: new Record(record),
    };
  },
  update: async (payload) => {
    const { data } = await axiosInstance
      .patch(RECORDS_API_URI, { record: payload });

    const { _id } = data;

    return new Record({
      ...data,
      _id,
    });
  },
};
