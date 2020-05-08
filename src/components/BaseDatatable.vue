<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer v-if="Boolean(title)"></v-spacer>
      <v-text-field
        v-model="search"
        v-if="searchable"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataSource"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    dataSource: {
      type: Array,
      required: true,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    search: '',
  }),
};
</script>

<style>

</style>
