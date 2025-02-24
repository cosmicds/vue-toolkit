/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";
import { WwtHud, WwtHUDProps } from "..";

import "./stories.css";

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
        <div style="width: 1000px; height: 500px; position: relative;">
          <WwtHud v-bind="args" :store="store" />
          <WWTComponent
            :wwtNamespace="storybook"
          />
        </div>
      `,
      setup() {
        return { args, store };
      }
    };
  },
  args: {
    location: {
      top: "25%",
      left: "25%",
    },
    otherVariables: {},
    fontSize: "10pt",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    textShadow: null,
  }
};
