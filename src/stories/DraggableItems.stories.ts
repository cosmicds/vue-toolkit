/* eslint-disable @typescript-eslint/naming-convention */

import { ref, type Component } from "vue";
import { Meta, StoryObj } from "@storybook/vue3-vite";
import { DraggableItems } from "..";

import "./stories.css";
import "./draggable-items.css";

const meta: Meta<typeof DraggableItems> = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore Work around issue with generic component
  component: DraggableItems,
  tags: ["autodocs"],
  title: "Vue Toolkit/Components/Draggable Items",
};

export default meta;
type Story = StoryObj<typeof DraggableItems>;

interface DraggableItem {
  name: string;
  info: string;
}

export const Primary: Story = {
  render: (args: unknown) => {
    const items = ref<DraggableItem[]>([
      { name: "Item 1", info: "This was originally the first item" },
      { name: "Item 2", info: "This was originally the second item" },
      { name: "Item 3", info: "This was originally the third item" },
    ]);
    const name = (item: DraggableItem) => item.name;
    return {
      components: { DraggableItems: DraggableItems as Component },
      template: `
        <DraggableItems
          v-bind="args"
          v-model="items"
          :itemName="name"
          :itemKey="name"
        >
          <template #item="{ item }">
            <div class="draggable-item">
              <h3>{{ item.name }}</h3>
              <p>{{ item.info }}</p>
            </div>
          </template>
        </DraggableItems>
      `,
      setup() {
        return { args, items, name };
      },
    };
  },
  args: {
    handleClass: "drag-example-handle",
    containerClass: "drag-example-container",
    rowClass: "item-row",
    contentClass: "item-content",
    accentColor: "dodgerblue",
  },
};
