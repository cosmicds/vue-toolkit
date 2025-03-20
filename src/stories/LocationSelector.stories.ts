/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { LocationSelector, LocationSelectorProps } from "..";
import { ref } from "vue";

const meta: Meta<typeof LocationSelector> = {
  component: LocationSelector,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LocationSelector>;


export const Primary: Story = {
  render: (args: LocationSelectorProps) => {

    // Default location is Harvard College Observatory
    const location = ref({
      latitudeDeg: 42.3814,
      longitudeDeg: -71.1281,
    });
    return {
      components: { LocationSelector },
      template: `
        <div style="width: 900px; height: 500px">
          <LocationSelector
            style="width: 300px; height: 400px; margin: auto;"
            v-bind="args"
            v-model="location"
          />
          <hr style="margin: 30px">
          <div style="width: 100%; text-align: center;">The last selected coordinates are latitude {{ location.latitudeDeg }}, longitude {{ location.longitudeDeg }}</div>
        `,
      setup() {
        return { args, location };
      }
    };
  },
  decorators: [
    () => {
      return { template: `<div style="display: flex; justify-content: center"><story /></div>` };
    }
  ],
  args: {
    activatorColor: "#ffffff",
    detectLocation: true,
    mapOptions: {
      templateUrl: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      minZoom: 1,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: `&copy <a href="https://www.google.com/maps">Google Maps</a>`,
      className: 'map-tiles',
    },
    places: [],
    placeCircleOptions: {
      color: "#0000FF",
      fillColor: "#3333FF",
      fillOpacity: 0.5,
      radius: 150,
    },
    placeSelectable: true,
    selectable: true,
    selectedCircleOptions: {
      color: "#FF0000",
      fillColor: "#FF0033",
      fillOpacity: 0.5,
      radius: 200,
    },
    selectionEvent: "click",
    worldRadii: true,
    geoJsonFiles: [],
    layers: [],
  }
};
