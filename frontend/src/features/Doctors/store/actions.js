import pipe from 'utils/pipe';

import DoctorsProvider from 'features/Doctors/providers/Doctors.provider';
import DoctorsService from 'features/Doctors/repositories/Doctors.repository';

import actions from 'features/Doctors/store/constants/actions';
import mutations from 'features/Records/store/constants/mutations';


export const START_FETCH = ({ commit }) => {
  commit(mutations.SET_ERROR_STATE, null);
  commit(mutations.SET_FETCH_STATUS, true);
};

export const FINISH_FETCH = ({ commit }) => {
  commit(mutations.SET_FETCH_STATUS, false);
};

export const GET_DOCTORS = async ({ commit, dispatch }) => {
  try {
    dispatch(actions.START_FETCH);

    const data = await pipe(
      DoctorsService.getAll,
      async (res) => {
        const resData = await res;

        return DoctorsProvider.getMapped(resData);
      },
    )();

    commit(mutations.SET_ITEMS_LIST, data);
  } catch (err) {
    console.log(err.name);
    dispatch(actions.HANDLE_ERROR, err);
  } finally {
    dispatch(actions.FINISH_FETCH);
  }
};

export const EDIT_DOCTOR_PROFILE = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(actions.START_FETCH);
    const data = await DoctorsService.update(payload);

    commit(mutations.EDIT_ITEM, data);
  } catch (err) {
    dispatch(actions.HANDLE_ERROR, err);
  } finally {
    dispatch(actions.FINISH_FETCH);
  }
};

export const HANDLE_ERROR = (context, errorPayload) => {
  context.commit(mutations.SET_ERROR_STATE, errorPayload.message);
};
