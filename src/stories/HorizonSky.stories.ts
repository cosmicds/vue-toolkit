/* eslint-disable @typescript-eslint/naming-convention */

import { drawHorizon, drawSky } from "../sky_overlays";
import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { Color, Grids, RenderContext,  WWTControl } from "@wwtelescope/engine";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";

import "./stories.css";

declare module "@wwtelescope/engine" {
  class Grids {
    static drawAltAzGrid(renderContext: RenderContext, opacity: number, color: Color): void;
  }
}

const meta: Meta = {
  tags: ["autodocs"],
  title: "Vue Toolkit/Utilities/Horizon & Sky",
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const store = engineStore();

    const showHorizon = ref(true);
    const showSky = ref(true);
    const showGrid = ref(true);
    return {
      components: { WWTComponent },
      template: `
        <div class="position-relative" style="width: 1000px; height: 500px; position: relative;">
          <v-card
            theme="dark"
            style="z-index: 10"
            class="position-absolute top-0 right-0 ma-4" width="200"
          >
            <v-checkbox v-model="showHorizon" label="Show Horizon" color="#01362C" />
            <v-checkbox v-model="showSky" label="Show Sky" color="#4190ED" />
            <v-checkbox v-model="showGrid" label="Show Alt/Az Grid" color="white" />
          </v-card>
          <WWTComponent
            wwtNamespace="storybook"
            style="position: absolute; top: 0; left: 0;"
          />
        </div>
      `,
      setup() {
        store.waitForReady().then(() => {
          const renderContext = WWTControl.singleton.renderContext;
          store.applySetting(["localHorizonMode", true]);
          store.addFrameCallback(() => {
            if (showSky.value) {
              drawSky(renderContext);
            }
            if (showHorizon.value) {
              drawHorizon(renderContext);
            }
            if (showGrid.value) {
              Grids.drawAltAzGrid(renderContext, 1, Color.fromName("white"));
            }
          });
        });
        return { args, store, showGrid, showHorizon, showSky };
      },
    };
  },
  args: {
  },
};
