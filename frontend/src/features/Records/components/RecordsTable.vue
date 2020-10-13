<template>
  <v-card>
    <v-dialog
      v-model="dialogOpened"
      persistent
      max-width="600"
    >
      <template #activator="{ on }">
        <v-card-title>
          {{ title }}
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            clearable
            label="Search"
            outlined
          />
        </v-card-title>

        <base-datatable
          searchable
          :data-source="filteredList"
          :headers="headers"
          :loading="fetching"
          :search.sync="search"
          :editable-prop="editableProp"
        >
          <template
            v-if="editableProp"
            #[editableProp]="{item}"
          >
            <v-btn
              icon
              v-on="on"
              @click="setSelectedItem(item)"
            >
              <v-icon color="indigo">
                mdi-note-text
              </v-icon>
            </v-btn>
          </template>
        </base-datatable>
      </template>

      <details-card
        v-bind="selectedRecord"
        :is-opened.sync="dialogOpened"
        :fetching="fetching"
        @updateContent="handleNotesUpdate"
      />
    </v-dialog>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import DetailsCard from 'common/components/DetailsCard.vue';
import {
  actions as recordsActions,
  getters as recordsGetters,
} from 'features/Records/store/constants';


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
      getList: recordsGetters.GET_LIST,
      getOne: recordsGetters.GET_ONE,
      fetching: recordsGetters.GET_FETCHING_STATE,
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
      editSelectedProfile: recordsActions.EDIT_RECORD,
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
