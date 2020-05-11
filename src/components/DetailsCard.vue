<template>
  <v-card>
    <v-card-title v-if="Boolean(title)" class="headline">
      {{title}}
    </v-card-title>
    <v-card-text>
      {{ (!editMode && notes) || null }}
      <v-textarea
        v-if="editMode"
        v-model="newNoteContent"
        :error-messages="errorMessages"
        name="notes"
        placeholder="Type to edit..."
      >
        <template v-if="Boolean(errorMessages.length)" #message={message}>
          {{ `${message}` }}
        </template>
      </v-textarea>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="Boolean(errorMessages.length)"
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
    isOpened: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      newNoteContent: null,
      errorMessages: [],
    };
  },
  methods: {
    switchEditMode() {
      const { editMode, newNoteContent } = this;

      if (editMode) {
        this.errorMessages = [];
        this.$emit('updateContent', newNoteContent);
      }
      this.editMode = !editMode;
    },
    callCollapse(force) {
      if (!force && this.newNoteContent !== this.notes) {
        this.errorMessages = [ ERROR_MESSAGE ];
        return;
      }

      this.editMode = false;
      this.$emit('update:isOpened', false);
    },
  },
  watch: {
    isOpened: {
      immediate: true,
      handler(open) {
        if (open) {
          this.newNoteContent = this.notes;
        } else {
          this.errorMessages = [];
        }
      },
    },
  },
};
</script>

<style>

</style>
