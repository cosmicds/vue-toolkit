/* eslint-disable @typescript-eslint/naming-convention */

import { ref } from "vue";
import { Meta, StoryObj } from "@storybook/vue3";
import { addStep, createTour } from "../tours";

import "./stories.css";
import "./tours.css";
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
    
    document.documentElement.style.setProperty("--cosmicds-shepherd-accent-color", "crimson");

    const tour = ref(createTour({ useModalOverlay: false }));
    const flag = ref(false);

    addStep(tour.value, {
      title: "Step 1",
      attachTo: { element: () => document.getElementById("p1"), on: "top" },
      text: "Here's the first step!",
    });

    addStep(tour.value, {
      title: "Step 2",
      attachTo: { element: () => { const el = document.getElementById("p2"); console.log(el); return el; }, on: "left" },
      text: "Here's the second step!",
    });

    addStep(tour.value, {
      title: "Step 3",
      attachTo: { element: () => document.getElementById("p3"), on: "bottom" },
      text: "We created a new element for the third step!",
      beforeShowPromise: function() {
        return new Promise<void>(resolve => {
          let p3 = document.getElementById("p3");
          if (!p3) {
            p3 = document.createElement("p");
            p3.id = "p3";
            p3.style.width = "fit-content";
            p3.innerHTML = "Item 3";
            const container = document.getElementById("items");
            container?.appendChild(p3);
          }
          resolve();
        });
      },
    });

    addStep(tour.value, {
      title: "Step 4",
      attachTo: { element: () => document.getElementById("tour-button"), on: "bottom" },
      text: "You need to click the button to advance!",
      allowNext: flag,
      beforeShowPromise: function() {
        return new Promise<void>(resolve => {
          let button = document.getElementById("tour-button");
          if (!button) {
            button = document.createElement("button");
            button.id = "tour-button";
            button.style.width = "fit-content";
            button.innerHTML = "Click the button!";
            button.onclick = () => { flag.value = true; };
            const container = document.getElementById("items");
            container?.appendChild(button);
          }
          resolve();
        });
      },

    });

    return {
      template: `
        <div class="tours-items">
          <div>
            <button @click="tour.start()">Start the tour!</button>
          </div>
          <div id="items" style="display: flex; flex-direction: column; gap: 5px;">
            <p id="p1" style="width: fit-content">Item 1</p>
            <p id="p2" style="width: fit-content">Item 2</p>
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
