/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { Gallery, GalleryProps } from "..";
import { WWTComponent } from "@wwtelescope/engine-pinia";

const meta: Meta<typeof Gallery> = {
  component: Gallery,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Gallery>;

export const Primary: Story = {
  render: (args: GalleryProps) => ({
    components: { Gallery, WWTComponent },
    template: `<div><WWTComponent :wwtNamespace="storybook" style="display: none"/><Gallery v-bind="args" /></div>`,
    setup() {
      return { args };
    },
  }),
  args: {
    wtmlUrl: "https://raw.githubusercontent.com/johnarban/wwt_interactives/main/images/m101/gallery.wtml",
    columns: 2,
    width: "500px",
    maxHeight: "500px",
    title: "Example Gallery",
    selectedColor: "#1E90FF",
    singleSelect: true,
    highlightLastOnly: true,
    previewIndex: 0,
    closedText: "Open the gallery!",
  },
};
