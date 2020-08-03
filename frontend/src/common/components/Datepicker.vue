<template>
 <v-menu
    ref="menu"
    :close-on-content-click="false"
    @input="$emit('update:isOpened', $event)"
    :value="isOpened"
    min-width="290px"
    offset-y
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-on="on"
        :disabled="disabled"
        :label="label"
        :value="inputModel || date"
        prepend-icon="mdi-calendar"
        readonly
      />
    </template>

    <v-date-picker
      :allowed-dates="allowedDates"
      @change="onDateChange"
      :first-day-of-week="1"
      :min="minDate"
      :value="date"
      scrollable
      show-current
    >
      <v-spacer />

      <v-btn
        @click="$emit('update:isOpened', false)"
        color="primary"
        text
      >
        Cancel
      </v-btn>

      <v-btn
        @click="$refs.menu.save(date);"
        color="primary"
        text
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
