/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import { CalendarPicker, CalendarPickerProps } from "..";

import "./stories.css";

const meta: Meta<typeof CalendarPicker> = {
  component: CalendarPicker,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Calendar Picker",
};

export default meta;
type Story = StoryObj;

// Allow every date in the past year
function getDatesFromLastYear() {
  const dates = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const current = new Date(today);
  current.setFullYear(current.getFullYear() - 1);

  while (current <= today) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

export const Primary: Story = {
  render: (args: CalendarPickerProps) => {
    const date = ref(new Date());
    function handleModelChange(d: Date | null) {
      if (d !== null && date.value.getTime() !== d.getTime()) {
        date.value = d;
      }
    }
    return {
      components: { CalendarPicker },
      template: `
        <div style="display: flex; justify-content: center;">
          <CalendarPicker
            v-bind="args"
            :model-value="date"
            @latest="d => date = d"
            @internal-model-change="handleModelChange"
          />
        </div>
      `,
      setup() {
        return { args, date, handleModelChange };
      },
    };
  },
  args: {
    allowedDates: getDatesFromLastYear(),
    sixWeeks: true,
  },
};
