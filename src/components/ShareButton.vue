
<template>
  <use-clipboard v-slot="{ copy }" :source="source">
    <v-snackbar 
      v-if="tooltipDisabled || alert"
      class="share-button-snackbar"   
      timeout="3500" 
      location="top" 
      activator="#share-button"
      text="Share link copied to clipboard. Paste to share this view!"
      color="success"
      variant="flat"
      min-height="0px"
      min-width="0px"
      transition="slide-y-transition"
      close-on-content-click
      >
    </v-snackbar>
    <v-tooltip :disabled="tooltipDisabled" text="Share selected view">
      <template v-slot:activator="{ props }">
        <v-btn
          id="share-button"
          aria-label="Get link to share selected view"
          class="share-button"
          icon
          @click="() => {
            copy(source);
            $emit('share');
          }
          "
          @keyup.enter="() => {
            copy(source);
            $emit('share');
          }"
          v-bind="props"
          :color="buttonColor"
          :elevation="elevation"
          :size="size"
          :rounded="rounded"
        > 
          <v-icon :color="iconColor">mdi-share-variant</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </use-clipboard>
</template>

<script setup lang="ts">
import { type ShareButtonProps } from "../types";
import { UseClipboard } from "@vueuse/components";

const props = withDefaults(defineProps<ShareButtonProps>(), {
  buttonColor: "#ffffff66",
  iconColor: "#333",
  elevation: "0",
  size: "small",
  rounded: "1",
  tooltipDisabled: false,
  alert: false,
});
</script>
