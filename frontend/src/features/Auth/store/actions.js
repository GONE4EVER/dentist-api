import AuthService from 'features/Auth/services/AuthService';

// import actions from 'features/Auth/store/constants/actions';
import mutations from 'features/Auth/store/constants/mutations';

/**
 * TODO: error handling
 */
export const LOG_IN = (context, payload) => {
  console.log(context, payload);
};

export const AUTHENTICATE = async ({ commit }, payload) => {
  try {
    debugger;
    const result = AuthService.authenticate(payload);

    if (!result) {
      throw new Error('Invalid credantials');
    }

    commit(mutations.SET_AUTH_STATUS, result);
  } catch (err) {
    commit(mutations.SET_AUTH_STATUS, false);
    commit(mutations.SET_ERROR_STATE, err.message);
  }
};

export const LOG_OUT = ({ commit }) => {
  commit(mutations.SET_AUTH_STATUS, false);
};
