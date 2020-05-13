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
        @updateContent="handleNotesUpdate"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DetailsCard from 'components/DetailsCard.vue';

import { actions, getters } from 'features/Records/constants/store';


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
      getList: getters.GET_LIST,
      getOne: getters.GET_ONE,
      fetching: getters.GET_FETCHING_STATE,
    }),
    selectedRecord() {
      const { getOne, selectedRecordId } = this;

      return getOne(selectedRecordId);
    },
    filteredList() {
      const { search, getList } = this;

      return getList(search);
    },
  },
  methods: {
    ...mapActions({
      editSelectedProfile: actions.EDIT_RECORD,
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
