/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { UserExperienceProps } from "../types";
import { UserExperience } from "..";

const meta: Meta<typeof UserExperience> = {
  component: UserExperience,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/User Experience",
};

export default meta;
type Story = StoryObj<typeof UserExperience>;

export const Primary: Story = {
  render: (args: UserExperienceProps) => ({
    components: { UserExperience },
    template: `<UserExperience v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
    baseColor: "black",
  }
};
