import pipe from 'utils/pipe';

import DoctorsProvider from 'features/Doctors/providers/Doctors.provider';
import RecordsProvider from 'features/Records/providers/Records.provider';
import RecordsRepository from 'features/Records/repositories/Records.repository';


export default {
  async getAll() {
    const data = await pipe(
      RecordsRepository.getAll,
      async (res) => {
        const resData = await res;

        return RecordsProvider.getMapped(resData);
      },
    )();

    return data;
  },
  create: async (payload) => {
    const data = await pipe(
      RecordsRepository.create,
      async (res) => {
        const { doctor, record } = await res;

        return {
          doctor: DoctorsProvider.getMapped(doctor),
          record: RecordsProvider.getMapped(record),
        };
      },
    )(payload);

    return data;
  },
  update: async (payload) => {
    const data = await pipe(
      RecordsRepository.update,
      async (res) => {
        const resData = await res;

        return RecordsProvider.getMapped(resData);
      },
    )(payload);

    return data;
  },
};
