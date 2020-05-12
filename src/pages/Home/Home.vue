<template>
  <v-app>
    <navigation-bar v-model="navBar"/>
    <app-header :handleMenuClick="toggleNavBar" />
    <v-content>
      <router-view />
      <base-snackbar
        :visible="Boolean(errorState)"
        :text="errorState || 'null'"
        color="error"
      />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import AppHeader from 'features/Navigation/components/AppHeader.vue';
import NavigationBar from 'features/Navigation/components/NavigationBar.vue';

import { actions, getters } from 'features/Patients/constants/store';


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
  computed: {
    ...mapGetters({
      errorState: getters.GET_ERROR_STATE,
    }),
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
