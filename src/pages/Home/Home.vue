<template>
  <v-app>
    <navigation-bar v-model="navBar"/>
    <app-header :handleMenuClick="toggleNavBar" />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

import AppHeader from 'features/Navigation/components/AppHeader.vue';
import NavigationBar from 'features/Navigation/components/NavigationBar.vue';

import { actions } from 'features/Patients/constants/store';


export default {
  components: {
    AppHeader,
    NavigationBar,
  },
  data: () => ({
    navBar: null,
  }),
  beforeRouteUpdate(to, from, next) {
    this.navBar = null;
    next();
  },
  methods: {
    ...mapActions({
      fetchPatients: actions.GET_PATIENTS,
    }),
    toggleNavBar() {
      this.navBar = !this.navBar;
    },
  },
  created() {
    this.fetchPatients();
  },
};
</script>

<style scoped>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
</style>
