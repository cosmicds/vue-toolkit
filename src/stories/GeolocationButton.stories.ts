/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { GeolocationButton, GeolocationButtonProps } from "..";

import "./stories.css";

const meta: Meta<typeof GeolocationButton> = {
  component: GeolocationButton,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Geolocation Button",
};

export default meta;
type Story = StoryObj<typeof GeolocationButton>;

export const Primary: Story = {
  render: (args: GeolocationButtonProps) => ({
    components: { GeolocationButton },
    template: `<GeolocationButton v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
  }
};
