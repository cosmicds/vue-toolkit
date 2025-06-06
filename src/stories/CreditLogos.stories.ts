/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
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
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Smithsonian_sun_logo_no_text.svg/1024px-Smithsonian_sun_logo_no_text.svg.png",
        href: "https://www.si.edu/",
        name: "smithsonian",
      }
    ],
    defaultLogos: ["cosmicds", "wwt", "sciact"],
  }
};
