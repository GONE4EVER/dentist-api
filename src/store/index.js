import Vue from 'vue';
import Vuex from 'vuex';

import patients from 'features/Patients/store';
import records from 'features/Records/store';


Vue.use(Vuex);


export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    patients,
    records,
  },
});
