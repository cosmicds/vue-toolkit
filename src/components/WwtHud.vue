<template>
  <div :style="cssVars">
    <div 
      id="wwt-hud"
    >
      <h3>Camera settings</h3>
      <p>RA: {{ raRad }} ({{ raDeg }})</p>
      <p>Dec: {{ decRad }} ({{ decDeg }})</p>
      <p>Roll: {{ rollRad }}</p>
      <p>Zoom: {{ zoomDeg }}</p>
      <p>Mode: {{ mode }}</p>
      <h3>Imagesets</h3>
      <p>Bkg: {{ bkgImage }}</p>
      <p>Fg: {{ fgImg }} (op: {{ foregroundOpacity }})</p>
      <h3>Clock</h3>
      <p>Time: {{ currentTime }}</p>
      <p>Rate: {{ clockRate }}</p>
      <p>Location: {{ wwtLocation }}</p>
      
      <h3 v-if="Object.keys(otherVariables).length > 0"> 
        User defined vars 
      </h3>
      <!-- loop over otherVariable keys -->
      <p v-for="(value, key) in otherVariables" :key="key">
        {{ key }}: {{ value }}
      </p>
      
      <!-- a default slot for whatever -->
      <slot v-bind="props"></slot>
      
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { computed, type VNode } from "vue";
import { Settings } from "@wwtelescope/engine";
import { storeToRefs } from "pinia";

import { WwtHUDProps } from "../types";


const R2D = 180 / Math.PI;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const wwtSettings = computed(() => Settings.get_active());

const props = withDefaults(defineProps<WwtHUDProps>(), {
  location: () => { return { top: "50%", left: "50%" }; },
  offsetCenter: () => { return { x: 0.5, y: 0.5 }; },
  otherVariables: () => { return {}; },
  fontSize: "1em",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  textShadow: "0 0 5px black",
});

defineSlots<{
  /** A slot for displaying extra WWT content below the default HUD content. This slot has access to all of the component props (including the WWT store). */ 
  default(props: WwtHUDProps): VNode[];
}>();

/*
* I really don't care for passing the store as a prop,
* but without just calling `engineStore` (or even `engineStore(wwtPinia)`),
* we were getting a different store instance than in the using downstream app.
* Note that if this component is placed directly in the downstream app package,
* everything worked exactly as expected, so this some sort of Pinia configuration issue.
* This works, so until I figure out the "right" approach, we'll just do this.
*/
const {
  raRad,
  decRad,
  rollRad,
  zoomDeg,
  currentTime,
  clockRate,
  foregroundOpacity,
  backgroundImageset,
  foregroundImageset,
} = storeToRefs(props.store);

const cssVars = computed(() => {
  return {
    "--hud-top": props.location.top ?? "auto",
    "--hud-left": props.location.left ?? "auto",
    "--hud-bottom": props.location.bottom ?? "auto",
    "--hud-right": props.location.right ?? "auto",
    "--font-size": props.fontSize,
    "--background-color": props.backgroundColor || "transparent",
    "--text-shadow": props.textShadow || "none",
    "--offset-center-x": `-${props.offsetCenter.x * 100}%`,
    "--offset-center-y": `-${props.offsetCenter.y * 100}%`,
  };
});

const raDeg = computed(() => raRad.value * R2D);
const decDeg = computed(() => decRad.value * R2D);
const bkgImage = computed(() => backgroundImageset.value?.get_name());
const fgImg = computed(() => foregroundImageset.value?.get_name());
const mode = computed(() => {
  if (bkgImage.value === "3D Solar System View") {
    return "3D";
  }
  if (wwtSettings.value.get_galacticMode()) {
    return "Sky (galactic)";
  }
  if (wwtSettings.value.get_localHorizonMode()) {
    return "Sky (local horizon)";
  }
  return "Sky (equatorial)";
});

const wwtLocation = computed(() => {
  return {
    lat: wwtSettings.value.get_locationLat(),
    lon: wwtSettings.value.get_locationLng(),
    alt: wwtSettings.value.get_locationAltitude(),
  };
});
</script>

<style lang="less">
#wwt-hud {
  position: absolute;
  top: var(--hud-top);
  left: var(--hud-left);
  bottom: var(--hud-bottom);
  right: var(--hud-right);
  padding: 0.5em;
  transform: translate(var(--offset-center-x), var(--offset-center-y));
  color: white;
  font-size: var(--font-size);
  font-family: monospace;
  text-align: center;
  text-shadow: var(--text-shadow);
  pointer-events: auto;
  text-align: left;
  background-color: var(--background-color);
}
</style>
