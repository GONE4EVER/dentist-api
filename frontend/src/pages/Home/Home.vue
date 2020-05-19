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
import AppHeader from 'features/Navigation/components/AppHeader.vue';
import NavigationBar from 'features/Navigation/components/NavigationBar.vue';

// import { ROOT_NAME, PATIENTS_LIST_NAME } from 'pages/Home/routes/constants';


export default {
  components: {
    AppHeader,
    NavigationBar,
  },
  data: () => ({
    navBar: null,
  }),
  methods: {
    toggleNavBar() {
      this.navBar = !this.navBar;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
}
</style>
