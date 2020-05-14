import DoctorsService from 'features/Doctors/services/DoctorsService';

import baseActions from 'features/Doctors/constants/actions';
import { mutations } from 'features/Doctors/constants/store';

export const START_FETCH = ({ commit }) => {
  commit(mutations.SET_ERROR_STATE, null);
  commit(mutations.SET_FETCH_STATUS, true);
};

export const FINISH_FETCH = ({ commit }) => {
  commit(mutations.SET_FETCH_STATUS, false);
};

export const GET_DOCTORS = async ({ commit, dispatch }) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await DoctorsService.getAll();

    commit(mutations.SET_ITEMS_LIST, data);
    commit(mutations.SET_ERROR_STATE, null);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const HANDLE_ERROR = (context, errorPayload) => {
  context.commit(mutations.SET_ERROR_STATE, errorPayload.message);
};
