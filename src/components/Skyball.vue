<template>
  <div 
    ref="skyball"
    class="skyball"
    :style="cssVars"
  >
    <div class="v-ellipse"></div>
    <div class="h-ellipse"></div>
    <div class="x-axis"></div>
    <div class="y-axis"></div>
    <canvas
      class="skyball-canvas"
      :width="width"
      :height="height"
    >
    </canvas>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/naming-convention */
declare module "@wwtelescope/engine" {
  class Coordinates {
    constructor(ra: number, dec: number);
    get_RA(): number;
    set_RA(ra: number): void;
    get_dec(): number;
    set_dec(dec: number): void;
    get_lat(): number;
    set_lat(lat: number): void;
    get_lng(): number;
    set_lng(lng: number): void;
    get_alt(): number;
    set_alt(alt: number): void;
    get_az(): number;
    set_az(az: number): void;
  }
}
import { computed, onMounted, ref, watch } from "vue";
import { D2R } from "@wwtelescope/astro";
import { Coordinates, WWTControl } from "@wwtelescope/engine";
import { engineStore } from "@wwtelescope/engine-pinia";
import { storeToRefs } from "pinia";
import { SkyballProps } from "../types";

interface Point {
  x: number;
  y: number;
}

const store = engineStore();
const { raRad, decRad, zoomDeg, rollRad } = storeToRefs(store);

const props = withDefaults(defineProps<SkyballProps>(), {
  width: 300,
  height: 300,
  boxColor: "yellow",
  axisColor: "rgba(255, 255, 255, 0.4)",
  backgroundColor: "rgba(133, 133, 133, 0.7)",
  ellipseColor: "rgba(255, 255, 255, 0.6)",
});

const skyball = ref<HTMLElement | null>(null);
let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D;

onMounted(() => {
  if (skyball.value == null) {
    return;
  }
  canvas = skyball.value.querySelector(".skyball-canvas") as HTMLCanvasElement;
  canvas.height = props.height;
  canvas.width = props.width;
  canvas.style.height = `${props.height}px`;
  canvas.style.width = `${props.width}px`;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    context = ctx;
    store.waitForReady().then(update);
  }
});

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const sphereSize = canvas.height;
  const radius = sphereSize / 2;
  const factor = 0.5;
  const pointSize = factor * sphereSize;
  const centerF = { x: pointSize, y: pointSize };
  const center = { x: pointSize, y: pointSize };

  const points: Point[] = [];
  let z = 0;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const wwtCanvas = WWTControl.singleton.canvas as HTMLCanvasElement;
  const coordinates = [
    store.findRADecForScreenPoint({ x: 0, y : 0 }), 
    store.findRADecForScreenPoint({ x: wwtCanvas.width, y : 0 }), 
    store.findRADecForScreenPoint({ x: wwtCanvas.width, y : wwtCanvas.height }), 
    store.findRADecForScreenPoint({ x: 0, y : wwtCanvas.height }), 
  ];
  coordinates.forEach(coord => {
    const corner = new Coordinates((coord.ra - 180) * D2R, coord.dec * D2R);
    const ptX = centerF.x - (Math.cos((corner.get_RA() + 6) / 12 * Math.PI) * Math.cos(corner.get_lat() * D2R) * radius);
    const ptY = centerF.y - (Math.sin(corner.get_lat() * D2R) * radius);
    const point = { x: ptX, y: ptY };
    points.push(point);
    z += (Math.sin((corner.get_RA() + 6) / 12 * Math.PI) * Math.cos(corner.get_lat() * D2R) * radius);

    context.beginPath();
    context.lineWidth = 1;
    context.moveTo(center.x, center.y);
    context.lineTo(point.x, point.y);
    context.closePath();
    context.stroke();
  });

  context.beginPath();
  context.lineWidth = 1;
  context.strokeStyle  = props.boxColor;
  context.moveTo(points[0].x, points[0].y);
  points.slice(1).forEach(point => {
    context.lineTo(point.x, point.y);
  });
  context.closePath();
  const opacity = z > 0 ? 0.9 : 0.5;
  context.fillStyle = `rgba(from ${props.boxColor} r g b / ${opacity})`;
  context.fill();
  context.stroke();
}

const cssVars = computed(() => ({
  "--width": `${props.width}px`,
  "--height": `${props.height}px`,
  "--axis-color": props.axisColor,
  "--background-color": props.backgroundColor,
  "--ellipse-color": props.ellipseColor,
}));

watch(() => [raRad.value, decRad.value, zoomDeg.value, rollRad.value], (_values: number[]) => {
  if (context) {
    update();
  }
});

watch(() => props.boxColor, (_color: string) => update());
</script>

<style lang="less">
.wwtelescope-component canvas {
  height: 500px;
  width: 1000px;
}

.skyball {
  margin: 2px auto;
  position: relative;
  height: var(--height);
  width: var(--width);
  border: solid 1px var(--ellipse-color);
  border-radius: 50%;
  background-color: var(--background-color);

  .v-ellipse {
    position: absolute;
    top: 0px;
    left: 41%;
    height: 100%;
    width: 21%;
    border: solid 1px var(--ellipse-color);
    border-radius: 50%;
  }

  .h-ellipse {
    position: absolute;
    left: 0px;
    top: 41%;
    width: 100%;
    height: 21%;
    border: solid 1px var(--ellipse-color);
    border-radius: 50%;
  }

  .x-axis {
    position: absolute;
    border-bottom: solid 1px var(--axis-color);
    height: 0;
    width: 100%;
    top: 50%;
    left: -1px;
  }

  .y-axis {
    position: absolute;
    border-right: solid 1px var(--axis-color);
    width: 0;
    height: 100%;
    left: 50%;
    top: -1px;
  }
}
</style>
