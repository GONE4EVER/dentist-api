import PatientsProvider from 'features/Patients/services/PatientsService';

import baseActions from 'features/Patients/store/constants/actions';
import baseMutations from 'features/Patients/store/constants/mutations';

/**
 * TODO: add custom error constructor
*/
export const START_FETCH = ({ commit }) => {
  commit(baseMutations.SET_ERROR_STATE, null);
  commit(baseMutations.SET_FETCH_STATUS, true);
};

export const FINISH_FETCH = ({ commit }) => {
  commit(baseMutations.SET_FETCH_STATUS, false);
};

export const GET_PATIENTS = async ({ commit, dispatch }) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await PatientsProvider.getAll();

    commit(baseMutations.SET_ITEMS_LIST, data);
    commit(baseMutations.SET_ERROR_STATE, null);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const ADD_PATIENT = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await PatientsProvider.create(payload);

    commit(baseMutations.ADD_ITEM, data);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const EDIT_PATIENT_PROFILE = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await PatientsProvider.update(payload);

    if (!data) {
      throw new Error('Item does not exist');
    }

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

export const REMOVE_PATIENT = (context, payload) => {
  context.commit(baseMutations.REMOVE_ITEM, payload);
};
