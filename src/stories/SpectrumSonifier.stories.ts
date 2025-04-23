/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { SpectrumSonifier } from "..";
import spectrum from "./spectrum";

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
    spectrum,
    xLabel: "X Axis",
    yLabel: "Y Axis",
    sonifier: (_wavelength: number, intensity: number) => ({ pitch: intensity * 10, db: 5 + (intensity / 10) }),
  }
};
