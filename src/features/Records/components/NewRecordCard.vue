<template>
  <v-dialog
    :value="isOpened"
    persistent
    width="500px"
  >
    <v-card>
      <v-overlay :value="recordsFetching" absolute opacity="0.8">
        <v-progress-circular
          indeterminate
          rotate
          size="64"
          width="5"
          color="light-blue"
        />
      </v-overlay>

      <v-card-title class="blue darken-2 white--text">
        Create record
      </v-card-title>
      <v-container>
        <v-card-text>
          <v-form
            ref="form"
            v-model="valid"
          >
            <v-row
              align="center"
              class="mr-0"
            >
              <v-col cols="12">
                <v-combobox
                  v-model="patient.value"
                  :items="patientItems"
                  :rules="patient.rules"
                  clearable
                  hide-no-data
                  label="Patient full name"
                  :loading="patientsFetching"
                  required
                />

                <v-combobox
                  v-model="doctor.value"
                  @change="onDoctorChange"
                  :items="doctorItems"
                  :rules="doctor.rules"
                  clearable
                  hide-no-data
                  label="Doctor"
                  :loading="doctorsFetching"
                  required
                />
              </v-col>

            </v-row>

            <v-row>
              <v-col cols="6">
                <v-menu
                  ref="menu"
                  v-model="datePicker"
                  :close-on-content-click="false"
                  transition="slide-y-reverse-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formattedDate"
                      v-on="on"
                      label="Preferable date"
                      prepend-icon="mdi-calendar"
                      :disabled="Boolean(!doctor.value)"
                      readonly
                    />
                  </template>

                  <v-date-picker
                    v-model="pickedDate"
                    :allowed-dates="allowedDates"
                    :first-day-of-week="1"
                    :min="minDate"
                    scrollable
                    show-current
                  >
                    <v-spacer />

                    <v-btn text color="primary" @click="datePicker = false">
                      Cancel
                    </v-btn>

                    <v-btn text color="primary" @click="$refs.menu.save(pickedDate)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-textarea
              v-model="notes.value"
              :counter="256"
              :rules="notes.rules"
              auto-grow
              clearable
              label="Notes"
              outlined
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn
            @click="cancel"
            color="error"
            text
          >
            Cancel
          </v-btn>

          <v-spacer />

          <v-btn
            color="primary"
            class="mr-4"
            @click="reset"
          >
            Reset
          </v-btn>

          <v-btn
            @click="submit"
            :disabled="!valid"
            color="success"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>

    <base-snackbar
      @beforeClose="close"
      :visible="Boolean(error)"
      :text="error || 'null'"
      buttonText="Close anyway"
      color="error"
    />
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import * as doctors from 'features/Doctors/constants/store';
import * as patients from 'features/Patients/constants/store';
import * as records from 'features/Records/constants/store';

import formatters from 'utils/formatters';


const ERROR_BASE_TEXT = 'Required';
const FORM_IS_NOT_EMPTY_ERROR = 'Form is not empty';

const NOTES_INVALID = 'Too many symbols';

const NOT_EMPTY = (errorText) => (v) => !!v || errorText;
const BASE_CONFIG = {
  value: null,
  rules: [ NOT_EMPTY(ERROR_BASE_TEXT) ],
};


export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    pickedDate: null,
    formattedDate: null,
    minDate: formatters.isoFormat(formatters.shortDate)(new Date()),

    doctor: {
      ...BASE_CONFIG,
      availability: [],
    },
    datePicker: false,
    error: '',

    notes: {
      value: null,
      rules: [
        (v) => {
          if (!v) {
            return true;
          }

          return v.length <= 256 || NOTES_INVALID;
        },
      ],
    },
    patient: { ...BASE_CONFIG },

    valid: true,
  }),
  computed: {
    ...mapGetters({
      doctorsList: doctors.getters.GET_LIST,
      doctorsError: doctors.getters.GET_ERROR_STATE,
      doctorsFetching: doctors.getters.GET_FETCHING_STATE,

      patientsList: patients.getters.GET_LIST,
      patientsError: patients.getters.GET_ERROR_STATE,
      patientsFetching: patients.getters.GET_FETCHING_STATE,

      recordsError: records.getters.GET_ERROR_STATE,
      recordsFetching: records.getters.GET_FETCHING_STATE,
    }),
    patientItems() {
      return this
        .patientsList()
        .map(({ fullName, id }) => ({ id, value: fullName, text: fullName }));
    },
    doctorItems() {
      return this.doctorsList
        .map(({ availability, id, fullName }) => ({
          id,
          value: id,
          text: fullName,
          availability,
        }));
    },
  },
  methods: {
    ...mapActions({
      addRecord: records.actions.ADD_RECORD,
      fetchDoctors: doctors.actions.GET_DOCTORS,
      fetchPatients: patients.actions.GET_PATIENTS,
    }),
    onDoctorChange(newValue) {
      this.pickedDate = null;
      this.doctor.availability = newValue?.availability || [];
    },
    allowedDates(value) {
      return this.doctor.availability
        .some(({ isoDate }) => isoDate === value);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.error = '';
      this.$refs.form.reset();
    },
    close() {
      this.reset();
      this.$emit('update:isOpened', false);
    },
    getFormData() {
      return {
        date: this.pickedDate,
        doctor: this.doctor.value,
        notes: this.notes.value,
        patient: this.patient.value,
      };
    },
    checkIfEmpty() {
      const isEmpty = Object
        .values(this.getFormData())
        .every((v) => !v);

      return isEmpty;
    },
    cancel() {
      const isEmpty = this.checkIfEmpty();

      if (isEmpty) {
        this.close();
      } else {
        this.error = FORM_IS_NOT_EMPTY_ERROR;
      }
    },
    submit() {
      const formData = this.getFormData();

      this.addRecord(formData);
    },
  },
  watch: {
    recordsFetching(fetchingState) {
      const { checkIfEmpty, close, recordsError } = this;

      if (!fetchingState && !recordsError && !checkIfEmpty()) {
        close();
      }
    },
    pickedDate(value) {
      this.formattedDate = formatters.shortDate
        .format(new Date(value));
    },
  },
  mounted() {
    const {
      fetchDoctors,
      fetchPatients,
      doctorsList,
      patientsList,
    } = this;

    if (!patientsList().length) {
      fetchPatients();
    }

    if (!doctorsList.length) {
      fetchDoctors();
    }
  },
};
</script>

<style>

</style>
