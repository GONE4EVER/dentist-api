<template>
  <v-dialog :value="isOpened" persistent width="800px">
    <v-card>
      <v-overlay :value="fetching" absolute opacity="0.8">
        <v-progress-circular indeterminate rotate size="64" width="5" color="light-blue" />
      </v-overlay>

      <v-card-title class="blue darken-2 white--text">Add new patient card</v-card-title>
      <v-container>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-row align="center" class="mr-0">
              <v-col cols="4">
                <v-avatar size="100px" class="mx-12">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt="profile pic"
                  />
                </v-avatar>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  v-model="name.firstName"
                  :counter="18"
                  :rules="name.rules"
                  label="First name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="name.lastName"
                  :counter="18"
                  :rules="name.rules"
                  label="Last name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              v-model="address.value"
              :rules="address.rules"
              label="Address"
              required
            ></v-text-field>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="email.value"
                  :rules="email.rules"
                  label="Email"
                  prepend-icon="mdi-card-account-mail-outline"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="phone.value"
                  :prefix="phone.prefix"
                  :rules="phone.rules"
                  placeholder="(XX)XXXXXXX"
                  prepend-icon="mdi-phone"
                  required
                  type="tel"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="job.value"
                  :rules="job.rules"
                  label="Job"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="company.value"
                  :rules="company.rules"
                  label="Company"
                  required
                ></v-text-field>
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
          <v-btn @click="cancel" color="error" text>Cancel</v-btn>
          <v-spacer />

          <v-btn color="primary" class="mr-4" @click="reset">Reset</v-btn>

          <v-btn @click="submit" :disabled="!valid" color="success">Submit</v-btn>
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

import {
  actions as patientsActions,
  getters as patientsGetters,
} from 'features/Patients/store/constants';


const PHONE_PREFIX = '+375';

const ERROR_BASE_TEXT = 'Required';
const FORM_IS_NOT_EMPTY_ERROR = 'Form is not empty';

const EMAIL_INVALID = 'Invalid email';
const NAME_INVALID = 'Must be equal or less than 12 characters';
const NOTES_INVALID = 'Too many symbols';
const PHONE_INVALID = 'Invalid Number';
const PHONE_REQUIRED = 'Phone number required';

const EMAIN_REGEXP = /.+@.+\..+/;

const MAX_NAME_LENGTH = 18;

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
    address: { ...BASE_CONFIG },
    company: { ...BASE_CONFIG },
    email: {
      value: null,
      rules: [ NOT_EMPTY(ERROR_BASE_TEXT), (v) => EMAIN_REGEXP.test(v) || EMAIL_INVALID ],
    },
    error: '',
    errorTimeout: 3000,
    job: { ...BASE_CONFIG },
    name: {
      firstName: null,
      lastName: null,
      rules: [
        NOT_EMPTY(ERROR_BASE_TEXT),
        (v) => (v && v.length <= MAX_NAME_LENGTH) || NAME_INVALID,
      ],
    },
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
    phone: {
      prefix: PHONE_PREFIX,
      value: null,
      rules: [
        NOT_EMPTY(PHONE_REQUIRED),
        (v) => v !== PHONE_PREFIX,
        (v) => /^(([0-9]){9})$/.test(v) || PHONE_INVALID,
      ],
    },
    valid: true,
  }),
  computed: {
    phoneNumber() {
      const { prefix, value } = this.phone;

      return value ? `${prefix}${value}` : value;
    },
    ...mapGetters({
      errorState: patientsGetters.GET_ERROR_STATE,
      fetching: patientsGetters.GET_FETCHING_STATE,
    }),
  },
  methods: {
    ...mapActions({
      addPatient: patientsActions.ADD_PATIENT,
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
        address: this.address.value,
        company: this.company.value,
        email: this.email.value,
        firstName: this.name.firstName,
        job: this.job.value,
        lastName: this.name.lastName,
        notes: this.notes.value,
        phoneNumber: this.phoneNumber,
      };
    },
    checkIfEmpty() {
      return Object.values(this.getFormData()).every((v) => !v);
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

      this.addPatient(formData);
    },
  },
  watch: {
    fetching(fetchingState) {
      const { checkIfEmpty, close, errorState } = this;

      if (!fetchingState && !errorState && !checkIfEmpty()) {
        close();
      }
    },
    error(value) {
      if (value) {
        setTimeout(() => {
          this.error = '';
        }, this.errorTimeout);
      }
    },
  },
};
</script>

<style></style>
