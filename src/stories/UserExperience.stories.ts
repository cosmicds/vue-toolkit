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

export const Primary: Story = {
  render: (args: UserExperienceProps) => {

    function submitHandler(response: boolean) {
      console.log(`Handler: ${response}`);
      const type = response ? "success" : "error";
      const text = response ?
        "Your feedback was submitted successfully!" :
        "There was an issue submitting your feedback";
      console.log(notify);
      notify({
        group: "rating-submission",
        type,
        text,
        duration: 4500,
      });
    }

    return {
      components: { UserExperience },
      template: `
        <div>
          <UserExperience
            v-bind="args"
            @submit="submitHandler"
          />
          <notifications group="rating-submission" position="center bottom" classes="rating-notification"/>
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
