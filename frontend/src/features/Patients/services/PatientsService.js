import axiosInstance from 'utils/axios';

import Patient from 'entities/Patient.entity';


/**
 * TODO: error handling
 * TODO: put routes to constants
*/
export default {
  getAll: async () => {
    const { data } = await axiosInstance.get('/api/patients');

    return data.map(({ _id, ...rest }) => new Patient({
      ...rest,
      id: _id,
    }));
  },
  create: async (payload) => {
    const { data: { _id } } = await axiosInstance
      .post('/api/patients', { patient: payload });

    return new Patient({ ...payload, id: _id });
  },
  update: async (payload) => {
    const { data } = await axiosInstance
      .patch('/api/patients', { patient: payload });

    if (!data) { return null; }

    const { _id, ...rest } = data;

    return new Patient({ ...rest, id: _id });
  },
};
