/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { SpectrumSonifier } from "..";

const meta: Meta<typeof SpectrumSonifier> = {
  component: SpectrumSonifier,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpectrumSonifier>;

export const Primary: Story = {
  render: (args: unknown) => ({
    components: { SpectrumSonifier },
    template: `<SpectrumSonifier v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
    spectrum: [[1, 1], [2, 0.5], [3, 0.7], [4, 0.2], [5, 1.7], [6, 2.8]],
    xLabel: "X Axis",
    yLabel: "Y Axis",
    sonifier: (_wavelength: number, intensity: number) => ({ pitch: intensity * 1000, db: 1 }),
  }
};
