/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import TemplateSetup from "./TemplateSetup.vue";
import ExampleCarinaSplash from "./ExampleCarinaSplash.vue";
import "./docs.css";

const meta: Meta = {
  component: TemplateSetup,
  title: "Documentation/Creating a Story",
};

export default meta;
type Story = StoryObj<typeof TemplateSetup>;

export const Setup: Story = {
  name: "Template Setup",
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => ({
    components: { TemplateSetup },
    template: `<TemplateSetup/>`,
  }),
};

export const SplashScreen: Story = {
  name: "Example: Carina Splash Screen",
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => ({
    components: { ExampleCarinaSplash },
    template: `<ExampleCarinaSplash/>`,
  }),
};
