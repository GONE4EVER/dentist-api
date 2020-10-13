import Home from 'pages/Home/Home.vue';
import Patients from 'pages/Home/Patients.vue';
import * as constants from 'pages/Home/routes/constants';


/**
 * TODO: add Navigation guard
 * TODO: add authentication
*/
const routes = {
  path: constants.ROOT_PATH,
  name: constants.ROOT_NAME,
  component: Home,

  meta: {
    authRequired: true,
  },

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
};


export default routes;
