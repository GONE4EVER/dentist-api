import RecordsService from 'features/Records/services/RecordsService';

import baseActions from 'features/Records/constants/actions';
import { mutations } from 'features/Records/constants/store';


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

export const GET_RECORDS = async ({ commit, dispatch }) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await RecordsService.getAll();

    commit(mutations.SET_ITEMS_LIST, data);
    commit(mutations.SET_ERROR_STATE, null);
  } catch (err) {
    dispatch(baseActions.HANDLE_ERROR, err);
  } finally {
    dispatch(baseActions.FINISH_FETCH);
  }
};

export const ADD_RECORD = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(baseActions.START_FETCH);
    const data = await RecordsService.create(payload);

    commit(mutations.ADD_ITEM, data);
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

export const REMOVE_RECORD = (context, payload) => {
  context.commit(mutations.REMOVE_ITEM, payload);
};
