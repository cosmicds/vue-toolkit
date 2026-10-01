/* eslint-disable @typescript-eslint/naming-convention */
import { Meta, StoryObj } from "@storybook/vue3-vite";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";
import { BaseTourStepContent, D2R, TourSheet, useTour } from "..";

import "./stories.css";
import "./toursheet.css";

interface StepContent extends BaseTourStepContent {
  otherProperty: string;
};

const meta: Meta<typeof TourSheet> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Work around issue with generic component
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
          id: "andromeda",
          title: "Andromeda Galaxy",
          text: ["Here is the Andromeda Galaxy", "It's the closest galaxy to the Milky Way!"],
          setup: async () => {
            store.waitForReady().then(() => {
              store.gotoRADecZoom({
                raRad: 10.68471 * D2R, decRad: 41.26917 * D2R, zoomDeg: 10, instant: true,
              });
            });
          },
          otherProperty: "andromeda",
        },
        {
          id: "crab",
          title: "Crab Nebula",
          text: ["Here's the Crab Nebula!"],
          setup: async () => {
            store.waitForReady().then(() => {
              store.gotoRADecZoom({
                raRad: 83.6331 * D2R, decRad: 22.0145 * D2R, zoomDeg: 1, instant: true,
              });
            });
          },
          otherProperty: "crab",
        },
        {
          id: "milky-way",
          title: "Milky Way",
          text: ["Here's the Milky Way", "That's where we live!"],
          setup: async () => {
            store.waitForReady().then(() => {
              store.gotoRADecZoom({
                raRad: 266.416833 * D2R, decRad: -29.007806 * D2R, zoomDeg: 360, instant: true,
              });
            });
          },
          otherProperty: "milky way",
        },
        {
          id: "end",
          title: "The End",
          text: ["That's all folks!"],
          otherProperty: "end",
        }
      ],
    });
    return {
      components: { TourSheet, WWTComponent },
      template: `
        <div style="width: 800; height: 600px; position: relative;">
          <TourSheet
            v-bind="args" 
            :tour="tour" 
          />
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
    accentColor: "#b22222",
    borderColor: "gray",
  },
};
