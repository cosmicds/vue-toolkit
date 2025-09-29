/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { AttentionHook, submitUserExperienceRating, UserExperience, UserExperienceSubmissionInfo, API_BASE_URL } from "..";
import { ref } from "vue";
import { notify } from "@kyvg/vue3-notification";

const meta: Meta<typeof AttentionHook> = {
  component: AttentionHook,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Attention Hook",
};

export default meta;
type Story = StoryObj<typeof AttentionHook>;

export const Primary: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

const showHook = ref(true);
const showExperience = ref(false);

function submitter(info: UserExperienceSubmissionInfo, apiKey: string): Promise<Response | null> {
  return submitUserExperienceRating(info, apiKey, `${API_BASE_URL}/storybook/user-experience`);
}

function submitHandler() {
  notify({
    group: "rating-submission",
    type: "success",
    text: "Successful feedback message!",
    duration: 4500,
  });
}

export const WithUserExperience: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {

    return {
      components: { AttentionHook, UserExperience },
      template: `
        <div>
          <AttentionHook
            v-bind="args"
            v-if="showHook"
            @open="() => {
              showHook = false;
              showExperience = true;
            }"
          >
          </AttentionHook>
          <UserExperience
            v-show="showExperience" 
            style="position: absolute; bottom: 10px;"
            v-bind="args"
            @submit="submitHandler"
          >
          </UserExperience>
          <notifications group="rating-submission" position="center bottom" classes="rating-notification"/>
        </div>
      `,
      setup() {
        return {
          args,
          showHook,
          showExperience,
          submitHandler,
        };
      }
    };
  },
  args: {
    visible: true,
    bounceAmount: "10%",
    bounceDuration: 500,
    betweenBouncesDuration: 1000,
    bounceCount: Infinity,
    popupTime: 500,

    baseColor: "black",
    apiKey: process.env.VUE_APP_CDS_API_KEY,
    story: "storybook",

    // We don't need these responses, so just use the same UUID for everyone
    uuid: "42274bf4-4228-4cb0-951b-18cbce176189",
    submitter,
  }
};
