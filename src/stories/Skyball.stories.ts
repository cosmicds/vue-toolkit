/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { Skyball, SkyballProps } from "..";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";

const meta: Meta<typeof Skyball> = {
  component: Skyball,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Skyball",
};

export default meta;
type Story = StoryObj<typeof Skyball>;

export const Primary: Story = {
  render: (args: SkyballProps) => {
    const store = engineStore();
    return {
      components: { Skyball, WWTComponent },
      template: `
        <div style="width: 1000px; height: 500px; position: relative;">
          <Skyball v-bind="args" />
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
    boxColor: "yellow",
    axisColor: "rgba(255, 255, 255, 0.4)",
    backgroundColor: "rgba(133, 133, 133, 0.7)",
    ellipseColor: "rgba(255, 255, 255, 0.6)",
  }
};
