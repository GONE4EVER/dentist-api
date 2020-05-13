<template>
  <v-dialog
    :value="isOpened"
    persistent
    width="800px"
  >
    <v-card>
      <v-overlay :value="fetching" absolute opacity="0.8">
        <v-progress-circular
          indeterminate
          rotate
          size="64"
          width="5"
          color="light-blue"
        />
      </v-overlay>

      <v-card-title class="blue darken-2 white--text">
        Add new patient card
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
              <v-col cols="4">
                <v-avatar
                  size="100px"
                  class="mx-12"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt="profile pic"
                  >
                </v-avatar>
              </v-col>

              <v-col cols="8">
                <v-text-field
                  v-model="name.firstName"
                  :counter="12"
                  :rules="name.rules"
                  label="First name"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="name.lastName"
                  :counter="12"
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
              outlined
            />

            <v-checkbox
              v-model="checkbox"
              :rules="[v => !!v || 'You must agree to continue!']"
              label="I accept privacy policy blablabla"
              required
            ></v-checkbox>
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

import { actions, getters } from 'features/Patients/constants/store';

const PHONE_PREFIX = '+375';

const ERROR_BASE_TEXT = 'Required';
const FORM_IS_NOT_EMPTY_ERROR = 'Form is not empty';

const EMAIL_INVALID = 'Invalid email';
const NAME_INVALID = 'Must be equal or less than 12 characters';
const NOTES_INVALID = 'Too many symbols';
const PHONE_INVALID = 'Invalid Number';
const PHONE_REQUIRED = 'Phone number required';


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
    error: '',
    valid: true,
    name: {
      firstName: null,
      lastName: null,
      rules: [
        notEmpty(ERROR_BASE_TEXT),
        (v) => (v && v.length <= 12) || NAME_INVALID,
      ],
    },
    address: { ...baseConfig },
    job: { ...baseConfig },
    company: { ...baseConfig },
    phone: {
      prefix: PHONE_PREFIX,
      value: null,
      rules: [
        notEmpty(PHONE_REQUIRED),
        (v) => v !== PHONE_PREFIX,
        (v) => /^(([0-9]){9})$/.test(v) || PHONE_INVALID,
      ],
    },
    email: {
      value: null,
      rules: [
        notEmpty(ERROR_BASE_TEXT),
        (v) => /.+@.+\..+/.test(v) || EMAIL_INVALID,
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
    checkbox: false,
  }),
  computed: {
    phoneNumber() {
      const { prefix, value } = this.phone;

      return value
        ? `${prefix}${value}`
        : value;
    },
    ...mapGetters({
      errorState: getters.GET_ERROR_STATE,
      fetching: getters.GET_FETCHING_STATE,
    }),
  },
  methods: {
    ...mapActions({
      addPatient: actions.ADD_PATIENT,
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
      return Object
        .values(this.getFormData())
        .every((v) => !v);
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
  },
};
</script>

<style>

</style>
