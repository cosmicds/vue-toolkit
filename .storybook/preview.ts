import { setup, type Preview } from "@storybook/vue3";
import { wwtPinia } from "@wwtelescope/engine-pinia";

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Notifications from "@kyvg/vue3-notification";

const vuetify = createVuetify({
  components,
  directives
});

setup((app) => {
  app.use(wwtPinia);
  app.use(vuetify);
  app.use(Notifications);
});

const preview: Preview = {
  // TODO: This is what storybook tells us to do:
  // https://storybook.js.org/docs/writing-docs/autodocs
  // but doesn't seem to work. Why not?
  // For now, we can work around this by marking each story
  // with this tag
  // tags: ["autodocs"],
  parameters: {
    options: {
      storySort: {
        order: ["Documentation", ["Introduction", "Creating a Story"], "Components"],
      }
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
