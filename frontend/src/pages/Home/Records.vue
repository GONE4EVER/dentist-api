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
      :visible="Boolean(doctorsError || patientsError || recordsError)"
      :text="recordsError || patientsError || doctorsError || 'null'"
      color="error"
    />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import NewRecordCard from 'features/Records/components/NewRecordCard.vue';
import RecordsTable from 'features/Records/components/RecordsTable.vue';

import { getters as doctorGetters } from 'features/Doctors/store/constants';
import { getters as patientsGetters } from 'features/Patients/store/constants';
import {
  actions as recordsActions,
  getters as recordsGetters,
} from 'features/Records/store/constants';


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
      patientsError: patientsGetters.GET_ERROR_STATE,
      doctorsError: doctorGetters.GET_ERROR_STATE,
      recordsList: recordsGetters.GET_LIST,
      recordsError: recordsGetters.GET_ERROR_STATE,
    }),
  },
  methods: {
    ...mapActions({
      fetchRecords: recordsActions.GET_RECORDS,
    }),
  },
  created() {
    if (!this.recordsList().length) {
      this.fetchRecords();
    }
  },
};
</script>

<style>

</style>
