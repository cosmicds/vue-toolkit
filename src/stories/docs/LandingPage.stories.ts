/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import LandingPage from "./landing-page.html";
import "./docs.css";

const meta: Meta = {
  title: "Documentation/Introduction",
};

export default meta;
type Story = StoryObj;

export const Introduction: Story = {
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => {
    return {
      template: `${LandingPage}`,
    };
  },
};
