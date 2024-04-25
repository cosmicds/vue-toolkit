import { ref, onMounted, onUnmounted, Ref } from "vue";
import screenfull from "screenfull";

/**
  * A composable that encapsulates fullscreen behavior.
  * @returns A reactive variable indicating whether or not fullscreen mode is active
  */ 
export function useFullscreen(): Ref<boolean> {
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

/** Interface describing the shape of a browser window */
export interface WindowShape {
  width: number;
  height: number;
}

/** A default `WindowShape` to use */
export const defaultWindowShape = { width: 1200, height: 900 };

/**
  * A composable that encapsulates a changing window shape.
  *
  * @returns A reactive variable describing the current window shape.
  */
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

  return windowShape;
}

