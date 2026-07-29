/* eslint-disable @typescript-eslint/naming-convention */

import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { addStep, createTour } from "../tours";

import "./stories.css";
import "../styles/tours.less";

const meta: Meta = {
  tags: ["autodocs"],
  title: "Vue Toolkit/Utilities/Tours",
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (args: any) => {
    const tour = ref(createTour());

    const flag = ref(false);

    addStep(tour.value, {
      title: "Step 1",
      attachTo: { element: document.getElementById("p1"), on: "top" },
      text: "Here's the first step!",
    });

    addStep(tour.value, {
      title: "Step 2",
      attachTo: { element: document.getElementById("p2"), on: "left" },
      text: "Here's the second step!",
    });

    addStep(tour.value, {
      title: "Step 3",
      attachTo: { element: document.getElementById("p3"), on: "bottom" },
      text: "We created a new element for the third step!",
      beforeShowPromise: function() {
        return new Promise<void>(resolve => {
          const p3 = document.createElement("p");
          p3.id = "p3";
          p3.innerHTML = "Item 3";
          const container = document.getElementById("items");
          container?.appendChild(p3);
          resolve();
        });
      },
    });

    addStep(tour.value, {
      title: "Step 4",
      attachTo: { element: document.getElementById("p4"), on: "bottom" },
      text: "You need to click the button to advance!",
      allowNext: flag,
      beforeShowPromise: function() {
        return new Promise<void>(resolve => {
          const button = document.createElement("button");
          button.innerHTML = "Click the button!";
          button.onclick = () => flag.value = true;
          const container = document.getElementById("items");
          container?.appendChild(button);
          resolve();
        });
      },

    });

    return {
      template: `
        <div style="--cosmicds-shepherd-accent-color: #1e90ff">
          <div>
            <button @click="tour.start()">Start the tour!</button>
          </div>
          <div id="items" style="display: flex; flex-direction: column">
            <p id="p1">Item 1</p>
            <p id="p2">Item 2</p>
          </div>
        </div>
      `,
      setup() {
        return { args, tour };
      },
    };
  },
  args: {
  },
};
