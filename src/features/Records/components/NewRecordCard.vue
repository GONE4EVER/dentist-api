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

            <v-text-field
              v-model="date.value"
              :rules="date.rules"
              label="Date"
              required
            ></v-text-field>

            <v-textarea
              v-model="notes.value"
              :counter="256"
              :rules="notes.rules"
              auto-grow
              clearable
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
            Reset Form
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


const ERROR_BASE_TEXT = 'Required';
const FORM_IS_NOT_EMPTY_ERROR = 'Form is not empty';

const NOTES_INVALID = 'Too many symbols';

const notEmpty = (errorText) => (v) => !!v || errorText;
const baseConfig = {
  value: null,
  rules: [ notEmpty(ERROR_BASE_TEXT) ],
};

export default {
  props: {
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    date: { ...baseConfig },
    doctor: { ...baseConfig },

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
    patient: { ...baseConfig },

    valid: true,
  }),
  computed: {
    phoneNumber() {
      const { prefix, value } = this.phone;

      return value
        ? `${prefix}${value}`
        : value;
    },
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
      console.log(this
        .doctorsList);
      return this
        .doctorsList
        .map(({ fullName, id }) => ({ id, value: fullName, text: fullName }));
    },
  },
  methods: {
    ...mapActions({
      addRecord: records.actions.ADD_RECORD,
      fetchDoctors: doctors.actions.GET_DOCTORS,
      fetchPatients: patients.actions.GET_PATIENTS,
    }),
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
        date: this.date.value,
        doctor: this.date.doctor,
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
