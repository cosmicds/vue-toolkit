/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import CreatingTheProject from "./CreatingTheProject.vue";
import CreateSplashScreen from "./CreateSplashScreen.vue";
import SettingUpLayers from "./SettingUpLayers.vue";
import OpacityControls from "./OpacityControls.vue";
import TopButtons from "./TopButtons.vue";
import "./docs.css";
import { defineComponent } from "vue";

const meta: Meta = {
  component: CreatingTheProject,
  title: "Documentation/Creating a Story",
};

export default meta;
type Story = StoryObj<typeof CreatingTheProject>;
type Component = ReturnType<typeof defineComponent>;

interface DocStoryOptions {
  name: string;
  component: Record<string, Component>;
}

function createDocStory(options: DocStoryOptions): Story {
  const componentName = Object.keys(options.component)[0];
  const component = options.component[componentName];
  return {
    name: options.name,
    parameters: {
      options: {
        bottomPanelHeight: 0,
        rightPanelWidth: 0,
      },
    },
    render: () => ({
      components: { [componentName]: component },
      template: `<${componentName}/>`,
    }),
  };
}

export const CreateProject = createDocStory({
  name: "Creating the Project",
  component: { CreatingTheProject },
});

export const CreateSplash = createDocStory({
  name: "Splash Screen",
  component: { CreateSplashScreen },
});

export const SetUpLayers = createDocStory({
  name: "Setting up the WWT View",
  component: { SettingUpLayers },
});

export const ImageOpacityControls = createDocStory({
  name: "Image Opacity Controls",
  component: { OpacityControls },
});

export const TopButtonSetup = createDocStory({
  name: "Convenience Buttons",
  component: { TopButtons },
});
