<template>

  <v-tooltip :disabled="!tooltip" :text="tooltipText">
    <template v-slot:activator="{ props }">
      <v-btn
        :id="id"
        aria-label="Get link to share selected view"
        class="share-button"
        icon
        @click="share"
        @keyup.enter="share"
        v-bind="props"
        :color="buttonColor"
        :elevation="elevation"
        :size="size"
        :rounded="rounded"
      > 
        <v-icon :color="iconColor">mdi-share-variant</v-icon>
      </v-btn>
      <v-snackbar 
        v-if="!tooltip || alert"
        class="share-button-snackbar"   
        timeout="3500" 
        location="top" 
        :activator="`#${id}`"
        :text="alertText"
        color="success"
        variant="flat"
        min-height="0px"
        min-width="0px"
        transition="slide-y-transition"
        close-on-content-click
        >
      </v-snackbar>
    </template>
  </v-tooltip>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useClipboard } from "@vueuse/core";
const { copy } = useClipboard();
import { v4 } from "uuid";
import type { ShareButtonProps } from "../types";

const id = ref(`share-button-${v4()}`);

const props = withDefaults(defineProps<ShareButtonProps>(), {
  source: () => window.location.href,
  buttonColor: "#ffffff66",
  iconColor: "#333",
  elevation: "0",
  size: "small",
  rounded: "1",
  tooltip: true,
  tooltipText: "Share selected view",
  alert: false,
  alertText: "Share link copied to clipboard. Paste to share this view!",
});

const emit = defineEmits<{
  "share": [activate?: null],
}>();

function getURL() {
  if (typeof props.source === "string") {
    return props.source;
  }
  return props.source ? props.source() : window.location.href;
}

function share() {
  copy(getURL());
  emit("share");
}
</script>

<style lang="less">
.share-button {
  z-index: 1000;
  padding-inline: 5px;
  border-radius: 8px !important;
  border: thin solid var(--accent-color-2) !important;

  & .v-snackbar__wrapper > .v-snackbar__content {
    padding: 0.75em 1em;
  }
}

</style>
