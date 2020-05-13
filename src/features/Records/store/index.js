import * as actions from 'features/Records/store/actions';
import * as getters from 'features/Records/store/getters';
import * as mutations from 'features/Records/store/mutations';
import state from 'features/Records/store/state';


export default {
  namespaced: true,

  state,

  actions,
  getters,
  mutations,
};
