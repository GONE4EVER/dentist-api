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

    <!-- card -->

    <base-snackbar
      :visible="Boolean(errorState)"
      :text="errorState || 'null'"
      color="error"
    />
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import RecordsTable from 'features/Records/components/RecordsTable.vue';

import { actions, getters } from 'features/Records/constants/store';


export default {
  components: {
    RecordsTable,
  },
  data: () => ({
    dialogOpened: false,
  }),
  computed: {
    ...mapGetters({
      errorState: getters.GET_ERROR_STATE,
    }),
  },
  methods: {
    ...mapActions({
      fetchRecords: actions.GET_RECORDS,
    }),
  },
  created() {
    this.fetchRecords();
  },
};
</script>

<style>

</style>
