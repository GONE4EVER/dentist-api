<template>
  <v-card>
    <records-table />
    <v-btn
      bottom
      color="green"
      dark
      fab
      fixed
      right
      @click="dialogOpened = !dialogOpened"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <base-dialog v-model="dialogOpened"/>
  </v-card>
</template>

<script>
import RecordsTable from 'features/Records/components/RecordsTable.vue';


export default {
  components: {
    RecordsTable,
  },
  data: () => ({
    dialogOpened: false,
  }),
};
</script>

<style>

</style>
