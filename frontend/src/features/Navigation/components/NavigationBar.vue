<template>
  <v-navigation-drawer
    v-bind="$attrs"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list flat>
      <v-list-item
        v-for="{text, icon, routeName} in items"
        @click="navigate(routeName)"
        :key="text"
        class="nav-bar__item"
        link
      >
        <v-list-item-action>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  PATIENTS_LIST_NAME,
  ROOT_NAME,
  RECORDS_LIST_NAME,
} from 'pages/Home/routes/constants';


export default {
  data: () => ({
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
        icon: 'mdi-logout-variant',
        'icon-alt': 'mdi-chevron-down',
        text: 'Log out',
        routeName: 'login',
      },
    ],
  }),
  mounted() {
    const { name } = this.$route;

    if (name === ROOT_NAME) {
      this.$router.push({ name: this.active });
    }
  },
  methods: {
    navigate(routeName) {
      const { name } = this.$route;

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
