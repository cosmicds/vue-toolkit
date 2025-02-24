/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";
import { SpeedControlProps, SpeedControl } from "..";

import "./stories.css";

const meta: Meta<typeof SpeedControl> = {
  component: SpeedControl,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpeedControl>;

export const Primary: Story = {
  render: (args: SpeedControlProps) => {
    const store = engineStore();
    store.waitForReady().then(() => {
      store.applySetting(["localHorizonMode", true]);
    });

    return {
      components: { SpeedControl, WWTComponent },
      template: `
        <div style="width: 700px; height: 400px">
          <WWTComponent
            :wwtNamespace="storybook"
          />
          <SpeedControl v-bind="args" :store="store" />
        </div>
      `,
      setup() {
        return { args, store };
      }
    };
  },
  args: {
    color: "white",
    maxSpeed: 10000,
    defaultRate: 10,
    useInline: false,
    showStatus: false,
    rateDelta: 10,
    startPlaying: true,
  }
};
