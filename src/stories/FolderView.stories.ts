/* eslint-disable @typescript-eslint/naming-convention */

import { Meta, StoryContext, StoryObj } from "@storybook/vue3";
import { FolderView, FolderViewProps } from "..";
import { Folder } from "@wwtelescope/engine";
import { engineStore } from "@wwtelescope/engine-pinia";

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

const store = engineStore();

export const Primary: Story = {
  loaders: [
    async() => ({
      folder: await store.loadImageCollection({
        url: "https://data1.wwtassets.org/packages/2022/07_jwst/smacs0723/jwst_smacs0723.wtml",
        loadChildFolders: false,
      })
    })
  ],
  render: async (args: FolderViewProps, context: Context) => {
    return {
      components: { FolderView },
      template: `<FolderView v-bind="args" :root-folder="folder" />`, 
      setup() {
        return { args, folder: context.loaded.folder };
      }
    };
  },
  args: {
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "black",
    thumbnailColor: "black",
    highlightColor: "dodgerblue",
    textColor: "white",
    startExpanded: true,
  }
};
