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
        :value="inputModel || time"
        prepend-icon="mdi-calendar"
        readonly
        v-on="on"
      />
    </template>

    <v-time-picker
      :allowed-hours="allowedHours"
      :allowed-minutes="checkMinutes"
      :value="time"
      format="24hr"
      @change="onTimeChange"
      @click:hour="trackSelectedHour"
    >
      <v-spacer />

      <v-btn
        text
        color="primary"
        @click="$emit('update:isOpened', false)"
      >
        Cancel
      </v-btn>

      <v-btn
        text
        color="primary"
        @click="$refs.menu.save(time)"
      >
        OK
      </v-btn>
    </v-time-picker>
  </v-menu>
</template>

<script>
/**
 * * allowedItems prop should be array containing "time" property of the
 * * following format: <hours>:<minutes>
*/

export default {
  inheritAttrs: false,
  props: {
    allowedItems: {
      type: Array,
      default: null,
    },
    allowedHours: {
      type: Function,
      default: null,
    },
    allowedMinutes: {
      type: Function,
      default: null,
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
    isOpened: {
      type: Boolean,
      required: true,
    },
    time: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    hourSelected: null,
  }),
  methods: {
    trackSelectedHour(value) {
      this.hourSelected = value;
    },
    checkMinutes(value) {
      const {
        allowedHours,
        allowedItems,
        allowedMinutes,
      } = this;

      if (!allowedMinutes && !allowedHours) {
        return true;
      }
      if (!allowedHours || !allowedItems) {
        return allowedMinutes(value);
      }

      return allowedItems
        .some(({ time }) => {
          const isHourEqual = Number(time.split(':')[0]) === this.hourSelected;

          return isHourEqual && Number(time.split(':')[1]) === value;
        });
    },
    onTimeChange(value) {
      this.$emit('update:time', value);
    },
  },
};
</script>

<style>

</style>
