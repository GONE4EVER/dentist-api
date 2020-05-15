<template>
  <v-card>
    <records-table />
    <v-btn
      @click="dialogOpened = !dialogOpened"
      bottom
      color="indigo"
      dark
      fab
      fixed
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <new-record-card v-if="dialogOpened" :isOpened.sync="dialogOpened"/>

    <base-snackbar
      :visible="Boolean(patientsError || recordsError)"
      :text="recordsError || patientsError || 'null'"
      color="error"
    />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import NewRecordCard from 'features/Records/components/NewRecordCard.vue';
import RecordsTable from 'features/Records/components/RecordsTable.vue';

import * as doctors from 'features/Doctors/constants/store';
import * as patients from 'features/Patients/constants/store';
import * as records from 'features/Records/constants/store';


export default {
  components: {
    NewRecordCard,
    RecordsTable,
  },
  data: () => ({
    dialogOpened: false,
  }),
  computed: {
    ...mapGetters({
      patientsError: patients.getters.GET_ERROR_STATE,
      doctorsList: doctors.getters.GET_LIST,
      patientsList: patients.getters.GET_LIST,
      recordsList: records.getters.GET_LIST,
      recordsError: records.getters.GET_ERROR_STATE,
    }),
  },
  methods: {
    ...mapActions({
      fetchRecords: records.actions.GET_RECORDS,
      fetchDoctors: doctors.actions.GET_DOCTORS,
      fetchPatients: patients.actions.GET_PATIENTS,
    }),
  },
  created() {
    if (!this.recordsList().length) {
      this.fetchRecords();
    }
    if (!this.doctorsList.length) {
      this.fetchDoctors();
    }
    if (!this.patientsList().length) {
      this.fetchPatients();
    }
  },
};
</script>

<style>

</style>
