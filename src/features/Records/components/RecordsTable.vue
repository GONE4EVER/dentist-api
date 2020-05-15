<template>
  <v-card>
    <v-dialog persistent v-model="dialogOpened" max-width="600">
      <template #activator="{ on }">
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            clearable
            label="Search"
            outlined
          ></v-text-field>
        </v-card-title>

        <base-datatable
          searchable
          :dataSource="filteredList"
          :headers="headers"
          :loading="fetching"
          :search.sync="search"
          :editableProp="editableProp"
        >
          <template v-if="editableProp" #[editableProp]={item}>
            <v-btn icon v-on="on" @click="setSelectedItem(item)">
              <v-icon color="indigo">mdi-note-text</v-icon>
            </v-btn>
          </template>
        </base-datatable>
      </template>

      <details-card
        v-bind="selectedRecord"
        :isOpened.sync="dialogOpened"
        :fetching="fetching"
        @updateContent="handleNotesUpdate"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DetailsCard from 'components/DetailsCard.vue';

import * as doctors from 'features/Doctors/constants/store';
import * as patients from 'features/Patients/constants/store';
import * as records from 'features/Records/constants/store';


export default {
  components: {
    DetailsCard,
  },
  data() {
    return {
      title: 'Records',
      editableProp: 'notes',

      search: null,

      selectedRecordId: null,
      dialogOpened: false,

      headers: [
        {
          text: 'Doctor',
          align: 'start',
          value: 'doctor',
        },
        {
          text: 'Date',
          value: 'date',
        },
        {
          text: 'Time',
          value: 'time',
        },
        {
          text: 'Patient',
          value: 'patient',
        },
        {
          text: 'Phone number',
          value: 'phoneNumber',
        },
        {
          text: 'Notes',
          value: 'notes',
          sortable: false,
          filterable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      doctorsList: doctors.getters.GET_LIST,
      getDoctorProfile: doctors.getters.GET_ONE,
      getOne: records.getters.GET_ONE,
      fetchingRecords: records.getters.GET_FETCHING_STATE,
      fetchingDoctors: doctors.getters.GET_FETCHING_STATE,
      patientsList: patients.getters.GET_LIST,
      recordsList: records.getters.GET_LIST,
    }),
    fetching() {
      return this.fetchingRecords || this.fetchingDoctors;
    },
    selectedRecord() {
      const { getOne, selectedRecordId } = this;

      return getOne(selectedRecordId);
    },
    filteredList() {
      const {
        search, patientsList, recordsList, doctorsList,
      } = this;

      const patientsFetched = patientsList();
      const list = recordsList(search).map(
        (record) => {
          /* eslint no-param-reassign: 0 */
          record.doctor = doctorsList
            .find((d) => d.id === record.doctorId)?.fullName || 'Loading...';
          record.patient = patientsFetched
            .find((p) => p.id === record.patientId)?.fullName || 'Loading...';
          record.phoneNumber = patientsFetched
            .find((p) => p.id === record.patientId)?.phoneNumber || 'Loading...';

          return record;
        },
      );

      return list;
    },
  },
  methods: {
    ...mapActions({
      editSelectedProfile: records.actions.EDIT_RECORD,
    }),
    setSelectedItem({ id }) {
      this.selectedRecordId = id;
    },
    handleNotesUpdate(newValue) {
      this.editSelectedProfile({
        notes: newValue,
        id: this.selectedRecordId,
      });
    },
  },
};
</script>

<style>

</style>
