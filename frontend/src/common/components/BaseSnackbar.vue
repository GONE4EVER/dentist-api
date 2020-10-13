<template>
  <v-snackbar
    :value="visible"
    :bottom="y === 'bottom'"
    :left="x === 'left'"
    :top="y === 'top'"
    :right="x === 'right'"
    :color="color"
    :timeout="timeout"
  >
    {{ text }}
    <v-btn
      v-if="buttonText"
      v-bind="$attrs"
      dark
      text
      @click="close"
    >
      {{ buttonText }}
    </v-btn>
  </v-snackbar>
</template>

<script>
const X_AXIS = [ 'right', 'left' ];
const Y_AXIS = [ 'top', 'bottom' ];

const DEFAULT_TIMEOUT = 3000;


export default {
  props: {
    x: {
      type: String,
      validator(value) {
        return X_AXIS.includes(value);
      },
    },
    y: {
      type: String,
      validator(value) {
        return Y_AXIS.includes(value);
      },
    },
    buttonText: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: undefined,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    timeout: {
      type: Number,
      default: DEFAULT_TIMEOUT,
    },
    text: {
      type: String,
      required: true,
    },
    beforeClose: {
      type: Function,
      default: null,
    },
  },
  methods: {
    close() {
      this.$emit('beforeClose');
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style>

</style>
