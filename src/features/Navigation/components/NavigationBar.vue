<template>
  <v-navigation-drawer
    v-bind="$attrs"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <v-list flat>
      <v-list-item
        v-for="{text, icon, routeName} in items"
        link
        :key="text"
        @click="navigate(routeName)"
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
import { ROOT_NAME as homeRouteName } from '../../../pages/Home/routes/constants';
// TODO: replace items with Route.entity objects

export default {
  data: () => ({
    active: 'patientsList',
    items: [
      {
        icon: 'mdi-contacts',
        text: 'Patients list',
        routeName: 'patientsList', // TODO: replace with constant
      },
      {
        icon: 'mdi-calendar',
        text: 'Records',
        routeName: 'recordsList', // TODO: replace with constant
      },
      {
        icon: 'mdi-logout-variant',
        'icon-alt': 'mdi-chevron-down',
        text: 'Log out',
        routeName: 'login', // TODO: replace with constant
      },
    ],
  }),
  mounted() {
    const { name } = this.$route;

    if (name === homeRouteName) { // TODO: replace with constant
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

</style>
