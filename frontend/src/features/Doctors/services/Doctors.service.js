
import DoctorsProvider from 'features/Doctors/providers/Doctors.provider';
import DoctorsRepository from 'features/Doctors/repositories/Doctors.repository';
import pipe from 'utils/pipe';


export default {
  async getAll() {
    const data = await pipe(
      DoctorsRepository.getAll,
      async res => {
        const resData = await res;

        return DoctorsProvider.getMapped(resData);
      },
    )();

    return data;
  },
  update: async payload => {
    const data = await pipe(
      DoctorsRepository.update,
      async res => {
        const resData = await res;

        return DoctorsProvider.getMapped(resData);
      },
    )(payload);

    return data;
  },
};
