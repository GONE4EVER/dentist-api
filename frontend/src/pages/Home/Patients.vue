<template>
  <v-card>
    <patients-table />
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialogOpened = !dialogOpened"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <new-patient-card :is-opened.sync="dialogOpened" />

    <base-snackbar
      :visible="Boolean(errorState)"
      :text="errorState || 'null'"
      color="error"
    />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import NewPatientCard from 'features/Patients/components/NewPatientCard.vue';
import PatientsTable from 'features/Patients/components/PatientsTable.vue';
import {
  actions as patientsActions,
  getters as patientsGetters,
} from 'features/Patients/store/constants';


export default {
  components: {
    NewPatientCard,
    PatientsTable,
  },
  data: () => ({
    dialogOpened: false,
  }),
  computed: {
    ...mapGetters({
      patientsList: patientsGetters.GET_LIST,
      errorState: patientsGetters.GET_ERROR_STATE,
    }),
  },
  methods: {
    ...mapActions({
      fetchPatients: patientsActions.GET_PATIENTS,
    }),
  },
  created() {
    if (!this.patientsList().length) {
      this.fetchPatients();
    }
  },
};
</script>

<style>

</style>
