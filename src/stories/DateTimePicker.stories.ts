/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { DateTimePickerProps } from "../types";
import { DateTimePicker } from "..";
import { ref } from "vue";

const meta: Meta<typeof DateTimePicker> = {
  component: DateTimePicker,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Datetime Picker",
};

export default meta;
type Story = StoryObj<typeof DateTimePicker>;

export const Primary: Story = {
  render: (args: DateTimePickerProps) => {

    const date = ref(new Date());
    return {
      components: { DateTimePicker },
      template: `
        <div style="width: 900px; height: 400px">
          <DateTimePicker
            v-bind="args"
            v-model="date"
          />
          <hr style="margin: 30px">
          <div>The currently selected time is <span id="current-datetime">{{ date.toLocaleString() }}</span></div>
        </div>
      `,
      setup() {
        return { args, date };
      }
    };
  },
  args: {
    debug: false,
    useAmPm: true,
    editableTime: true,
    accentColor: "#f4ba3e",
  }
};
