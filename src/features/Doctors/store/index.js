import * as actions from 'features/Doctors/store/actions';
import * as getters from 'features/Doctors/store/getters';
import * as mutations from 'features/Doctors/store/mutations';
import state from 'features/Doctors/store/state';


export default {
  namespaced: true,

  state,

  actions,
  getters,
  mutations,
};
