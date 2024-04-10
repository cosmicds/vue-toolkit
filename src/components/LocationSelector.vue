<template>
  <div class="map-container"></div>
</template>

<script setup lang="ts">
import L, { LeafletMouseEvent, Map, TileLayerOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { notify } from "@kyvg/vue3-notification";
import { ref, onMounted } from "vue";

export interface LocationDeg {
  longitudeDeg: number;
  latitudeDeg: number;
}

interface MapOptions extends TileLayerOptions {
  templateUrl: string;
  initialLocation?: LocationDeg;
  initialZoom?: number;
}

interface GeoJSONProp {
  url?: string;
  geojson?: GeoJSON.FeatureCollection | GeoJSON.Feature | GeoJSON.GeometryCollection;
  style: Record<string,any>;  // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface Place extends LocationDeg { 
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  radius?: number;
  name?: string;
}

const defaultMapOptions: MapOptions = {
  templateUrl: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
  minZoom: 1,
  maxZoom: 20,
  subdomains:['mt0','mt1','mt2','mt3'],
  attribution: `&copy <a href="https://www.google.com/maps">Google Maps</a>`,
  className: 'map-tiles'
};

export interface LocationSelectorProps {
  activatorColor?: string;
  detectLocation?: boolean;
  modelValue?: LocationDeg;
  mapOptions?: MapOptions;
  initialPlace?: Place;
  places?: Place[];
  placeCircleOptions?: Record<string, any>;  // eslint-disable-line @typescript-eslint/no-explicit-any
  placeSelectable?: boolean;
  selectable?: boolean;
  selectedCircleOptions?: Record<string, any>;  // eslint-disable-line @typescript-eslint/no-explicit-any
  selectionEvent?: "click" | "dblclick";
  worldRadii?: boolean;
  geoJsonFiles?: GeoJSONProp[];
  layers?: L.Layer[];
}

const props = withDefaults(defineProps<LocationSelectorProps>(), {
  activatorColor: "#ffffff",
  detectLocation: true,
  modelValue: () => { return { latitudeDeg: 42.3814, longitudeDeg: -71.1281 }; }, // Harvard College Observatory
  mapOptions: () => defaultMapOptions,
  places: () => [],
  placeCircleOptions: () => {
    return {
      color: "#0000FF",
      fillColor: "#3333FF",
      fillOpacity: 0.5,
      radius: 150,
    };
  },
  placeSelectable: true,
  selectable: true,
  selectedCircleOptions: () => {
    return {
      color: "#FF0000",
      fillColor: "#FF0033",
      fillOpacity: 0.5,
      radius: 200,
    };
  },
  selectionEvent: "click",
  worldRadii: false,
  geoJsonFiles: () => [],
  layers: () => [],
});

const placeCircles = ref<L.CircleMarker[]>([]);
const hoveredPlace = ref<Place | null>(null);
const selectedCircle = ref<L.CircleMarker | null>(null);
const selectedPlace = ref<Place | null>(null);
const selectedPlaceCircle = ref<L.CircleMarker | null>(null);
const map = ref<Map | null>(null);


onMounted(() => {
  if (props.initialPlace) {
    selectedPlace.value = props.initialPlace;
  }
  if (props.detectLocation) {
    getLocation(true); 
  }
  setup(true);
});
</script>
