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
import { computed, ref, useAttrs } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { VIcon } from "vuetify/components/VIcon";
import { VTooltip } from "vuetify/components/VTooltip";

// We need to do this because FontAwesome doesn't export the prop types
type FontAwesomeIconProps = InstanceType<typeof FontAwesomeIcon>["$props"];
type SizeType = Extract<FontAwesomeIconProps, 'size'>;

interface IconButtonProps {
  modelValue?: boolean;
  faIcon?: string;
  mdIcon?: string;
  color?: string;
  focusColor?: string;
  backgroundColor?: string;
  boxShadow?: boolean;
  border?: boolean;
  longPressTimeMs?: number;
  tooltipText?: string;
  tooltipLocation?: string;
  tooltipOnClick?: boolean;
  tooltipOnFocus?: boolean;
  tooltipOnHover?: boolean;
  tooltipOffset?: string | number;
  showTooltip?: boolean;
  faSize?: SizeType;
  mdSize?: string;
}


const props = withDefaults(defineProps<IconButtonProps>(), {
  color: "#ffffff",
  focusColor: "#ffffff",
  backgroundColor: "#040404",
  boxShadow: true,
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
  "update:modelValue": [active: boolean],
  "activate": [activate?: null]
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
    "--active-shadow": props.boxShadow ? props.color : "transparent",
    "--focus-shadow": props.boxShadow ? props.focusColor : "transparent",
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

<style scoped lang="less">
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
    box-shadow: 0px 0px 10px 3px var(--active-shadow);

    &:focus {
      box-shadow: 0px 0px 10px 3px var(--focus-shadow);
    }
  }
}
</style>
