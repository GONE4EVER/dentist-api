<template>
 <v-menu
    ref="menu"
    :close-on-content-click="false"
    :value="isOpened"
    @input="$emit('update:isOpened', $event)"
    min-width="290px"
    offset-y
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-on="on"
        :disabled="disabled"
        :label="label"
        :value="inputModel || time"
        prepend-icon="mdi-calendar"
        readonly
      />
    </template>

    <v-time-picker
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      @change="onTimeChange"
      :value="time"
      format="24hr"
    >
      <v-spacer />

      <v-btn text color="primary" @click="$emit('update:isOpened', false)">
        Cancel
      </v-btn>

      <v-btn text color="primary" @click="$refs.menu.save(time)">
        OK
      </v-btn>
    </v-time-picker>
  </v-menu>
</template>

<script>
export default {
  inheritAttrs: false,
  data: () => ({
    timeValue: null,
  }),
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
    allowedHours: {
      type: Function,
      default: null,
    },
    allowedMinutes: {
      type: Function,
      default: null,
    },
    time: {
      type: String,
      default: null,
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onTimeChange(value) {
      this.$emit('update:time', value);
    },
  },
};
</script>

<style>

</style>
