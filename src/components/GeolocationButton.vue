<template>
  <span :id="`geolocation-wrapper-${id}`" class="geolocation">
    <span v-if="showPermissions">Geolocation {{ permissions }} </span>
    <span v-if="showPermissions">location {{ geolocation }} </span>
    <span v-if="showPermissions">counter {{ counter }} </span>
    <v-btn 
      v-if="!hideButton"
      class="geolocation-button"
      :density="density"
      :size="size"
      :variant="geolocation ? (useTextButton ? 'tonal' : 'flat') : 'outlined'"
      :elevation="elevation"
      :loading="loading"
      :icon="useTextButton ? undefined : icon"
      :prepend-icon="useTextButton ? icon : undefined"
      :color="error ? 'red' : color"
      @click="getLocation" 
      :text="useTextButton ? label : undefined"
    />


    <span v-if="(showTextProgress || showProgressCircle) && loading && hideButton && permissionGranted">
      <v-progress-circular
        v-if="showProgressCircle"
        :size="progressCircleSize"
        :width="2"
        :color="color"
        indeterminate
      ></v-progress-circular> 
      <span v-if="showTextProgress">Fetching location</span>
    </span>

    <span v-if="(showTextProgress ) && loaded">
      <span v-if="showTextProgress"><v-icon size="small" icon="mdi-check-circle-outline"></v-icon> Using your location</span>
    </span>

    <span class="geolocation-text" v-if="showTextLabel && !useTextButton">
      <slot>
      {{ label }}
      </slot>
    </span>
    
    <span class="geolocation-coords" v-if="showCoords">
      <p>Latitude: {{ geolocation?.latitude }}</p>
      <p>Longitude: {{ geolocation?.longitude }}</p>
    </span>
    
  </span>
</template>

<script setup lang="ts">
import { useGeolocation, type PositionCoords } from "../composables/geolocation";
import { ref, computed, watch } from "vue";
import { VBtn } from "vuetify/components/VBtn";
import { VIcon } from "vuetify/components/VIcon";
import { VProgressCircular } from "vuetify/components/VProgressCircular";

import { GeolocationButtonProps } from "../types";

const props = withDefaults(defineProps<GeolocationButtonProps>(), {
  color: "white",
  size: "small",
  density: "comfortable",
  elevation: "2",
  hideButton: false,
  showTextLabel: false,
  showCoords: false,
  showTextProgress: false,
  showProgressCircle: true,
  useTextButton: false,
  progressCircleSize: 12,
  label: "My Location",
  trueIcon: "mdi-crosshairs-gps",
  falseIcon: "mdi-crosshairs",
  showPermissions: false,
});

const emit = defineEmits<{
  "permission": [permission: string],
  "geolocation": [position: PositionCoords],
  "error": [error: GeolocationPositionError]
}>();

const { geolocation, error, permissions, permissionGranted, geolocate } = useGeolocation();

const counter = ref(0);
const emitLocation = ref(true);
const icon = computed(() => geolocation.value ? props.trueIcon : props.falseIcon);
const loading = ref(false);
const loaded = ref(false);

function doGeolocation(showLoading=true) {
  if (geolocation.value) {
    emit("geolocation", geolocation.value);
    return;
  }

  loading.value = showLoading;
  geolocate()
    .then((_position) => {
      loading.value = false;
      loaded.value = true;
      setTimeout(() => {
        loaded.value = false;
      }, 5000);
    })
    .catch((_error) => {
      loading.value = false;
    });
}

function getLocation() {
  emitLocation.value = true;
  doGeolocation();
}

watch(permissions, (value) => {
  emit("permission", value);
});

watch(error, (value) => {
  if (!value) { return; }
  emit("error", value);
});

watch(geolocation, (location) => {
  if (!location) { return; }
  if (emitLocation.value) {
    // on Safari, the Permissions API is not supported, but still works
    // make sure the frontend knows the permissions were "granted"
    if (permissions.value != "granted") {
      permissions.value = "granted";
    }
    emit("geolocation", location);
  }
});
</script>

<style>
.geolocation-button {
  pointer-events: auto;
}
</style>
