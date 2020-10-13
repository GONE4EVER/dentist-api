<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :value="isOpened"
    min-width="290px"
    offset-y
    transition="slide-y-reverse-transition"
    @input="$emit('update:isOpened', $event)"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        :disabled="disabled"
        :label="label"
        :value="inputModel || date"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      />
    </template>

    <v-date-picker
      :allowed-dates="allowedDates"
      :first-day-of-week="1"
      :min="minDate"
      :value="date"
      scrollable
      show-current
      @change="onDateChange"
    >
      <v-spacer />

      <v-btn
        color="primary"
        text
        @click="$emit('update:isOpened', false)"
      >
        Cancel
      </v-btn>

      <v-btn
        color="primary"
        text
        @click="$refs.menu.save(date);"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    icon: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputModel: {
      validator(v) {
        return typeof v === 'string' || v === null;
      },
      default: null,
    },
    label: {
      type: String,
      default: '',
    },
    allowedDates: {
      type: Function,
      default: null,
    },
    minDate: {
      type: String,
      default: '',
    },
    date: {
      type: String,
      default: null,
    },
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onDateChange(value) {
      this.$emit('update:date', value);
    },
  },
};
</script>

<style>

</style>
