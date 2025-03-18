/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryObj } from "@storybook/vue3";
import { ref } from "vue";
import { LocationSearchProps, LocationSearch, geocodingInfoForSearch, textForMapboxFeature } from "..";

import "./stories.css";

const meta: Meta<typeof LocationSearch> = {
  component: LocationSearch,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LocationSearch>;

export const Primary: Story = {
  render: (args: LocationSearchProps) => {

    const open = ref(true);
    return {
      components: { LocationSearch },
      template: `
        <div style="width: 900px; height: 400px">
          <LocationSearch
            v-bind="args"
            v-model="open"
            @set-location="(loc) => {
              $el.querySelector('#selected-location').innerHTML = textForMapboxFeature(loc);
            }"
          />
          <hr style="margin: 30px">
          <div>The last selected location is <span id="selected-location">none</span></div>
        </div>
      `,
      setup() {
        return { args, open, textForMapboxFeature };
      }
    };
  },
  args: {
    searchProvider: (searchText: string) => geocodingInfoForSearch(searchText, { access_token: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN ?? "" }),
    stayOpen: true,
    accentColor: "orange",
    bgColor: "black",
    buttonSize: "1x",
    small: false,
  }
};
