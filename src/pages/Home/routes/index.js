import Home from 'pages/Home/Home.vue';
import Patients from 'pages/Home/Patients.vue';

import * as constants from 'pages/Home/routes/constants';


const routes = {
  path: constants.ROOT_PATH,
  name: constants.ROOT_NAME,
  component: Home,
  children: [
    {
      path: constants.PATIENTS_LIST_PATH,
      name: constants.PATIENTS_LIST_NAME,
      component: Patients,
    },
    {
      path: constants.RECORDS_LIST_PATH,
      name: constants.RECORDS_LIST_NAME,
      component: () => import('pages/Home/Records.vue'),
    },
  ],
  beforeEnter: (to, from, next) => {
    // TODO: Navigation guard
    next();
  },
};


export default routes;
