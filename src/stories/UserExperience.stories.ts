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

import { notify } from "@kyvg/vue3-notification";

function submitHandler() {
  notify({
    group: "rating-submission",
    type: "success",
    text: "Successful feedback message!",
    duration: 4500,
  });
}

export const Primary: Story = {
  render: (args: UserExperienceProps) => {

    return {
      components: { UserExperience },
      template: `
        <div>
          <UserExperience
            v-bind="args"
            @submit="submitHandler"
          />
          <notifications
            group="rating-submission"
            position="center bottom"
            classes="rating-notification"
            :max="3"
          />
        </div>
      `,
      setup() {
        return {
          args,
          submitHandler,
        };
      },
    };
  },
  args: {
    baseColor: "black",
    apiKey: process.env.VUE_APP_CDS_API_KEY,
    story: "storybook",
  }
};
