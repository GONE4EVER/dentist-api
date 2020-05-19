<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <login-form />
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import LoginForm from 'features/Auth/components/LoginForm.vue';


export default {
  components: {
    LoginForm,
  },
};
</script>

<style>

</style>
