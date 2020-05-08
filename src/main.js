import Vue from 'vue';
import vuetify from 'plugins/vuetify';
import 'normalize.css';

import App from './App.vue';
import router from './router';
import store from './store';

import './registerComponents';


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
