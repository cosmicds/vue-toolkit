import type { StorybookConfig } from "@storybook/vue3-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.module?.rules?.push({
      test: /\.less/,
      sideEffects: true,
      use: ["style-loader", "css-loader", "less-loader"],
    });
    config.module?.rules?.push({
      test: /\.md/,
      use: ["markdown-loader"]
    });

    // Remove existing mdx rule if any (but should be none)
    // config.module?.rules = config.module?.rules?.filter((f) => f && f != false && f?.test?.toString() !== '/\\.mdx$/')

    // config.module?.rules?.push({
    //   test: /\.mdx$/,
    //   use: ['@mdx-js/loader'],
    // });
    return config;
  },
};
export default config;
