/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { AttentionHook } from "..";

const meta: Meta<typeof AttentionHook> = {
  component: AttentionHook,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Attention Hook",
};

export default meta;
type Story = StoryObj<typeof AttentionHook>;

export const Primary: Story = {
  render: (args: any) => {

    return {
      components: { AttentionHook },
      template: `
        <div>
          <AttentionHook v-bind="args">
          </AttentionHook>
        </div>
      `,
      setup() {
        return { args };
      }
    };
  },
  args: {
    visible: true,
    bounceAmount: "10%",
    bounceDuration: 500,
    betweenBouncesDuration: 1000,
    popupTime: 500,
  }
};
