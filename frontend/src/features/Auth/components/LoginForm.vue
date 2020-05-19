<template>
  <v-col
    sm="8"
    md="6"
    lg="4"
  >
    <v-card class="elevation-12">
      <v-toolbar
        color="primary"
        dark
        flat
      >
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="login"
            :error-messages="authError"
            label="Login"
            name="login"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :error-messages="authError"
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="tryLogin"
          class="col-3"
          color="primary"
        >Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import {
  actions as authActions,
  getters as authGetters,
} from 'features/Auth/store/constants';


export default {
  data: () => ({
    login: null,
    password: null,
  }),
  mounted() {
    this.authenticate();
  },
  methods: {
    ...mapActions({
      authenticate: authActions.AUTHENTICATE,
    }),
    tryLogin() {
      const {
        authenticate,
        login,
        password,
      } = this;

      authenticate({ login, password });
    },
  },
  computed: {
    ...mapGetters({
      authState: authGetters.GET_AUTH_STATE,
      authError: authGetters.GET_ERROR_STATE,
    }),
  },
  watch: {
    authState: {
      immediate: true,
      handler(v) {
        if (v) {
          this.$router.push({ name: 'home' });
        }
      },
    },
  },
};
</script>

<style>

</style>
