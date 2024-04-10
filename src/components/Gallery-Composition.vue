<template>
  <div
    :class="['gallery-root', {'open': open}]">
    <div class="just-holding-events"
        @click="open = true"
        @keyup.enter="open = true"
        tabindex="0"
    >
    <slot
      name="closed"
      v-if="!open"
    >
      <div
        class="default-activator blurred"
        @click="open = true"
        @keyup.enter="open = true"
      >
        <span
          class="default-activator-title noselect"
        >
          {{ closedText }}
        </span>
        <img
          class="noselect"
          :src="places[previewIndex] ? (getImageset(places[previewIndex])?.get_thumbnailUrl() ?? '') : ''"
        />
      </div>
    </slot>
  </div>
    <div
      :style="cssVars"
      class="gallery blurred"
      v-if="open"
    >
      <div
        class="gallery-header"
      >
        <span class="gallery-title">{{ title }}</span>
        <font-awesome-icon
          class="gallery-close"
          icon="times"
          size="lg"
          @click="open = false"
          @keyup.enter="open = false"
          tabindex="0"
        ></font-awesome-icon>
      </div>
      <div
        class="gallery-content"
      >
        <div
          v-for="[index, place] of places.entries()"
          :key="index"
          :class="['gallery-item', {'selected': highlightLastOnly ? selectedPlace === place : selectedPlaces.includes(place)}]"
          @click="selectPlace(place)"
        >
          <img
            class="noselect"
            :src="getImageset(place)?.get_thumbnailUrl() ?? ''"
          />
          <span class="place-name noselect">{{ place.get_name() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onBeforeMount, toRaw } from "vue";
import { engineStore } from "@wwtelescope/engine-pinia";
import { Folder, Imageset, Place } from "@wwtelescope/engine";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
library.add(faTimes);

import { filterInPlace } from "@/utils";

export interface GalleryProps {
  wtmlUrl: string;
  columns?: number | string;
  width?: string;
  maxHeight?: string;
  title?: string;
  selectedColor?: string;
  singleSelect?: boolean;
  highlightLastOnly?: boolean;
  previewIndex?: number;
  closedText?: string;
}

const props = withDefaults(defineProps<GalleryProps>(), {
  columns: "auto-fit",
  width: "300px",
  maxHeight: "500px",
  title: "Gallery",
  selectedColor: "dodgerblue",
  singleSelect: true,
  highlightLastOnly: false,
  previewIndex: 0,
  closedText: "Image Gallery",
});

const emit = defineEmits<{
  "select": [place: Place],
  "deselect": [place: Place],
  "listAllSelected": [places: Place[]],
}>();

const store = engineStore();
const open = ref(false);
let places = reactive<Place[]>([]);
const selectedPlace = ref<Place | null>(null);
let selectedPlaces = reactive<Place[]>([]);

const cssVars = computed(() => {
  return {
    "--column-count": props.columns,
    "--selected-color": props.selectedColor,
    "--gallery-width": props.width,
    "--gallery-max-height": props.maxHeight,
  };
});

onBeforeMount(() => {
  store.waitForReady().then(async () => {
    places = await placesFromWtml(props.wtmlUrl);
  });
});

function getImageset(place: Place): Imageset | null {
  return place.get_backgroundImageset() ?? place.get_studyImageset();
}

function extractPlaces(folder: Folder): Place[] {
  let places: Place[] = [];
  for (const child of folder.get_children() ?? []) {
    if (child instanceof Place) {
      const iset = getImageset(child);
      if (iset !== null) {
        places.push(child);
      }
    } else if (child instanceof Folder) {
      places = places.concat(extractPlaces(child));
    }
  }
  return places;
}

async function placesFromWtml(wtmlUrl: string): Promise<Place[]> {
  return store.loadImageCollection({
    url: wtmlUrl,
    loadChildFolders: true
  }).then((folder) => extractPlaces(folder));
}

function selectPlace(place: Place) {
  if (props.singleSelect) {
    // if we're already selected, deselect
    if (selectedPlace.value === place) {
      emit("deselect", place);
      selectedPlaces.splice(0);
      selectedPlace.value = null;
      return;
    } else {
      selectedPlaces.forEach(p => emit("deselect", p));
      selectedPlaces = [place];
      selectedPlace.value = place;
      return;
    }
  }

  // for multi-select
  // if we're already selected, deselect
  if (selectedPlaces.includes(place)) {
    emit("deselect", place);
    selectedPlace.value = null;
    selectedPlaces.splice(selectedPlaces.indexOf(place), 1);
  } else {
    selectedPlace.value = place;
    if (props.singleSelect) {
      filterInPlace(selectedPlaces, (p) => p === place); 
    } else {
      selectedPlaces.push(place);
    }
  }

}

watch(selectedPlace, (place) => {
  if (place === null) { return; }
  emit("select", toRaw(place));
  if (props.singleSelect) {
    emit("listAllSelected", toRaw(selectedPlaces));
  }
});
</script>

<style scoped lang="less">
.gallery-root {
  transition-property: height, width;
  transition: 0.5s ease-out;

  .blurred {
    background: transparent;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(6px);
  }

  .gallery {
    border-radius: 5px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: var(--gallery-max-height);
    width: min(calc(var(--gallery-width)), calc(100%));

    // Better way to do this?
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  }

  .noselect {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .gallery-header {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .gallery-title {
    font-size: 16pt;
  }

  .gallery-close {
    position: absolute;
    right: 3px;
    cursor: pointer;
  }

  .gallery-content {
    display: grid;
    grid-template-columns: repeat(var(--column-count), minmax(100px, 1fr));
    column-gap: 10px;
    row-gap: 5px;
    padding: 5px
  }

  .default-activator {
    border-radius: 3px;
    border: solid 1px white;
    position: relative;
    height: fit-content;
    width: fit-content;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    img {
      padding: 5px;
      border-radius: 3px;
    }
  }

  .default-activator-title {
    margin: auto;
  }

  .gallery-item {
    border-radius: 3px;
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    img {
      margin-left: auto;
      margin-right: auto;
      border-radius: 3px;
      width: 96px;
      height: 45px;
      object-fit: cover;
    }

    span {
      flex-grow: 1;
      display: inline-grid;
      align-items: center;
      text-align: center;
    }
  }

  .selected {
    border: 1px solid var(--selected-color);

    span {
      color: var(--selected-color);
    }
  }

  .place-name {
    font-size: 10pt;
  }

}
</style>
