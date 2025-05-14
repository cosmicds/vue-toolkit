<template>
  <div
    :style="cssVars"
    class="code-block"
  >
    <pre>
      {{ code }}   
    </pre>
    <v-btn
      v-if="copyable"
      icon="mdi-content-copy"
    >
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface CodeBlockProps {
  code: string;
  copyable?: boolean;
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  copyable: true,
});

const cssVars = computed(() => ({
  "--pre-width": props.copyable ? "calc(max(66%, fit-content))" : "100%",
}));
</script>

<style scoped lang="less">
.code-block {
  border: solid 1px;
  border-radius: 2px;
  padding: 15px 5px;
  width: 100%;

  pre {
    display: inline;
    width: var(--pre-width);
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }

}
</style>
