/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { IconButtonProps } from "../types";
import { IconButton } from "..";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";

import "./stories.css";

library.add(faBookOpen);

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Icon Button",
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  render: (args: IconButtonProps) => ({
    components: { IconButton },
    template: `<IconButton v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  decorators: [
    () => {
      return { template: `<div style="width: 50px"><story /></div>` };
    }
  ],
  args: {
    modelValue: false,
    icon: "book-open",
    color: "white",
    focusColor: "red",
    activeColor: "green",
    backgroundColor: "#040404",
    border: true,
    longPressTimeMs: 500,
    tooltipText: "Tooltip",
    tooltipLocation: "start",
    tooltipOnClick: false,
    tooltipOnFocus: false,
    tooltipOnHover: true,
    showTooltip: true,
    size: "lg",
    disabled: false,
  }
};
