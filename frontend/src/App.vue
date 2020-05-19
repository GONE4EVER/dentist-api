<template>
  <v-app id="inspire">
    <router-view />
  </v-app>
</template>

<script>
export default {
  provide() {
    return {
      getAuthStatus: this.getAuthStatus,
      logOut: this.logOut,
      authorize: this.authorize,
    };
  },
  data: () => ({
    authorized: false,
  }),
  created() {
    const login = localStorage.getItem('l');
    const password = localStorage.getItem('p');

    const credsValid = this.checkCredentials(login, password);
    this.setAuthStatus(credsValid);
  },
  methods: {
    getAuthStatus() {
      return this.authorized;
    },
    setAuthStatus(value) {
      this.authorized = value;
    },
    checkCredentials(login, password) {
      const {
        VUE_APP_LOGIN,
        VUE_APP_PASSWORD,
      } = process.env;

      return login === VUE_APP_LOGIN && password === VUE_APP_PASSWORD;
    },
    logOut() {
      this.setAuthStatus(false);
      localStorage.clear();
    },
    authorize(login, password) {
      const credsValid = this.checkCredentials(login, password);

      if (credsValid) {
        localStorage.setItem('l', login);
        localStorage.setItem('p', password);

        this.setAuthStatus(true);
      } else {
        this.logOut();
      }
    },
  },
  watch: {
    authorized(value) {
      this.$router.push({ name: value ? 'home' : 'login' });
    },
  },
};

</script>
