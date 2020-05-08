import Home from 'pages/Home/Home.vue';
import Patients from 'pages/Home/Patients.vue';

import * as constants from 'pages/Home/routes/constants';


const routes = {
  icon: constants.ROOT_ICON,
  path: constants.ROOT_PATH,
  name: constants.ROOT_NAME,
  component: Home,
  children: [
    {
      path: '/patients',
      name: 'patientsList',
      component: Patients,
    },
    {
      path: '/records',
      name: 'recordsList',
      component: () => import('pages/Home/Records.vue'),
    },
  ],
  beforeEnter: (to, from, next) => {
    // TODO: Navigation guard
    next();
  },
};


export default routes;
