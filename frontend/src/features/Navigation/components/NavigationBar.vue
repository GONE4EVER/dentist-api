<template>
  <v-navigation-drawer
    v-bind="$attrs"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list flat>
      <v-list-item
        v-for="item in items"
        @click="navigateTo(item)"
        :key="item.text"
        class="nav-bar__item"
        link
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';

import { actions as authActions } from 'features/Auth/store/constants';

import {
  PATIENTS_LIST_NAME,
  ROOT_NAME,
  RECORDS_LIST_NAME,
} from 'pages/Home/routes/constants';


export default {
  data() {
    return {
      active: 'patientsList',
      items: [
        {
          icon: 'mdi-contacts',
          text: 'Patients list',
          routeName: PATIENTS_LIST_NAME,
        },
        {
          icon: 'mdi-calendar',
          text: 'Records',
          routeName: RECORDS_LIST_NAME,
        },
        {
          action: this.logOut,
          icon: 'mdi-logout-variant',
          'icon-alt': 'mdi-chevron-down',
          text: 'Log out',
          routeName: 'login',
        },
      ],
    };
  },
  mounted() {
    const { name } = this.$route;

    if (name === ROOT_NAME) {
      this.$router.push({ name: this.active });
    }
  },
  methods: {
    ...mapActions({
      logOut: authActions.LOG_OUT,
    }),
    navigateTo({ action, routeName }) {
      const { name } = this.$route;

      if (action) {
        action();
      }

      if (name !== routeName) {
        this.$router.push({ name: routeName });
      }
    },
  },
};
</script>

<style scoped>
.nav-bar__item {
  cursor: pointer;
}
</style>
