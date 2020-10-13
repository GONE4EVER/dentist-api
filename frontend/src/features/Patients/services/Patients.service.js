
import PatientsProvider from 'features/Patients/providers/Patients.provider';
import PatientsRepository from 'features/Patients/repositories/Patients.repository';
import pipe from 'utils/pipe';


export default {
  async getAll() {
    const data = await pipe(
      PatientsRepository.getAll,
      async res => {
        const resData = await res;

        return PatientsProvider.getMapped(resData);
      },
    )();

    return data;
  },
  async create(payload) {
    const data = await pipe(
      PatientsRepository.create,
      async res => {
        const resData = await res;

        return PatientsProvider.getMapped(resData);
      },
    )(payload);

    return data;
  },
  async update(payload) {
    const data = await pipe(
      PatientsRepository.update,
      async res => {
        const resData = await res;

        return PatientsProvider.getMapped(resData);
      },
    )(payload);

    return data;
  },
};
