/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryContext, StoryObj } from "@storybook/vue3";
import { FolderView, FolderViewProps } from "..";
import { Folder, FolderUp, Place } from "@wwtelescope/engine";
import { Thumbnail } from "@wwtelescope/engine-types";
import { engineStore, WWTComponent } from "@wwtelescope/engine-pinia";

import "./stories.css";

interface LoadedData {
  loaded: {
    folder: Folder;
  }
}

const meta: Meta<typeof FolderView> = {
  component: FolderView,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Folder View",
};

export default meta;
type Story = StoryObj<typeof FolderView>;
type Context = StoryContext<LoadedData>;


export const Primary: Story = {
  render: (args: FolderViewProps, _context: Context) => {
    const store = engineStore();
    return {
      components: { FolderView, WWTComponent },
      template: `
        <div style="width: 1000px; height: 500px; position: relative;">
          <div style="height: fit-content;">
            <FolderView
              v-bind="args"
              @select="({ item, type }) => { if (item instanceof Place) { store.gotoTarget({ place: item }); } }"
            />
          </div>
          <WWTComponent
            :wwtNamespace="storybook"
          />
        </div>
      `, 
      setup() {
        return { args, store, Place };
      }
    };
  },
  args: {
    orientation: "row",
    gap: "10px",
    backgroundColor: "black",
    thumbnailColor: "black",
    highlightColor: "dodgerblue",
    textColor: "white",
    startExpanded: true,
    lazy: true,
    filter: (item: Thumbnail) => item instanceof Place || item instanceof Folder || item instanceof FolderUp,
    rootUrl: "https://cdn.worldwidetelescope.org/wwtweb/catalog.aspx?W=explorerootweb",
  }
};
