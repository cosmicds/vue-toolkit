<template>
  <v-tooltip
    v-model="tooltip"
    :location="tooltipLocation"
    :open-on-click="tooltipOnClick"
    :open-on-focus="tooltipOnFocus"
    :open-on-hover="tooltipOnHover"
    :offset="tooltipOffset"
    :disabled="!tooltipText || !showTooltip"
  >
    <template v-slot:activator="{ props }: { props: Record<string,any> }">
      <div
        v-bind="props"
        :id="buttonID"
        :class="['icon-wrapper', {'active': modelValue}]"
        @click="handleAction"
        @keyup.enter="handleAction"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        :style="cssVars"
        tabindex="0"
      >
        <slot name="button">
          <font-awesome-icon
            v-if="faIcon"
            :icon="faIcon"
            :size="faSize"
            :class="['fa-icon', faIcon]"
          ></font-awesome-icon>
          <v-icon
            v-if="mdIcon"
            :size="mdSize"
            :class="['md-icon', mdIcon]"
          >{{ `mdi-${mdIcon}` }}
        </v-icon>
        </slot>
      </div>
    </template>
    <span>{{ tooltipText }}</span>
  </v-tooltip>
</template>


<script setup lang="ts">
import { computed, ref, useAttrs, type VNode } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { VIcon } from "vuetify/components/VIcon";
import { VTooltip } from "vuetify/components/VTooltip";

import { IconButtonProps } from "../types";


const props = withDefaults(defineProps<IconButtonProps>(), {
  color: "#ffffff",
  focusColor: "#ffffff",
  activeColor: "#ffffff",
  backgroundColor: "#040404",
  border: true,
  longPressTimeMs: 500,
  tooltipLocation: "start",
  tooltipOnClick: false,
  tooltipOnFocus: false,
  tooltipOnHover: true,
  tooltipOffset: 0,
  showTooltip: true,
  faSize: "lg",
  mdSize: "1.25em"
});

const emit = defineEmits<{
  /** Fired whenever the modelValue of the button changes. If no modelValue is assigned, this will not fire */
  (event: "update:modelValue", active: boolean): void
  /** Fired whenever the button is pressed. This allows receiving events even when a modelValue is not assigned. */
  (event: "activate"): void
}>();

defineSlots<{
  /** Allows configuration of the button content, which by default is simply the button icon */
  button(): VNode[];
}>();


type TimeoutType = ReturnType<typeof setTimeout>;
const tooltip = ref(false);
const longPressTimeout = ref<null | TimeoutType>(null);

// Since our colors are used in compound values like e.g. box-shadows,
// we need to directly bind to CSS variables
const cssVars = computed(() => {
  return {
    "--color": props.color,
    "--background-color": props.backgroundColor,
    "--focus-color": props.focusColor,
    "--active-color": props.activeColor,
  };
});

const buttonID = computed(() => {
  const attrs = useAttrs();
  const id = attrs['id'];
  return id ? `${id}-button`: null;
});

function updateValue() {
  emit("update:modelValue", !props.modelValue);
}

function handleAction() {
  updateValue();
  emit('activate');
}

function handleTouchStart() {
  longPressTimeout.value = setTimeout(() => {
    tooltip.value = true;
  }, props.longPressTimeMs);
}

function handleTouchEnd() {
  if (longPressTimeout.value) {
    clearTimeout(longPressTimeout.value);
    longPressTimeout.value = null;
  }
  tooltip.value = false;
}
</script>

<style lang="less">
.icon-wrapper {
  color: var(--color);
  border-color: var(--color);
  background: var(--background-color);
  padding: 6px 8px;
  border: 1px solid var(--color);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    color: var(--focus-color);
    border-color: var(--focus-color);
  }

  &.active {
    color: var(--active-color);
    border-color: var(--active-color);
  }
}
</style>
