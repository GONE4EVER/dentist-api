import DoctorsService from 'features/Doctors/services/DoctorsService';

import baseActions from 'features/Doctors/store/constants/actions';
import baseMutations from 'features/Records/store/constants/mutations';


export const START_FETCH = ({ commit }) => {
  commit(baseMutations.SET_ERROR_STATE, null);
  commit(baseMutations.SET_FETCH_STATUS, true);
};

export const FINISH_FETCH = ({ commit }) => {
  commit(baseMutations.SET_FETCH_STATUS, false);
};

export const GET_DOCTORS = async ({ commit, dispatch }) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await DoctorsService.getAll();

    commit(baseMutations.SET_ITEMS_LIST, data);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const EDIT_DOCTOR_PROFILE = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await DoctorsService.update(payload);

    commit(baseMutations.EDIT_ITEM, data);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const HANDLE_ERROR = (context, errorPayload) => {
  context.commit(baseMutations.SET_ERROR_STATE, errorPayload.message);
};
