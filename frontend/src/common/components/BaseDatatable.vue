<template>
  <v-card>
    <v-data-table
      :headers="headers"
      :items="dataSource"
      :loading="loading"
      :search="search"
    >
      <template
        v-if="Boolean(editableProp)"
        #[slotName]="{item}"
      >
        <slot
          :name="editableProp"
          :item="item"
        >
          {{ item[editableProp] }}
        </slot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
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
    editableProp: {
      type: String,
      default: '',
    },
  },
  computed: {
    slotName() {
      return `item.${this.editableProp}`;
    },
  },
};
</script>

<style>

</style>
