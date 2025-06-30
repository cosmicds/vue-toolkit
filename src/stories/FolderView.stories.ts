/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryContext, StoryObj } from "@storybook/vue3";
import { FolderView, FolderViewProps } from "..";
import { Folder } from "@wwtelescope/engine";
import { WWTComponent } from "@wwtelescope/engine-pinia";

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
    return {
      components: { FolderView, WWTComponent },
      template: `
        <div style="width: 1000px; height: 500px; position: relative;">
          <div style="height: fit-content;">
            <FolderView v-bind="args" />
          </div>
          <WWTComponent
            :wwtNamespace="storybook"
          />
        </div>
      `, 
      setup() {
        return { args };
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
    rootUrl: "https://cdn.worldwidetelescope.org/wwtweb/catalog.aspx?W=explorerootweb",
  }
};
