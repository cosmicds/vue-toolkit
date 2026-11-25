import type { StorybookConfig } from "@storybook/vue3-vite";
import { mergeConfig, type PluginOption } from "vite";

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
    { from: "../src/stories/assets", to: "/assets" },
  ],

  framework: vueOptions,

  viteFinal: async (config) => {
    // The library build externalizes vuedraggable; Storybook needs it bundled
    config.plugins = ((config.plugins ?? []) as PluginOption[])
      .flat(Infinity)
      .filter((p) => !(p && typeof p === "object" && "name" in p && /esm-external-require/.test(p.name)));

    return mergeConfig(config, {
      resolve: {
        conditions: [
          "import",
          "module",
          "browser",
          "development",
          "production",
        ],
      },
    });
  }
};

export default config;
