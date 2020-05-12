<template>
  <v-dialog
    v-bind="$attrs"
    persistent
    width="800px"
  >
    <v-card>
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
            @click="reset"
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
  </v-dialog>
</template>

<script>
// import { mapGetters, mapActions } from 'vuex';


const PHONE_PREFIX = '+375';

const notEmpty = (errorText) => (v) => !!v || errorText;
const baseConfig = {
  value: '',
  rules: [ notEmpty('Required') ],
};


export default {
  data: () => ({
    valid: true,
    name: {
      firstName: '',
      lastName: '',
      rules: [
        notEmpty('Required'),
        (v) => (v && v.length <= 12) || 'Must be equal or less than 12 characters',
      ],
    },
    address: { ...baseConfig },
    job: { ...baseConfig },
    company: { ...baseConfig },
    phone: {
      prefix: PHONE_PREFIX,
      value: '',
      rules: [
        notEmpty('Phone number required'),
        (v) => v !== PHONE_PREFIX,
        (v) => /^(([0-9]){9})$/.test(v) || 'Invalid Number',
      ],
    },
    email: {
      value: '',
      rules: [
        notEmpty('Required'),
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
    },
    notes: {
      value: '',
      rules: [ (v) => v.length <= 256 || 'Too many symbols' ],
    },
    checkbox: false,
  }),
  computed: {
    phoneNumber() {
      const { prefix, value } = this.phone;

      return `${prefix}${value}`;
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    submit() {
      const formData = {
        address: this.address.value,
        company: this.company.value,
        email: this.email.value,
        firstName: this.name.firstName,
        job: this.job.value,
        lastName: this.name.lastName,
        notes: this.notes.value,
        phoneNumber: this.phoneNumber,
      };

      console.log(formData);
    },
  },
};
</script>

<style>

</style>
