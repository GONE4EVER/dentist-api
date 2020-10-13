import AuthService from 'features/Auth/services/AuthService';
import actions from 'features/Auth/store/constants/actions';
import mutations from 'features/Auth/store/constants/mutations';

/**
 * TODO: error handling
 */
export const LOG_IN = ({ commit, dispatch }, payload) => {
  try {
    const result = AuthService.logIn(payload);

    if (!result) {
      throw new Error('Invalid credantials');
    }

    dispatch(actions.AUTHENTICATE);
  } catch (err) {
    commit(mutations.SET_ERROR_STATE, err.message);
  }
};

export const AUTHENTICATE = async ({ commit }, payload) => {
  try {
    const result = AuthService.authenticate(payload);

    if (!result) {
      throw new Error('Token expired');
    }

    commit(mutations.SET_AUTH_STATUS, result);
  } catch (err) {
    commit(mutations.SET_AUTH_STATUS, false);
  }
};

export const LOG_OUT = ({ commit }) => {
  AuthService.logOut();
  commit(mutations.SET_AUTH_STATUS, false);
};
