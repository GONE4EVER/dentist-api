import Vue from 'vue';
import VueRouter from 'vue-router';

import store from 'store';
import {
  actions as authActions,
  getters as authGetters,
} from 'features/Auth/store/constants';

import { LOGIN_ROUTE_NAME } from 'pages/Login/routes/constants';

import routes from './routes';


Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  store.dispatch(authActions.AUTHENTICATE);

  const isAuthenticated = store.getters[authGetters.GET_AUTH_STATUS];
  const isRouteProtected = to.matched.some((route) => route.meta?.authRequired);

  if (isRouteProtected && !isAuthenticated) {
    next({ name: LOGIN_ROUTE_NAME });
  } else {
    next();
  }
});


export default router;
