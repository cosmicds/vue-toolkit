import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.vue"],
    }),
    viteStaticCopy({
      targets: [{ src: "src/assets/*", dest: "assets" }],
    }),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      }
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueToolkit",
      fileName: (format) => `vue-toolkit.${format}.js`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["vue", "pinia", "@wwtelescope/engine"],
      output: {
        globals: {
          vue: "Vue",
          pinia: "pinia",
          "@wwtelescope/engine": "wwtlib",
        },
      },
    },
    sourcemap: "inline",
  },
});
