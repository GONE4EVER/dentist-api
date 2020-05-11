import * as actions from 'features/Patients/store/actions';
import * as getters from 'features/Patients/store/getters';
import * as mutations from 'features/Patients/store/mutations';
import state from 'features/Patients/store/state';


export default {
  namespaced: true,

  state,

  actions,
  getters,
  mutations,
};
