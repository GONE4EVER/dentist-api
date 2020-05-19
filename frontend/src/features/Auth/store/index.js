import * as actions from 'features/Auth/store/actions';
import * as getters from 'features/Auth/store/getters';
import * as mutations from 'features/Auth/store/mutations';
import state from 'features/Auth/store/state';


export default {
  namespaced: true,

  state,

  actions,
  getters,
  mutations,
};
