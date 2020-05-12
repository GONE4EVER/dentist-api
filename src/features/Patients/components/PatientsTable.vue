<template>
  <v-card>
    <v-dialog persistent v-model="dialogOpened" max-width="600">
      <template #activator="{ on }">
        <base-datatable
          title="Regitered patients"
          searchable
          :search.sync="search"
          :dataSource="filteredList"
          :headers="headers"
          :loading="fetching"
        >
          <template #notes={item}>
            <v-btn icon v-on="on" @click="setSelectedItem(item)">
              <v-icon color="blue darken-1">mdi-note</v-icon>
            </v-btn>
          </template>
        </base-datatable>
      </template>
      <details-card
        title="Console log"
        v-bind="selectedPatient"
        :isOpened.sync="dialogOpened"
        @updateContent="handleNotesUpdate"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DetailsCard from 'components/DetailsCard.vue';

import { actions, getters } from 'features/Patients/constants/store';


export default {
  components: {
    DetailsCard,
  },
  data() {
    return {
      search: null,
      selectedDate: null,
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
      getList: getters.GET_LIST,
      fetching: getters.GET_FETCHING_STATE,
      getOne: getters.GET_ONE,
    }),
    selectedPatient() {
      const { getOne, selectedPatientId } = this;

      return getOne(selectedPatientId);
    },
    filteredList() {
      const { search, selectedDate, getList } = this;

      return getList(search, selectedDate);
    },
  },
  methods: {
    ...mapActions({
      fetchPatients: actions.GET_PATIENTS,
      editSelectedProfile: actions.EDIT_PATIENT_PROFILE,
    }),
    setSelectedItem({ id }) {
      this.selectedPatientId = id;
    },
    handleNotesUpdate(newValue) {
      this.editSelectedProfile({
        targetProp: 'notes',
        value: newValue,
        id: this.selectedPatientId,
      });
    },
  },
};
</script>

<style>

</style>
