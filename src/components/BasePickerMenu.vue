<template>
  <v-menu
    ref="menu"
    :value="isOpened"
    :close-on-content-click="false"
    transition="slide-y-reverse-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :value="inputSource"
        v-on="on"
        :disabled="inputDisabled"
        :prepend-icon="icon"
        :label="label"
        readonly
      />
    </template>

    <slot></slot>
  </v-menu>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    inputDisabled: {
      type: Boolean,
      default: false,
    },
    inputSource: {
      required: true,
      validator(v) {
        return typeof v === 'string' || v === null;
      },
    },
    isOpened: {
      type: Boolean,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    save(v) {
      this.$refs.menu.save(v);
    },
  },
};
</script>

<style>

</style>
