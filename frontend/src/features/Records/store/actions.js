import { mutations as doctorsMutations } from 'features/Doctors/store/constants';
import RecordsService from 'features/Records/services/Records.service';
import actions from 'features/Records/store/constants/actions';
import mutations from 'features/Records/store/constants/mutations';


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
    dispatch(actions.START_FETCH);
    const data = await RecordsService.getAll();

    commit(mutations.SET_ITEMS_LIST, data);
  } catch (err) {
    dispatch(actions.HANDLE_ERROR, err);
  } finally {
    dispatch(actions.FINISH_FETCH);
  }
};

export const ADD_RECORD = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(actions.START_FETCH);
    const { record, doctor } = await RecordsService.create(payload);

    commit(doctorsMutations.EDIT_ITEM, doctor, { root: true });
    commit(mutations.ADD_ITEM, record);
  } catch (err) {
    dispatch(actions.HANDLE_ERROR, err);
  } finally {
    dispatch(actions.FINISH_FETCH);
  }
};

export const EDIT_RECORD = async ({ commit, dispatch }, payload) => {
  try {
    dispatch(actions.START_FETCH);
    const data = await RecordsService.update(payload);

    if (!data) {
      throw new Error('Item does not exist');
    }

    commit(mutations.EDIT_ITEM, data);
  } catch (err) {
    dispatch(actions.HANDLE_ERROR, err);
  } finally {
    dispatch(actions.FINISH_FETCH);
  }
};

export const HANDLE_ERROR = (context, errorPayload) => {
  if (errorPayload.name !== 'Error') {
    console.error(errorPayload); // TODO: check env
  }

  context.commit(mutations.SET_ERROR_STATE, errorPayload.message);
};

export const REMOVE_RECORD = (context, payload) => {
  context.commit(mutations.REMOVE_ITEM, payload);
};
