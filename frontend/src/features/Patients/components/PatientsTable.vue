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
              <v-icon color="pink">mdi-note-text</v-icon>
            </v-btn>
          </template>
        </base-datatable>
      </template>

      <details-card
        v-bind="selectedPatient"
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

import {
  actions as patientsActions,
  getters as patientsGetters,
} from 'features/Patients/store/constants';


export default {
  components: {
    DetailsCard,
  },
  data() {
    return {
      title: 'Regitered patients',
      editableProp: 'notes',

      search: null,

      selectedPatientId: null,
      dialogOpened: false,

      headers: [
        {
          text: 'Full Name',
          align: 'start',
          value: 'fullName',
        },
        {
          text: 'Phone number',
          value: 'phoneNumber',
          sortable: false,
        },
        {
          text: 'Email',
          value: 'email',
        },
        {
          text: 'Company',
          value: 'company',
        },
        {
          text: 'Job',
          value: 'job',
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
      getList: patientsGetters.GET_LIST,
      getOne: patientsGetters.GET_ONE,
      fetching: patientsGetters.GET_FETCHING_STATE,
    }),
    selectedPatient() {
      const { getOne, selectedPatientId } = this;
      const patient = getOne(selectedPatientId);

      return {
        ...patient,
        title: patient?.fullName,
      };
    },
    filteredList() {
      const { search, getList } = this;

      return getList(search);
    },
  },
  methods: {
    ...mapActions({
      editSelectedProfile: patientsActions.EDIT_PATIENT_PROFILE,
    }),
    setSelectedItem({ id }) {
      this.selectedPatientId = id;
    },
    handleNotesUpdate(newValue) {
      this.editSelectedProfile({
        notes: newValue,
        id: this.selectedPatientId,
      });
    },
  },
};
</script>

<style>

</style>
