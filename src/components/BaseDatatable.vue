<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer v-if="Boolean(title)"></v-spacer>
      <v-text-field
        v-if="searchable"
        :value="search"
        @input="onSearchUpdate"
        append-icon="mdi-magnify"
        clearable
        label="Search"
        outlined
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dataSource"
      :loading="loading"
      :search="search"
    >
      <template #item.notes="{item}">
        <slot name="notes" :item="item">
          {{ item.notes }}
        </slot>
      </template>
    </v-data-table>
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
    search: {
      type: String,
      default: '',
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSearchUpdate(value) {
      this.$emit('update:search', value);
    },
  },
};
</script>

<style>

</style>
