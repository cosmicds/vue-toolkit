/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import CreatingTheProject from "./CreatingTheProject.vue";
import CreateSplashScreen from "./CreateSplashScreen.vue";
import "./docs.css";

const meta: Meta = {
  component: CreatingTheProject,
  title: "Documentation/Creating a Story",
};

export default meta;
type Story = StoryObj<typeof CreatingTheProject>;

export const CreateProject: Story = {
  name: "Creating the Project",
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => ({
    components: { CreatingTheProject },
    template: `<CreatingTheProject/>`,
  }),
};

export const CreateSplash: Story = {
  name: "Splash Screen",
  parameters: {
    options: {
      bottomPanelHeight: 0,
      rightPanelWidth: 0,
    },
  },
  render: () => ({
    components: { CreateSplashScreen },
    template: `<CreateSplashScreen/>`,
  }),
};
