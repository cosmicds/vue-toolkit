import { createApp } from "vue";

import TestContainer from "./TestContainer.vue";
import * as toolkit from "./src/index";
import { wwtPinia } from "@wwtelescope/engine-pinia";

import { aliases, mdi } from "vuetify/iconsets/mdi";
import { createVuetify } from "vuetify";
import { en } from "vuetify/locale";
import "vuetify/styles";

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: { en },
  },
  theme: {
    defaultTheme: 'dark',
  },
});

createApp(TestContainer, {})
  .use(wwtPinia)
  .use(vuetify)
  .component("icon-button", toolkit.IconButton)
  .component("location-selector", toolkit.LocationSelector)
  .component("default-credits", toolkit.DefaultCredits)
  .component("funding-acknowledgement", toolkit.FundingAcknowledgment)
  .component("credit-logos", toolkit.CreditLogos)
  .component("wwt-hud", toolkit.WwtHUD)
  .component("gallery", toolkit.Gallery)
  .mount("#app");
