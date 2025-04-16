<template>
  <div
    class="spectrum-sonifier-root"
    :style="cssVars"
  >
    <Scatter
      :data="chartData"
      :options="options"
      ref="chartRef"
      @mousemove="onMove"
      @mouseout="onOut"
    ></Scatter>
    <v-btn @click="start">Start</v-btn>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import {
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import {
  ChartComponentRef,
  Scatter,
} from "vue-chartjs";
import { dbToGain } from "../sound";

ChartJS.register(LinearScale, LineElement, PointElement);

interface ToneOptions {
  pitch: number;
  db: number;
}

type Sonifier = (wavelength: number, intensity: number) => ToneOptions;

interface SonifierProps {
  spectrum: [number, number][];
  xLabel?: string;
  yLabel?: string;
  sonifier: Sonifier;
  color?: string;
  backgroundColor?: string;
}

const props = withDefaults(defineProps<SonifierProps>(), {
  xLabel: "x",
  yLabel: "y",
  color: "#ff0000",
  backgroundColor: "#ffffff",
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const chartData = computed(() => {
  const data = props.spectrum.map(([x, y]) => ({ x, y }));
  const x = data.map(p => p.x);
  const y = data.map(p => p.y);
  return {
    datasets: [{
      data,
      showLine: true,
      borderColor: props.color,
      backgroundColor: props.color,
    }],
    options: {
      events: ["mousemove", "mouseout"],
      scales: {
        x: {
          min: Math.min(...x),
          max: Math.max(...x),
        },
        y: {
          min: Math.min(...y),
          max: Math.max(...y),
        }
      }
    }
  };
});

const cssVars = computed(() => ({
  "--background-color": props.backgroundColor,
}));

const chartRef = ref<ChartComponentRef>();
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

function start() {
  const context = new (window.AudioContext || window.webkitAudioContext);
  oscillator = new OscillatorNode(context, {
    type: "triangle",
    frequency: 0,
  });
  gainNode = context.createGain();
  oscillator.connect(gainNode).connect(context.destination);
  oscillator.start();
}

function playTone(wavelength: number, intensity: number) {
  if (!oscillator || !gainNode) {
    return;
  }
  const { pitch, db } = props.sonifier(wavelength, intensity);
  console.log(db, dbToGain(db));
  gainNode.gain.value = dbToGain(db);
  oscillator.frequency.value = pitch;
}

function onOut(_event: MouseEvent) {
  const chart = chartRef.value?.chart;
  if (!chart || !oscillator) {
    return;
  }
  oscillator.frequency.value = 0;
}

function onMove(event: MouseEvent) {
  const chart = chartRef.value?.chart;
  if (!chart || !oscillator) {
    return;
  }

  if (event.type !== "mousemove") {
    return;
  }
  const points = chart.getElementsAtEventForMode(event, "nearest", { axis: "x" }, true);
  if (points.length) {
    const point = points[0].element;
    const positionX = chart.scales.x.getValueForPixel(point.x);
    const positionY = chart.scales.y.getValueForPixel(point.y);
    if (positionX !== undefined && positionY !== undefined) {
      playTone(positionX, positionY);
    }
  }

}

</script>


<style>
.spectrum-sonifier-root {
  width: 100%;
  height: 400px;

  canvas {
    background: var(--background-color);
  }
}
</style>
