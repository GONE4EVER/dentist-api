<template>
  <v-dialog
    :value="isOpened"
    persistent
    width="500px"
  >
    <v-card>
      <v-overlay :value="recordsFetching" absolute opacity="0.8">
        <v-progress-circular
          color="light-blue"
          indeterminate
          rotate
          size="64"
          width="5"
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
                  :loading="patientsFetching"
                  :rules="patient.rules"
                  clearable
                  hide-no-data
                  label="Patient full name"
                  required
                />

                <v-combobox
                  v-model="doctor.value"
                  @change="onDoctorChange"
                  @click:clear="onDoctorChange"
                  :items="doctorItems"
                  :loading="doctorsFetching"
                  :rules="doctor.rules"
                  clearable
                  hide-no-data
                  label="Doctor"
                  required
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <date-picker
                  :allowedDates="allowedDates"
                  :date.sync="pickedDate"
                  :disabled="!Boolean(doctor.value)"
                  :inputModel="formattedDate"
                  :isOpened.sync="datePicker"
                  icon="mdi-calendar"
                  label="Preferable date"
                />
              </v-col>

              <v-col cols="6">
                <time-picker
                  :allowedItems="doctor.availability"
                  :allowedHours="allowedHours"
                  :allowedMinutes="allowedMinutes"
                  :disabled="!Boolean(pickedDate)"
                  :isOpened.sync="timePicker"
                  :time.sync="pickedTime"
                  label="Preferable time"
                />
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
            :disabled="!isFormValid"
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
      :timeout="errorTimeout"
      buttonText="Close anyway"
      color="error"
    />
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DatePicker from 'components/Datepicker.vue';
import TimePicker from 'components/TimePicker.vue';

import * as doctors from 'features/Doctors/constants/store';
import * as patients from 'features/Patients/constants/store';
import * as records from 'features/Records/constants/store';

import formatters from 'utils/formatters';


const ERROR_BASE_TEXT = 'Required';
const PATIENT_MISSING_ERROR = 'No matching patient found';
const DOCTOR_MISSING_ERROR = 'No matching doctor found';
const FORM_IS_NOT_EMPTY_ERROR = 'Form is not empty';

const NOTES_INVALID = 'Too many symbols';

const NOT_EMPTY = (errorText) => (v) => !!v || errorText;


export default {
  components: {
    DatePicker,
    TimePicker,
  },
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      datePicker: false,
      doctor: {
        value: null,
        rules: [
          NOT_EMPTY(ERROR_BASE_TEXT),
          (v) => this.doctorItems.some(
            ({ text }) => v?.text && text.includes(v.text),
          ) || DOCTOR_MISSING_ERROR,
        ],
        availability: [],
      },
      error: '',
      errorTimeout: 3000,
      formattedDate: null,
      minDate: formatters.isoFormat(formatters.shortDate)(new Date()),
      notes: {
        value: null,
        rules: [
          (v) => !v || v.length <= 256 || NOTES_INVALID,
        ],
      },
      patient: {
        value: null,
        rules: [
          NOT_EMPTY(ERROR_BASE_TEXT),
          (v) => this.patientItems.some(
            ({ text }) => v?.text && text.includes(v.text),
          ) || PATIENT_MISSING_ERROR,
        ],
      },
      pickedDate: null,
      pickedTime: null,
      timePicker: false,
      valid: true,
    };
  },
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
    isFormValid() {
      return this.valid && this.pickedDate && this.pickedTime;
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
      this.pickedTime = null;

      this.doctor.availability = newValue?.availability || [];
    },
    allowedDates(value) {
      return this.doctor.availability
        .some(({ isoDate }) => isoDate === value);
    },
    allowedHours(value) {
      return this.doctor.availability
        .some(({ time, date }) => date === this.formattedDate
        && Number(time.split(':')[0]) === value);
    },
    allowedMinutes(value) {
      return this.doctor.availability
        .some(({ time }) => Number(time.split(':')[1]) === value);
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.error = '';
      this.onDoctorChange(); // force reset

      this.$refs.form.reset();
    },
    close() {
      this.reset();
      this.$emit('update:isOpened', false);
    },
    getFormData() {
      return {
        date: this.pickedDate,
        doctor: this.doctor.value?.id,
        notes: this.notes.value,
        patient: this.patient.value?.id,
        time: this.pickedTime,
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
      this.formattedDate = value
        ? formatters.shortDate.format(new Date(value))
        : value;
    },
    error(value) {
      if (value) {
        setTimeout(() => { this.error = ''; }, this.errorTimeout);
      }
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
