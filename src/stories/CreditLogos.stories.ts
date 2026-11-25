/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3-vite";
import { CreditLogos, CreditLogosProps } from "..";

const meta: Meta<typeof CreditLogos> = {
  component: CreditLogos,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Credit Logos",
};

export default meta;
type Story = StoryObj<typeof CreditLogos>;

export const Primary: Story = {
  render: (args: CreditLogosProps) => ({
    components: { CreditLogos },
    template: `<CreditLogos v-bind="args" />`,
    setup() {
      return { args };
    }
  }),
  args: {
    logoSize: "5vmin",
    extraLogos: [
      {
        alt: "Smithsonian Logo",
        src: "https://www.vhv.rs/dpng/d/453-4539193_smithsonian-logo-png-transparent-png.png",
        href: "https://www.si.edu/",
        name: "smithsonian",
      }
    ],
    defaultLogos: ["cosmicds", "wwt", "sciact"],
  }
};
