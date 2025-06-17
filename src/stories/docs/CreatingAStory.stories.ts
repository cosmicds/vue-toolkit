/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import CreatingTheProject from "./CreatingTheProject.vue";
import CreateSplashScreen from "./CreateSplashScreen.vue";
import SettingUpLayers from "./SettingUpLayers.vue";
import OpacityControls from "./OpacityControls.vue";
import TopButtons from "./TopButtons.vue";
import InformationalContent from "./InformationalContent.vue";
import AdditionalResources from "./AdditionalResources.vue";
import "./docs.css";

const meta: Meta = {
  component: CreatingTheProject,
  title: "Documentation/Creating a Story",
};

export default meta;
type Story = StoryObj<typeof CreatingTheProject>;

const storyParameters = {
  options: {
    bottomPanelHeight: 0,
    rightPanelWidth: 0,
  },
} as const;

export const CreateProject: Story = {
  name: "Creating the Project",
  parameters: storyParameters,
  render: () => ({
    components: { CreatingTheProject },
    template: "<CreatingTheProject/>",
  }),
};

export const CreateSplash: Story = {
  name: "Splash Screen",
  parameters: storyParameters,
  render: () => ({
    components: { CreateSplashScreen },
    template: "<CreateSplashScreen/>",
  }),
};


export const SetUpLayers: Story = {
  name: "Setting up the WWT View",
  parameters: storyParameters,
  render: () => ({
    components: { SettingUpLayers },
    template: "<SettingUpLayers/>",
  }),
};

export const ImageOpacityControls: Story = {
  name: "Image Opacity Controls",
  parameters: storyParameters,
  render: () => ({
    components: { OpacityControls },
    template: "<OpacityControls/>",
  }),
};

export const TopButtonsSetup: Story = {
  name: "Convenience Buttons",
  parameters: storyParameters,
  render: () => ({
    components: { TopButtons },
    template: "<TopButtons/>",
  }),
};

export const InformationalContentSetup: Story = {
  name: "Informational Content",
  parameters: storyParameters,
  render: () => ({
    components: { InformationalContent },
    template: "<InformationalContent/>",
  }),
};

export const Resources: Story = {
  name: "Additional Resources",
  parameters: storyParameters,
  render: () => ({
    components: { AdditionalResources },
    template: "<AdditionalResources/>",
  }),
};
