import { defineConfig, mergeConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

import viteConfig from "./vite.config";

export default defineConfig(env => {
  const base = viteConfig(env);
  return mergeConfig(
    base,
    defineConfig({
      plugins: [
        storybookTest({ configDir: '.storybook' }),
      ],
      test: {
        browser: {
          enabled: true,
          provider: playwright(),
          instances: [
            { browser: "chromium" },
            { browser: "firefox" },
            { browser: "webkit" },
          ],
          headless: true,
        },
        exclude: [
          "**/src/stories/docs/**",
        ],
      },
    }),
  );
});
