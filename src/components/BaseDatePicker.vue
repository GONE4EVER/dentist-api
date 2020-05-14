<template>
  <v-date-picker
    v-bind="$attrs"
    v-on="$listeners"
    scrollable
    show-current
  >
    <v-spacer />

    <v-btn text color="primary" @click="close">
      Cancel
    </v-btn>

    <v-btn text color="primary" @click="submit">
      OK
    </v-btn>
  </v-date-picker>
</template>

<script>
export default {
  methods: {
    submit() {
      this.$emit('submit');
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style>

</style>
