import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig } from "vite";

const vueOptions: StorybookConfig["framework"] = {
  name: "@storybook/vue3-vite",
  options: {
    docgen: "vue-component-meta",
  },
};

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],

  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "storybook-dark-mode",
    "@storybook/addon-docs"
  ],

  staticDirs: [
    "../src/stories/assets",
  ],

  framework: vueOptions,

  docs: {
    docsMode: true,
  },

  viteFinal: async (config) => {
    return mergeConfig(config, {
    });
  }
};

export default config;
