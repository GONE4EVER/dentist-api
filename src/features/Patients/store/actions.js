import PatientsProvider from 'features/Patients/provider';

import baseActions from 'features/Patients/constants/actions';
import { mutations } from 'features/Patients/constants/store';


export const START_FETCH = ({ commit }) => {
  commit(mutations.SET_FETCH_STATUS, true);
};

export const FINISH_FETCH = ({ commit }) => {
  commit(mutations.SET_FETCH_STATUS, false);
};

// TODO: api calls
export const GET_PATIENTS = async ({ commit, dispatch }) => {
  dispatch(baseActions.START_FETCH);

  try {
    // fetch with PatientsProvider
    // TODO: error handling
    const data = await PatientsProvider.getAll();

    commit(mutations.SET_ITEMS_LIST, data);
    commit(mutations.SET_ERROR_STATE, null);
  } catch (err) {
    commit(mutations.SET_ERROR_STATE, err); // TODO: exceptions
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const ADD_PATIENT = (context, payload) => {
  // fetch with PatientsProvider
  context.commit(mutations.ADD_ITEM, payload);
};

export const EDIT_PATIENT_PROFILE = async ({ commit, dispatch }, payload) => {
  dispatch(baseActions.START_FETCH);

  try {
    // fetch with PatientsProvider
    const data = await PatientsProvider.update(payload);
    if (!data) {
      throw new Error('Not found'); // TODO: error handling; custom errors
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
  // fetch
  context.commit(mutations.REMOVE_ITEM, payload);
};
