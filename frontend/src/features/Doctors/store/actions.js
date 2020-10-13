import DoctorsService from 'features/Doctors/services/Doctors.service';
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

    const data = await DoctorsService.getAll();

    commit(mutations.SET_ITEMS_LIST, data);
  } catch (err) {
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
  if (errorPayload.name !== 'Error') {
    console.error(errorPayload); // TODO: check env
  }

  context.commit(mutations.SET_ERROR_STATE, errorPayload.message);
};
