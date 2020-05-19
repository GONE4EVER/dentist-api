<template>
  <v-card>
    <patients-table />
    <v-btn
      @click="dialogOpened = !dialogOpened"
      bottom
      color="pink"
      dark
      fab
      fixed
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <new-patient-card :isOpened.sync="dialogOpened"/>

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

import { actions, getters } from 'features/Patients/store/constants';


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
      patientsList: getters.GET_LIST,
      errorState: getters.GET_ERROR_STATE,
    }),
  },
  methods: {
    ...mapActions({
      fetchPatients: actions.GET_PATIENTS,
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
