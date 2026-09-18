/* eslint-disable @typescript-eslint/naming-convention */
import { Meta, StoryObj } from "@storybook/vue3-vite";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";
import { BaseTourStepContent, TourSheet, useTour } from "..";

import "./stories.css";
import "./toursheet.css";

interface StepContent extends BaseTourStepContent {
  otherProperty: string;
};

const meta: Meta = {
  component: TourSheet,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Tour Sheet",
};

export default meta;
type Story = StoryObj<typeof TourSheet>;

export const Primary: Story = {
  render: (args: unknown) => {
    const store = engineStore();
    const tour = useTour<StepContent>({
      steps: [
        {
          title: "Step 1",
          text: ["Here is some info about step 1", "Something else interesting"],
          setup: async () => {
            store.gotoRADecZoom({
              raRad: 0, decRad: 0, zoomDeg: 360, instant: false,
            });
          },
          otherProperty: "something",
        },
        {
          title: "Step 2",
          text: ["Here's the relevant info for step 2!"],
          otherProperty: "something else",
        }
      ],
    });
    return {
      components: { TourSheet, WWTComponent },
      template: `
        <div style="width: 800; height: 600px; position: relative;">
          <TourSheet v-bind="args" :tour="tour" />
          <WWTComponent
            wwtNamespace="storybook"
          />
        </div>
      `,
      setup() {
        return { args, store, tour };
      },
    };
  },
  args: {
    smallSize: false,
  },
};
