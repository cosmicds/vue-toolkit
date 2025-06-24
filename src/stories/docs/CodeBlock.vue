<template>
  <VCodeBlock
    :code="code"
    :lang="lang"
    theme="tomorrow"
    prismjs
  >
  </VCodeBlock>
</template>

<script setup lang="ts">
import { VCodeBlock } from "@wdns/vue-code-block";

interface Props {
  code: string;
  lang?: string;
}

withDefaults(defineProps<Props>(), {
  lang: "plain",
});
</script>
