<template>
  <div class="spectrum-sonifier-root">
    <Scatter
      :data="chartData"
      :options="options"
      ref="chartRef"
      @mousemove="onMove"
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
}

const props = withDefaults(defineProps<SonifierProps>(), {
  xLabel: "x",
  yLabel: "y",
});

const options = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const chartData = computed(() => {
  return {
    datasets: [{
      data: props.spectrum.map(([x, y]) => ({ x, y })),
      showLine: true,
    }],
    options: {
      events: ["mousemove"],
    },
  };
});

const chartRef = ref<ChartComponentRef>();
let oscillator: OscillatorNode | null = null;
let gainNode: GainNode | null = null;

function start() {
  const context = new (window.AudioContext || window.webkitAudioContext);
  oscillator = context.createOscillator();
  oscillator.frequency.value = 0;
  gainNode = context.createGain();
  oscillator.connect(gainNode).connect(context.destination);
  oscillator.start();
}

function playTone(wavelength: number, intensity: number) {
  console.log("playTone");
  console.log(oscillator);
  if (!oscillator || !gainNode) {
    return;
  }
  const { pitch, db } = props.sonifier(wavelength, intensity);
  gainNode.gain.value = db;
  oscillator.frequency.value = pitch;
}

const onMove = (event: MouseEvent) => {
  const chart = chartRef.value?.chart;
  if (!chart || !oscillator) {
    return;
  }

  if (event.type === "mouseout") {
    oscillator.frequency.value = 0;
    return;
  }
  if (event.type !== "mousemove") {
    return;
  }
  // clearTone();

  const points = chart.getElementsAtEventForMode(event, "nearest", {}, true);
  if (points.length) {
    const point = points[0].element;
    const positionX = chart.scales.x.getValueForPixel(point.x);
    const positionY = chart.scales.y.getValueForPixel(point.y);
    if (positionX !== undefined && positionY !== undefined) {
      playTone(positionX, positionY);
    }
  }

};

</script>


<style>
.spectrum-sonifier-root {
  width: 100%;
  height: 400px;
}
</style>
