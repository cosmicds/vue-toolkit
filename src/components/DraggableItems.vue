<template>
  <draggable
    v-model="items"
    :class="['draggable-container', containerClass ?? '']"
    handle=".drag-handle"
    :item-key="(item: T) => itemKey(item)"
    :style="cssVars"
  >
    <template #item="{ element }">
      <div
        :class="['draggable-row', rowClass ?? '']"
      >
        <div
          :class="['drag-handle', handleClass ?? '']"
          role="button"
          tabindex="0"
          :data-layer-grip="itemKey(element)"
          :aria-label="`Reorder ${itemName(element)}`"
          @keydown="onGripKeydown($event, element)"
        >
          <slot
            name="handle"
            :item="element"
          >
            <FontAwesomeIcon
              :color="accentColor"
              icon="fa-grip-vertical"
            />
          </slot>
        </div>
        <div
          :class="['draggable-item-wrapper', contentClass ?? '']"
        >
          <slot
            name="item"
            :item="element"
          />
        </div>
      </div>
    </template>
  </draggable>
</template>

<script setup lang="ts" generic="T">
import { computed, nextTick, type VNode } from "vue";
import draggable from "vuedraggable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { DraggableItemsProps } from "../types";

library.add(faGripVertical);

const items = defineModel<T[]>({
  required: true,
});

const emit = defineEmits<{
  (event: "change", order: T[]): void;
}>();

defineSlots<{
  handle?(props: { item: T }): VNode[];
  item(props: { item: T }): VNode[];
}>();

const props = withDefaults(defineProps<DraggableItemsProps<T>>(), {
  handleClass: null,
  containerClass: null,
  contentClass: null,
  rowClass: null,
  accentColor: "black",
});

const cssVars = computed(() => ({
  "--accent-color": props.accentColor,
}));

// Reordering by keyboard. Up/Down move the focused layer one place in the list,
// the same thing dragging its grip does, and go through the same displayOrder
// setter so the map layer order follows.
//
// Focus has to be handed back by hand: reordering re-renders the list and the
// grip the user was holding is destroyed, which would drop focus to <body>
// after a single press and make repeated arrows impossible. data-layer-grip is
// how we find the new element for the layer that just moved.
function moveLayer(item: T, delta: number) {
  const order = items.value.slice();
  const from = order.indexOf(item);
  const to = from + delta;
  if (from < 0 || to < 0 || to >= order.length) {
    return;
  }
  order.splice(to, 0, ...order.splice(from, 1));
  items.value = order;
  emit("change", items.value);
  console.log(props.itemKey(item));
  nextTick(() => {
    document.querySelector<HTMLElement>(`[data-layer-grip="${props.itemKey(item)}"]`)?.focus();
  });
}

function onGripKeydown(event: KeyboardEvent, item: T) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveLayer(item, -1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveLayer(item, 1);
  }
}
</script>

<style scoped lang="less">
.drag-handle {
  /* A Font Awesome icon takes its size from font-size, and at the 20pt this
     used to carry, the grip drew 23x27 -- much bigger than the mdi-menu it
     replaced, which was held down by size="x-small". The handle is sized by
     its glyph, so this figure sets the width of the grip column too: 17px is
     20% up from the 14px it was, widening the column by the same 20%. */
  font-size: 17px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  /* The handle is the first thing in the row, so its left edge sat 14px from
     the inside of the card and the focus ring, which wants 17px, spilled past
     it. Shrinking the glyph alone does not help -- that moves the right edge,
     not the left -- so the handle is nudged inwards to make the room. */
  margin-left: 5px;
}

.drag-handle:hover {
  cursor: grab;
}

.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.draggable-row {
  border: 1px solid var(--accent-color);
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}

.draggable-item-wrapper {
  margin: 0;
  padding: 0;
  border-left: 1px solid var(--accent-color);
}
</style>
