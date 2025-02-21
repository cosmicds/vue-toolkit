<template>
  <div class="map-container"></div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
import L, { CircleMarkerOptions, LeafletMouseEvent, Map } from 'leaflet';
import "leaflet/dist/leaflet.css";
import { notify } from "@kyvg/vue3-notification";

import { useGeolocation } from "../composables/geolocation";
import { GeoJSONProp, LeafletMapOptions, LocationDeg, LocationSelectorProps, PlaceDeg } from "../types";


const defaultMapOptions: LeafletMapOptions = {
  templateUrl: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
  minZoom: 1,
  maxZoom: 20,
  subdomains: ['mt0','mt1','mt2','mt3'],
  attribution: `&copy <a href="https://www.google.com/maps">Google Maps</a>`,
  className: 'map-tiles'
};

const props = withDefaults(defineProps<LocationSelectorProps>(), {
  activatorColor: "#ffffff",
  detectLocation: true,
  modelValue: () => { return { latitudeDeg: 42.3814, longitudeDeg: -71.1281 }; }, // Harvard College Observatory
  mapOptions: () => {
    return {
      templateUrl: 'https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      minZoom: 1,
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3'],
      attribution: `&copy <a href="https://www.google.com/maps">Google Maps</a>`,
      className: 'map-tiles'
    } as LeafletMapOptions;
  },
  places: () => [],
  placeCircleOptions: () => {
    return {
      color: "#0000FF",
      fillColor: "#3333FF",
      fillOpacity: 0.5,
      radius: 150,
    } as CircleMarkerOptions;
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
  worldRadii: true,
  geoJsonFiles: () => [],
  layers: () => [],
});

const emit = defineEmits<{
  mapReady: [ready?: null],
  error: [msg: string],
  place: [place: PlaceDeg],
  "update:modelValue": [location: LocationDeg],
}>();

const placeCircles = ref<L.CircleMarker[]>([]);
const hoveredPlace = ref<PlaceDeg | null>(null);
const selectedCircle = ref<L.CircleMarker | null>(null);
const selectedPlace = ref<PlaceDeg | null>(null);
const selectedPlaceCircle = ref<L.CircleMarker | null>(null);
const map = ref<Map | null>(null);

const { geolocate, permissionGranted: geolocationPermission } = useGeolocation();

type CircleMaker = (latlng: L.LatLngExpression, options: L.CircleMarkerOptions) => L.CircleMarker;
const circleMaker = computed<CircleMaker>(() => props.worldRadii ? L.circle : L.circleMarker);
const latLng = ref<L.LatLngExpression>(locationToLatLng(props.modelValue));

watch(() => props.places, () => {
  map.value?.remove();
  setup();
});

watch(() => props.modelValue, (location: LocationDeg) => {
  latLng.value = locationToLatLng(location);
});

watch(latLng, (coords) => {
  updateCircle();
  if (map.value && !map.value.getBounds().contains(coords)) {
    map.value.setView(coords);
  } 
});

watch(selectedPlace, (newPlace) => {
  const oldSelectedCircle = selectedPlaceCircle.value;
  oldSelectedCircle?.setStyle(props.placeCircleOptions);
  if (newPlace) {
    const index = props.places.indexOf(newPlace);
    selectedPlaceCircle.value = placeCircles.value[index];
    selectedPlaceCircle.value?.setStyle(props.selectedCircleOptions);
  }
});

onMounted(() => {
  if (props.initialPlace) {
    selectedPlace.value = props.initialPlace;
  }
  if (props.detectLocation && geolocationPermission.value) {
    getLocation(true); 
  }
  setup(true);
});

function updateLocation(location: LocationDeg) {
  emit("update:modelValue", location);
}

function getLocation(startup=false) {
  geolocate()
    .then((position) => {
      updateLocation({
        longitudeDeg: position.coords.longitude,
        latitudeDeg: position.coords.latitude,
      });
      map.value?.setView([position.coords.latitude, position.coords.longitude], map.value?.getZoom());
    })
    .catch((_error) => {
      const msg = "Unable to autodetect location. Location will default to Cambridge, MA, USA, or you can\nuse the location selector to manually input a location.";
      if (startup) {
        notify({
          group: "startup-location",
          type: "error",
          text: msg,
          duration: 4500
        });
      } else {
        emit("error", msg);
      }
    });
}

function circleForLocation(location: LocationDeg, circleOptions: L.CircleMarkerOptions): L.CircleMarker {
  return circleMaker.value([location.latitudeDeg, location.longitudeDeg], circleOptions); 
}

function circleForSelection(): L.CircleMarker | null {
  if (selectedPlace.value) {
    return null;
  }
  return circleForLocation(props.modelValue, { ...props.selectedCircleOptions, interactive: false });
}

function circleForPlace(place: PlaceDeg): L.CircleMarker {
  const options = (place === selectedPlace.value) ? props.selectedCircleOptions : props.placeCircleOptions;
  const circle = circleForLocation(place, options);
  if (place.name) {
    circle.bindTooltip(place.name);
  }
  return circle;
}

function onPlaceSelect(place: PlaceDeg) {
  updateLocation({ 
    longitudeDeg: place.longitudeDeg,
    latitudeDeg: place.latitudeDeg,
  });
  emit("place", place);
  selectedPlace.value = place;
}

function onMapSelect(event: LeafletMouseEvent) {
  let longitudeDeg = event.latlng.lng + 180;
  longitudeDeg = ((longitudeDeg % 360) + 360) % 360;  // We want modulo, but JS % operator is remainder
  longitudeDeg -= 180;
  selectedPlace.value = null;
  updateLocation({
    latitudeDeg: event.latlng.lat,
    longitudeDeg,
  });
}

function setup(initial=false) {
  const mapContainer = document.querySelector(".map-container") as HTMLDivElement;
  const initialLocation = props.mapOptions.initialLocation;
  const location: L.LatLngExpression = initial && initialLocation ?
    locationToLatLng(initialLocation) :
    latLng.value;

  const initialZoom = props.mapOptions.initialZoom ?? 4;
  const zoom = initial ? initialZoom : (map.value?.getZoom() ?? initialZoom);
  const leafletMap = L.map(mapContainer).setView(location, zoom);

  const options: LeafletMapOptions = { ...defaultMapOptions, ...props.mapOptions };
  L.tileLayer(options.templateUrl, options).addTo(leafletMap);

  placeCircles.value = props.places.map((place: PlaceDeg) => circleForPlace(place));
  placeCircles.value.forEach((circle, index) => {
    const place = props.places[index];
    circle.on("mouseover", () => {
      hoveredPlace.value = place;
      circle.openTooltip([place.latitudeDeg, place.longitudeDeg]);
    });

    if (props.placeSelectable) {
      circle.on("click", () => {
        onPlaceSelect(place);
      });
    }

    circle.on("mouseout", () => {
      hoveredPlace.value = null;
    });

    circle.addTo(leafletMap);
  });

  selectedCircle.value = circleForSelection();
  selectedCircle.value?.addTo(leafletMap);

  leafletMap.doubleClickZoom.disable();
  if (props.selectable) {
    leafletMap.on(props.selectionEvent, onMapSelect);
  }
  leafletMap.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JavaScript library for interactive maps" target="_blank" rel="noopener noreferrer" >Leaflet</a>');

  props.layers.forEach((layer: L.Layer) => layer.addTo(leafletMap));
  props.geoJsonFiles.forEach((record: GeoJSONProp) => {
    const { url, geojson, style } = record;
    if (url) {
      fetch(url)
        .then(response => response.json())
        .then(data => L.geoJSON(data, { style }).addTo(leafletMap))
        .catch(error => console.error(`GeoJSON fetching error: ${error}`));
    } else if (geojson) {
      L.geoJSON(geojson, {
        style,
        pointToLayer: function (feature, latlng) {
          if (feature.properties.absoluteRadius) {
            style.radius = feature.properties.absoluteRadius;
            return L.circle(latlng, style);
          } else {
            return L.circleMarker(latlng, style);
          }
        },
        onEachFeature: function(feature, layer) {
          if (feature.properties?.popupContent) {
            layer.bindPopup(feature.properties.popupContent);
          }
        }
      }).addTo(leafletMap);
    }
  });

  map.value = leafletMap;
  emit("mapReady");
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function addLayerToMap(layer: L.Layer) {
  const leafletMap = map.value;
  if (leafletMap) {
    layer.addTo(leafletMap as Map);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function removeLayerFromMap(layer: L.Layer) {
  const leafletMap = map.value;
  if (leafletMap) {
    layer.removeFrom(leafletMap as Map);
  }
}

function updateCircle() {
  if (!map.value) { return; }
  selectedCircle.value?.remove();
  selectedCircle.value = circleForSelection();
  if (selectedCircle.value) {
    selectedCircle.value.addTo(map.value as Map);
  }
}

function locationToLatLng(location: LocationDeg): L.LatLngExpression {
  return [location.latitudeDeg, location.longitudeDeg];
}
</script>

<style>
.map-container {
  pointer-events: auto;
}
</style>
