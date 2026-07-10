/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { GeolocationButton, GeolocationButtonProps, PositionCoords } from "..";

import "./stories.css";

const meta: Meta<typeof GeolocationButton> = {
  component: GeolocationButton,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Geolocation Button",
};

export default meta;
type Story = StoryObj<typeof GeolocationButton>;

export const Primary: Story = {
  render: (args: GeolocationButtonProps) => {

    const geolocation = ref<PositionCoords | null>(null);
    const permission = ref<string | null>(null);
    return {
      components: { GeolocationButton },
      template: `
        <div style="width: 900px; height: 500px; display: flex; flex-direction: column; gap: 10px;">
          <div>
            <GeolocationButton
              v-bind="args"
              @permission="perm => permission = perm"
              @geolocation="location => geolocation = location"
              @error="error => alert(error)"
            />
          </div>
          <div v-if="permission != null">Permission: {{ permission }}</div>
          <div v-if="geolocation != null">
            <p><strong>Location</strong></p>
            <p>Longitude: {{ geolocation.longitude }}</p>
            <p>Latitude: {{ geolocation.latitude }}</p>
            <p>Accuracy: {{ geolocation.accuracy }}</p>
          </div>
        </div>
      `,
      setup() {
        return { args, geolocation, permission };
      }
    };
  },
  args: {
    color: "black",
    size: "medium",
    density: "comfortable",
    elevation: "2",
    hideButton: false,
    showTextLabel: false,
    showCoords: false,
    showTextProgress: false,
    showProgressCircle: true,
    useTextButton: false,
    progressCircleSize: 12,
    label: "My Location",
    id: "geolocation-button",
    trueIcon: "mdi-crosshairs-gps",
    falseIcon: "mdi-crosshairs",
    showPermissions: false,
  }
};
