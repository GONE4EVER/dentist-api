<template>
  <v-card>
    <patients-table />
    <v-btn
      @click="dialogOpened = !dialogOpened"
      bottom
      color="pink"
      dark
      fab
      fixed
      right
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <new-patient-card :isOpened.sync="dialogOpened"/>
  </v-card>
</template>

<script>
import NewPatientCard from 'features/Patients/components/NewPatientCard.vue';
import PatientsTable from 'features/Patients/components/PatientsTable.vue';


export default {
  components: {
    NewPatientCard,
    PatientsTable,
  },
  data: () => ({
    dialogOpened: false,
  }),
};
</script>

<style>

</style>
