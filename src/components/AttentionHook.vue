<template>
  <div
    class="attention-hook"
    v-show="visible"
    :style="css"
  >
    <slot>
      <font-awesome-icon
        icon="chevron-up"
        class="attention-hook-icon"
        @click="emit('open')"
      >
      </font-awesome-icon>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faChevronUp);

interface Props {
  visible?: boolean;
  bounceAmount?: string;
  bounceDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  bounceAmount: "10%",
  bounceDuration: 0.5,
});

const css = computed(() => ({
  "--bounce-amount": props.bounceAmount,
  "--bounce-duration": `${props.bounceDuration}s`,
}));

const emit = defineEmits<{
  (event: "open"): void;
}>();
</script>

<style lang="less">
.attention-hook {
  position: absolute;
  bottom: 0;
  right: 10px; 
  width: 40px;
  height: 40px;
  background: #808080;
  display: flex;
  align-items: center; 
  justify-content: center;
  border-radius: 10px;
  animation: bounce-vertical var(--bounce-duration) infinite alternate;

  &:hover {
    cursor: pointer;
  }

  & .attention-hook-icon {
    color: white;
  }
}

@keyframes bounce-vertical {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(var(--bounce-amount));
  }
  100% {
    transform: translateY(0);
  }
}
</style>
