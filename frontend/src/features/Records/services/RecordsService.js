import axiosInstance from 'utils/axios';

import Record from 'entities/Record.entity';
import Doctor from 'entities/Doctor.entity';


/**
 * TODO: error handling
 * TODO: replace date creating
*/
export default {
  getAll: async () => {
    // const result = fakeBackend.getRecords();
    const { data } = await axiosInstance.get('api/records');

    return data.map(({ _id, ...rest }) => new Record({
      ...rest,
      id: _id,
    }));
  },
  create: async (payload) => {
    const { data } = await axiosInstance
      .post('api/records', { record: payload });

    const { _id, ...rest } = data.record;

    const { _id: doctorId, ...doctorData } = data.doctor;

    return {
      doctor: new Doctor({
        ...doctorData,
        id: doctorId,
      }),
      record: new Record({
        ...rest,
        id: _id,
      }),
    };
  },
  update: async (payload) => {
    const { data } = await axiosInstance
      .patch('api/records', { record: payload });

    const { _id } = data;

    return new Record({
      ...data,
      id: _id,
    });
  },
};
