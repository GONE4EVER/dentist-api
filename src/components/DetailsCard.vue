<template>
  <v-card>
    <v-overlay :value="fetching" absolute opacity="0.8">
      <v-progress-circular
        indeterminate
        rotate
        size="64"
        width="5"
        color="light-blue"
      />
    </v-overlay>
    <v-card-title v-if="Boolean(title)" class="headline">
      {{ `${firstName} ${lastName}'s details` }}
    </v-card-title>
    <v-card-text>
      {{ (!editMode || null) && (notes || cardTextPlaceholder) }}
      <v-textarea
        v-if="editMode"
        v-model="newNoteContent"
        :error-messages="errorMessage"
        :placeholder="editAreaPlaceholder"
        autofocus
      >
        <template v-if="Boolean(errorMessage)" #message={message}>
          {{ `${message}` }}
        </template>
      </v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="Boolean(errorMessage)"
        @click="callCollapse(true)"
        color="red"
        text
      >
        Discard
      </v-btn>
      <v-spacer />
      <v-btn color="green darken-1" text @click="switchEditMode">
        {{editMode ? 'Submit' : 'Edit'}}
      </v-btn>
      <v-btn color="green darken-1" text @click="callCollapse(false)">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

import { getters } from 'features/Patients/constants/store';


const CARD_TEXT_PLACEHOLDER = 'No notes yet.';
const CARD_EDIT_AREA_PLACEHOLDER = 'Type to edit...';
const ERROR_MESSAGE = 'Your changes will be lost.';


export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      newNoteContent: null,
      errorMessage: null,
      cardTextPlaceholder: CARD_TEXT_PLACEHOLDER,
      editAreaPlaceholder: CARD_EDIT_AREA_PLACEHOLDER,
    };
  },
  methods: {
    switchEditMode() {
      const { editMode, newNoteContent, notes } = this;

      if (editMode) {
        this.errorMessage = null;

        if (newNoteContent !== notes) {
          this.$emit('updateContent', newNoteContent);
        } else {
          this.editMode = !editMode;
        }
      } else {
        this.editMode = !editMode;
      }
    },
    callCollapse(force) {
      if (!force && this.newNoteContent !== this.notes) {
        this.errorMessage = ERROR_MESSAGE;
        return;
      }

      this.editMode = false;
      this.$emit('update:isOpened', false);
    },
  },
  computed: {
    ...mapGetters({
      fetching: getters.GET_FETCHING_STATE,
      errorState: getters.GET_ERROR_STATE,
    }),
  },
  watch: {
    isOpened: {
      immediate: true,
      handler(open) {
        if (open) {
          this.newNoteContent = this.notes;
        } else {
          this.errorMessage = null;
        }
      },
    },
    fetching(fetchingState) {
      const { editMode, errorState } = this;

      if (editMode && !fetchingState && !errorState) {
        this.editMode = false;
      }
    },
  },
};
</script>

<style>

</style>
