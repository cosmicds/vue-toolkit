/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";
import { WwtHud, WwtHUDProps } from "..";

const meta: Meta<typeof WwtHud> = {
  component: WwtHud,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof WwtHud>;

export const Primary: Story = {
  render: (args: WwtHUDProps) => {
    const store = engineStore();
    return {
      components: { WwtHud, WWTComponent },
      template: `
        <div style="width: 300px; height: 600px">
          <WWTComponent
            :wwtNamespace="storybook"
            style="display: none"
          />
          <WwtHud v-bind="args" :store="store" />
        </div>
      `,
      setup() {
        return { args, store };
      }
    };
  },
  args: {
    location: {
      top: "50%",
      left: "50%",
    },
    offsetCenter: {
      x: 0.5,
      y: 0.5,
    },
    otherVariables: {},
    fontSize: "14pt",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textShadow: null,
  }
};
