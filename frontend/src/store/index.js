import Vue from 'vue';
import Vuex from 'vuex';

import auth from 'features/Auth/store';
import doctors from 'features/Doctors/store';
import patients from 'features/Patients/store';
import records from 'features/Records/store';


Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    auth,
    doctors,
    patients,
    records,
  },
});
