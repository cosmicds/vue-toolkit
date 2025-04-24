/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { ShareButton, ShareButtonProps } from "..";

const meta: Meta<typeof ShareButton> = {
  component: ShareButton,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ShareButton>;

export const Primary: Story = {
  render: (args: ShareButtonProps) => ({
    components: { ShareButton },
    template: `<ShareButton v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
    // In Storybook, the component is inside an iframe
    source: () => (top ?? window).location.href,
    buttonColor: "#ffffff66",
    iconColor: "#333",
    elevation: "0",
    size: "small",
    rounded: "1",
    tooltipDisabled: false,
    alert: false,
  }
};
