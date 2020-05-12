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
    <NewPatientCard v-model="dialogOpened"/>
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
