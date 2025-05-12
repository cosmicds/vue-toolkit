/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { FundingAcknowledgement, FundingAcknowledgementProps } from "..";

const meta: Meta<typeof FundingAcknowledgement> = {
  component: FundingAcknowledgement,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Funding Acknowledgement",
};

export default meta;
type Story = StoryObj<typeof FundingAcknowledgement>;

export const Primary: Story = {
  render: (args: FundingAcknowledgementProps) => ({
    components: { FundingAcknowledgement },
    template: `<FundingAcknowledgement v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
    color: "#E0E0E0",
    backgroundColor: "#0C3D91",
  }
};
