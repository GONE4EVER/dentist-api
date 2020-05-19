import RecordsService from 'features/Records/services/RecordsService';

import baseActions from 'features/Records/store/constants/actions';
import baseMutations from 'features/Records/store/constants/mutations';
import { mutations as doctorsMutations } from 'features/Doctors/store/constants';


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

export const GET_RECORDS = async ({ commit, dispatch }) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await RecordsService.getAll();

    commit(baseMutations.SET_ITEMS_LIST, data);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const ADD_RECORD = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(baseActions.START_FETCH);
    const { record, doctor } = await RecordsService.create(payload);

    commit(doctorsMutations.EDIT_ITEM, doctor, { root: true });
    commit(baseMutations.ADD_ITEM, record);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const EDIT_RECORD = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await RecordsService.update(payload);

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

export const REMOVE_RECORD = (context, payload) => {
  context.commit(baseMutations.REMOVE_ITEM, payload);
};
