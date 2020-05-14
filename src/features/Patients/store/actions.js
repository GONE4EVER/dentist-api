import PatientsProvider from 'features/Patients/services/PatientsService';

import baseActions from 'features/Patients/constants/actions';
import { mutations } from 'features/Patients/constants/store';

/**
 * TODO: add custom error constructor
*/
export const START_FETCH = ({ commit }) => {
  commit(mutations.SET_ERROR_STATE, null);
  commit(mutations.SET_FETCH_STATUS, true);
};

export const FINISH_FETCH = ({ commit }) => {
  commit(mutations.SET_FETCH_STATUS, false);
};

export const GET_PATIENTS = async ({ commit, dispatch }) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await PatientsProvider.getAll();

    commit(mutations.SET_ITEMS_LIST, data);
    commit(mutations.SET_ERROR_STATE, null);
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

    commit(mutations.ADD_ITEM, data);
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

    commit(mutations.EDIT_ITEM, data);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const HANDLE_ERROR = (context, errorPayload) => {
  context.commit(mutations.SET_ERROR_STATE, errorPayload.message);
};

export const REMOVE_PATIENT = (context, payload) => {
  context.commit(mutations.REMOVE_ITEM, payload);
};
