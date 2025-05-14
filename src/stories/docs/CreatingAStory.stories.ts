/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import CreatingAStory from "./CreatingAStory.vue";
import "./docs.css";

const meta: Meta = {
  component: CreatingAStory,
  title: "Documentation/Creating",
};

export default meta;
type Story = StoryObj<typeof CreatingAStory>;

export const Creating: Story = {
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => ({
    components: { CreatingAStory },
    template: `<CreatingAStory/>`,
  }),
};
