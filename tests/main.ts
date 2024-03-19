import { createApp } from "vue";

import TestContainer from "./TestContainer.vue";
import * as toolkit from "../src/index";

createApp(TestContainer, {})
.component("icon-button", toolkit.IconButton)
.component("location-selector", toolkit.LocationSelector)
.component("default-credits", toolkit.DefaultCredits)
.component("funding-acknowledgement", toolkit.FundingAcknowledgment)
.component("credit-logos", toolkit.CreditLogos)
.component("wwt-hud", toolkit.WwtHUD)
.component("gallery", toolkit.Gallery)
.mount("#app");
