<template>
  <VueDatePicker
    :style="cssVars"
    v-bind="{ ...$attrs, ...props }"
    class="mx-2 cds__date-picker"
    ref="calendar"
    :formats="{input: formatDateDisplay, preview: formatDateDisplay}"
    @open="keyboardHandlers.onOpen"
    @closed="keyboardHandlers.onClosed"
    @update-month-year="keyboardHandlers.onMonthChange"
    :ui="{ menu: `cds__date-picker-menu cds__date-picker-menu-${dark ? 'dark' : 'light'}` }"
  >
    <template #action-buttons>
      <button
        class="dp--action-button dp--action-cancel"
        type="button"
        @click="() => {
          emit('cancel');
          calendar?.closeMenu();
        }"
      >
        Cancel
      </button>
      <button
        class="dp--action-button dp--action-latest"
        @click="onLatestClicked"
        :disabled="!allowedDates"
      >
        Latest
      </button>
    </template>
  </VueDatePicker>
</template>

<script setup lang="ts">
import { VueDatePicker } from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css';
import { createCalendarPickerKeyboardHandlers } from "../calendar_picker_keyboard";
import { calendarPickerPassthroughDefaults, type CalendarPickerProps } from "../types";
import { computed, useTemplateRef } from "vue";

const calendar = useTemplateRef("calendar");
const keyboardHandlers = createCalendarPickerKeyboardHandlers(calendar);

const props = withDefaults(defineProps<CalendarPickerProps>(), {
  ...calendarPickerPassthroughDefaults,
  weekStart: 0,
  sixWeeks: true,
  timeConfig: () => ({ enableTimePicker: false }),
  teleport: true,
  arrowNavigation: true,
  inputAttrs: () => ({ clearable: false }),
});

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
  (event: "cancel"): void;
  (event: "latest", date: Date | null): void;
}>();

const cssVars = computed(() => {
  const c = props.dark ? 224 : 66;
  return {
    "--dp-border-color": `rgba(${c}, ${c}, ${c}, 1)`,
    "--dp-border-color-active": props.dark ? "white" : "black",
  };
});

function onLatestClicked() {
  const dates = props.allowedDates;
  const date = dates ? new Date(dates[dates.length - 1]) : null;
  emit("latest", date);
  keyboardHandlers.closeAfterSelection();
}

function formatDateDisplay(date: Date | null): string {  
  return date?.toLocaleDateString() || '';
}
</script>

<style scoped>
button.dp--action-latest {
  color: white;
  background: var(--dp-primary-color);
}

button.dp--action-latest[disabled] {
  background: var(--dp-disabled-color);
  color: #ccc;
  
}

.cds__date-picker {
  --dp-border-color-hover: var(--dp-border-color-active);
  --dp-border-color-focus: var(--dp-border-color-active);
}
</style>

<!-- This has to be unscoped, since we teleport the calendar component by default -->
<style lang="less">
.cds__date-picker-menu {
  border-width: 1px;
  border-style: solid;
}

.cds__date-picker-menu-light {
  border-color: rgba(66, 66, 66, 1);

  .dp--arrow-top,
  .dp--arrow-bottom {
    border-color: rgba(66, 66, 66, 1);
  }
}

.cds__date-picker-menu-dark {
  border-color: rgba(224, 224, 224, 1);

  .dp--arrow-top,
  .dp--arrow-bottom {
    border-color: rgba(224, 224, 224, 1);
  }
}
</style>
