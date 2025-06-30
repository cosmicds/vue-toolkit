<template>
  <nav
    class="fv-root"
    v-if="items !== null"
    :style="cssVars"
    aria-role="navigation"
    aria-label="Folder View"
  >
    <div
      class="fv-header-container"
    >
      <slot
        name="header"
        :expanded="expanded"
        :toggle-expanded="toggleExpanded"
      ></slot>
    </div>
    <div
      v-show="expanded"
      class="fv-content"
    >
      <div
        v-for="(item, index) of items"
        :key="index"
      >
        <slot
          name="item"
          :item="item"
          :last-selected-item="lastSelectedItem"
          :select-item="selectItem"
        >
          <div
            :class="['fv-item', lastSelectedItem === item ? 'selected' : '']"
            :key="item.get_name()"
            :title="item.get_name()"
            @click="() => selectItem(item, 'click')"
            @dblclick="() => selectItem(item, 'dblclick')"
            @keydown.enter="() => selectItem(item, 'keyup')"
            tabindex="0"
            role="button"
            :aria-label="item.get_name()"
            :aria-selected="lastSelectedItem === item"
          >
            <img :src="item.get_thumbnailUrl() ?? defaultThumbnail" :alt="item.get_name()" />
            <div class="fv-item-name">
              {{item.get_name()}}
            </div>
          </div>
        </slot>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref } from "vue";
import { Folder, FolderUp } from "@wwtelescope/engine";
import { Thumbnail } from "@wwtelescope/engine-types";
import { FolderViewProps, ItemSelectionType } from "../types";
import { engineStore } from "@wwtelescope/engine-pinia";

const items: Ref<Thumbnail[] | null> = ref<Thumbnail[]>([]);
const lastSelectedItem: Ref<Thumbnail | null> = ref(null);


const props = withDefaults(defineProps<FolderViewProps>(), {
  gap: "5px",
  highlightColor: "#1671e0",
  thumbnailColor: "white",
  backgroundColor: "black",
  textColor: "white",
  startExpanded: true,
  selectFirst: true,
  lazy: true,
  defaultThumbnail: "https://web.wwtassets.org/engine/assets/thumb_star.jpg",
});

if (!(props.rootFolder || props.rootUrl)) {
  throw new Error("Either one of rootFolder or rootUrl must be specified!");
}

const store = engineStore();
const folder = ref<Folder | null>(null);
let currentFolder: Folder | null = null;

if (props.rootFolder != null) {
  folder.value = props.rootFolder; 
} else if (props.rootUrl != null) {
  const url = props.rootUrl;
  store.waitForReady().then(() => {
    store.loadImageCollection({ url, loadChildFolders: !props.lazy })
      .then(loadedFolder => {
        folder.value = loadedFolder;
      });
  });
}

const emit = defineEmits<{
  (event: "select", data: { item: Thumbnail, type: ItemSelectionType }): void;
}>();

const expanded = ref(props.startExpanded);
function toggleExpanded() {
  expanded.value = !expanded.value;
}

function updateFolder(folder: Folder) {
  const children = folder.get_children() ?? [];
  items.value = props.filter ? children.filter(props.filter) : children;
  currentFolder = folder;
  const firstItem = items.value.find((item) => (!(item instanceof Folder) || (item instanceof FolderUp)));
  if (props.selectFirst && firstItem) {
    selectItem(firstItem, "folder");
  }
}

function selectItem(item: Thumbnail, type: ItemSelectionType) {
  lastSelectedItem.value = item;
  if (props.lazy && item instanceof Folder) {
    store.loadImageCollection({
      url: item.get_url(),
      loadChildFolders: !props.lazy,
    }).then(loadedFolder => {
      const up = new FolderUp();
      if (currentFolder) {
        up.parent = currentFolder;
      }
      currentFolder = loadedFolder;
      items.value = ([up] as Thumbnail[]).concat(loadedFolder.get_children() ?? []);
    });
  } else if (item instanceof FolderUp) {
    currentFolder = item.parent;
    items.value = item.get_children();
  }

  emit("select", { item, type });
}

onMounted(() => {
  if (folder.value) {
    updateFolder(folder.value);
  }
});

watch(() => props.rootFolder, (propFolder: Folder | undefined) => {
  if (propFolder != undefined) {
    folder.value = propFolder;
  }
});

watch(() => props.rootUrl, async (url: string | undefined) => {
  if (url != undefined) {
    folder.value = await store.loadImageCollection({ url, loadChildFolders: false });
  }
});

watch(folder, (newFolder: Folder | null) => {
  console.log(newFolder);
  if (newFolder != null) {
    updateFolder(newFolder);
  }
});

const cssVars = computed(() => ({
  "--flex-direction": props.flexDirection,
  "--background-color": props.backgroundColor,
  "--thumbnail-color": props.thumbnailColor,
  "--highlight-color": props.highlightColor,
  "--text-color": props.textColor,
  "--gap": props.gap,
}));
</script>

<style scoped lang="less">
.fv-root {
  width: auto;
	height: 100%;
  overflow-x: auto;
  overflow-y: auto;
  background: var(--background-color);

	&::-webkit-scrollbar {
    padding: 1px;
    height: 3px;
		width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.07);
  }

  &::-webkit-scrollbar-thumb {
    background: #1671e0;
    border-radius: 10px;
  }	
}

.fv-header-container {
  pointer-events: auto;
  padding: 5px;
  user-select: none;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
}

.fv-content {
  margin: auto;
  display: flex;
  flex-direction: var(--flex-direction);
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);

  &::after {
    content: "";
    height: 0px;
  }
}

.fv-item {
  padding: 1px;
  border: 1px solid #444;
  background: var(--thumbnail-color);
  border-radius: 2px;
  width: ~"min(100px, 22vw)";
  height: 100%;
  color: var(--text-color);
  cursor: pointer;
  pointer-events: auto;
  font-size: 10pt;
  flex-grow: 1;

  & img {
    width: 100%;
    height: ~"min(45px, 10.3vw)";
    object-fit: cover;
    border-radius: 2px;
  }
	
	&:hover {
		border: 2px solid var(--highlight-color);
		transition: all 200ms ease-out;
  }

  &.selected {
    border: 2px solid var(--highlight-color);
  }
}

.fv-item-name {
  color: var(--text-color);
  width: 100%;
  line-height: 1;
  padding-left: 2px;
}
</style>
