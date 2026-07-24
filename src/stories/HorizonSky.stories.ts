/* eslint-disable @typescript-eslint/naming-convention */

import { drawHorizon, drawSky } from "../sky_overlays";
import { Meta, StoryObj } from "@storybook/vue3";
import { WWTControl } from "@wwtelescope/engine";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";

import "./stories.css";

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
    return {
      components: { WWTComponent },
      template: `
        <div style="width: 1000px; height: 500px; position: relative;">
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      `,
      setup() {
        store.waitForReady().then(() => {
          const renderContext = WWTControl.singleton.renderContext;
          store.applySetting(["localHorizonMode", true]);
          store.addFrameCallback(() => {
            drawSky(renderContext);
            drawHorizon(renderContext);
          });
        });
        return { args, store };
      },
    };
  },
  args: {
  },
};
