/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import CreatingAStory from "./creating-a-story.html";
import "./docs.css";

const meta: Meta = {
  title: "Documentation/Creating",
};

export default meta;
type Story = StoryObj;

export const Creating: Story = {
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => {
    return {
      template: `${CreatingAStory}`,
    };
  },
};
