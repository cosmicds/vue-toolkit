/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { AttentionHook, UserExperience } from "..";
import { ref } from "vue";

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

console.log(process.env.VUE_APP_CDS_API_KEY);

export const WithUserExperience: Story = {
  render: (args: any) => {

    const showHook = ref(true);
    const showExperience = ref(false);
    return {
      components: { AttentionHook, UserExperience },
      template: `
        <div>
          <AttentionHook
            v-bind="args"
            v-if="showHook"
            @open="() => {
              console.log('open');
              showHook = false;
              showExperience = true;
            }"
          >
          </AttentionHook>
          <UserExperience
            v-if="showExperience" 
            style="position: absolute; bottom: 10px;"
            v-bind="args"
          >
          </UserExperience>
        </div>
      `,
      setup() {
        return {
          args,
          showHook,
          showExperience,
        };
      }
    };
  },
  args: {
    visible: true,
    bounceAmount: "10%",
    bounceDuration: 500,
    betweenBouncesDuration: 1000,
    popupTime: 500,

    baseColor: "black",
    apiKey: process.env.VUE_APP_CDS_API_KEY,
    story: "storybook",

    // We don't need these responses, so just use the same UUID for everyone
    uuid: "42274bf4-4228-4cb0-951b-18cbce176189",
  }
};
