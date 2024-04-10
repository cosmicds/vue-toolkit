import { ref, onMounted, onUnmounted, Ref } from "vue";
import screenfull from "screenfull";

import { Capacitor } from '@capacitor/core';
import { Geolocation, PermissionStatus as CapacitorPermissionStatus, Position, PositionOptions } from "@capacitor/geolocation";

export function useScreenfull(): Ref<boolean> {
  const fullscreenModeActive = ref(false);
  function update(_event: Event) {
    fullscreenModeActive.value = screenfull.isFullscreen;
  }

  onMounted(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", update);
    }
  });

  onUnmounted(() => {
    if (screenfull.isEnabled) {
      screenfull.off("change", update);
    }
  });

  return fullscreenModeActive;
}

export interface WindowShape {
  width: number;
  height: number;
}
export const defaultWindowShape = { width: 1200, height: 900 };
export function useWindowShape() {
  const windowShape = ref<WindowShape>(defaultWindowShape);
  const resizeObserver = new ResizeObserver(_entries => update());

  function update(_event?: Event) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > 0 && height > 0) {
      windowShape.value = { width, height };
    } else {
      windowShape.value = defaultWindowShape;
    }
  }

  onMounted(() => {
    update();
    resizeObserver.observe(document.body);
  });

  onUnmounted(() => {
    resizeObserver.unobserve(document.body);
  });

  return { windowShape, resizeObserver };
}

export type PositionCoords = Position['coords'];
function useGeolocation() {

  const geolocation = ref<PositionCoords | null>(null);
  const error = ref<GeolocationPositionError | null>(null);
  const permissions = ref<string>("");
  const permissionGranted = ref(false);

  function handleNotSupported() {
    
  }

  function handleCapacitorPermission(result: CapacitorPermissionStatus) {
    if (result.location === "granted" || result.coarseLocation === "granted") {
      permissionGranted.value = true;
    }
    // TODO: This isn't correct yet
    permissions.value = result.location;
  }

  function handleNavigatorPermission(result: PermissionStatus) {
    if (result.state === "granted") {
      permissionGranted.value = true;
    }
    permissions.value = result.state;
  }

  function handlePosition(position: Position) {
    geolocation.value = position.coords;
    error.value = null;
  }

  function handleGeolocationError(err: GeolocationPositionError) {
    if (permissions.value === "prompt") {
      const url = "https://www.lifewire.com/turn-on-mobile-location-services-4156232";
      error.value = {
        code: 1,
        message: `Location access was denied. Try enabling location services for your browser in system settings. (This feature might not work on Safari on some iPhones). <a href="${url}" target="_blank" rel="noopener noreferrer">Help</a>`,
      } as GeolocationPositionError;
    } else {
      error.value = err;
    }
  }

}
