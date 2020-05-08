<template>
  <v-card>
    <patients-table />
    <v-btn
      bottom
      color="pink"
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
import PatientsTable from 'features/Patients/components/PatientsTable.vue';


export default {
  components: {
    PatientsTable,
  },
  data: () => ({
    dialogOpened: false,
  }),
};
</script>

<style>

</style>
