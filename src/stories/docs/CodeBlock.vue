<template>
  <div
    :style="cssVars"
    class="code-block"
  >
    <div class="code">
      {{ displayCode }}   
    </div>
    <v-btn
      :id="buttonID"
      v-if="copyable"
      :elevation="0"
      :rounded="false"
      size="lg"
      icon="mdi-content-copy"
      @click="clipboard.copy()"
    >
    </v-btn>
    <v-snackbar
      timeout="3500"
      location="bottom"
      text="Code copied!"
      color="success"
      variant="flat"
      :activator="`#${buttonID}`"
      transition="slide-y-transition"
      close-on-content-click
    ></v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useClipboard } from "@vueuse/core";
import { VSnackbar } from "vuetify/components";
import { v4 } from "uuid";

// We want to make sure the ID starts with a letter so that we can target it with CSS
const buttonID = `button-${v4()}`;

export interface CodeBlockProps {
  code: string | string[];
  copyable?: boolean;
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  copyable: true,
});

const displayCode = computed(() => typeof props.code === "string" ? props.code : props.code.join("\n"));
const clipboard = useClipboard({ source: displayCode });

const cssVars = computed(() => ({
  "--pre-width": props.copyable ? "calc(max(66%, fit-content))" : "100%",
}));
</script>

<style scoped lang="less">
.code-block {
  border: solid 1px;
  border-radius: 2px;
  padding: 15px;
  width: 100%;
  position: relative;
  display: flex;

  div.code {
    font-family: monospace;
    text-align: left;
    padding-left: 0;
    text-align: left;
    height: fit-content;
    width: var(--pre-width);
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }

  .v-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }

}
</style>
