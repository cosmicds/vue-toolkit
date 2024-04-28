/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { CreditLogosProps } from "..";

import CreditLogos from "../components/CreditLogos.vue";

const meta: Meta<typeof CreditLogos> = {
  component: CreditLogos,
};

export default meta;
type Story = StoryObj<typeof CreditLogos>;

export const Primary: Story = {
  render: (args: CreditLogosProps) => ({
    components: { CreditLogos },
    template: `<CreditLogos v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
    logoSize: "1vmin" 
  }
};
