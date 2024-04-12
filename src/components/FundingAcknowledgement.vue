<template>
  <div
    id="funding-acknowledgment"
    :style="cssVars"
  >
    The material contained in this product is based upon work supported by NASA under cooperative agreement award No. 80NSSC21M0002. Any opinions, findings, and conclusions or recommendations expressed in this material are those of the authors and do not necessarily reflect the views of the National Aeronautics and Space Administration.
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
export interface FundingAcknowledgementProps {
  color?: string;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<FundingAcknowledgementProps>(), {
  color: "#E0E0E0",
  backgroundColor: "#0C3D91",
});

const cssVars = computed(() => {
  return {
    "--color": props.color,
    "--background-color": props.backgroundColor,
  };
});
</script>

<style scoped lang="less">
#funding-acknowledgment {
  color: var(--color);
  background-color: var(--background-color);
  font-size: calc(0.8em + 0.1vw + 0.1vh);
  line-height: calc(1em + 0.3vw + 0.3vh);
  padding-inline: 1em;
  padding-block: 0.7em;
  justify-self: flex-end;
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}
</style>
