/* eslint-disable @typescript-eslint/naming-convention */
import { Meta, StoryObj } from "@storybook/vue3-vite";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";
import { BaseTourStepContent, TourSheet, useTour } from "..";

import "./stories.css";

interface StepContent extends BaseTourStepContent {
  otherProperty: string;
};

const store = engineStore();
const tour = useTour({
  steps: [
    {
      title: "Step 1",
      text: ["Here is some info about step 1", "Something else interesting"],
      setup: async () => {
          store.gotoRADecZoom({
            raRad: 0, decRad: 0, zoomDeg: 360, instant: false,
        })
      },
    },
    {
      title: "Step 2",
      text: ["Here's the relevant info for step 2!"],
    }
  ],
});

const meta: Meta = {
  component: TourSheet,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Tour Sheet",
};

export default meta;
type Story = StoryObj<typeof TourSheet>;

export const Primary: Story = {
  render: (args: unknown) => {
    return {
      components: { WWTComponent },
      template: `
        <div style="width: 1000px; height: 500px; position: relative;">
          <TourSheet v-bind="args" />
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      `,
      setup() {
        return { args, store };
      },
    };
  },
  args: {
    tour,
    smallSize: false,
  },
};
