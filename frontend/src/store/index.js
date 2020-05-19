import Vue from 'vue';
import Vuex from 'vuex';

import auth from 'features/Auth/store';
import doctors from 'features/Doctors/store';
import patients from 'features/Patients/store';
import records from 'features/Records/store';

import authMiddleware from 'store/middlewares/auth.middleware';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
    doctors,
    patients,
    records,
  },
});

store.subscribeAction({ before: authMiddleware });


export default store;
