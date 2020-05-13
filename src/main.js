import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerComponents';


Vue.use(Vuetify);
Vue.config.productionTip = false;

const vuetify = new Vuetify({});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
