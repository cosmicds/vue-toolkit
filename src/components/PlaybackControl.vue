<template>
  <div id="enclosing-playback-container" :style="cssVars">
    
    <!-- add a close box -->
    <div v-if="(inline && inlineButton) || showCloseButton" id="playback-close-button" @click="$emit('close')">
        <v-icon :color="color" size="18">mdi-close</v-icon>
    </div>
    
    <div v-if="!inline || inlineButton && !hidePlayButton" id="playback-play-pause-button">
      <icon-button
        :md-icon="isPaused ? 'mdi-play' : 'mdi-pause'"
        @activate="isPaused = !isPaused"
        :color="color"
        :focus-color="color"
        tooltip-text="Play/Pause"
        tooltip-location="top"
        tooltip-offset="5px"
        md-size="18"
      ></icon-button>

      <div v-if="!inline || inlineButton" id="playback-reverse-time">
        <icon-button
          @activate="reverseTime = !reverseTime"
          :md-icon="reverseTime ? 'mdi-step-forward-2' : 'mdi-step-backward-2'"
          :color="color"
          :focus-color="color"
          tooltip-text="Forward/Reverse"
          tooltip-location="top"
          tooltip-offset="5px"
          md-size="18"
        >
        </icon-button>
        <span id="reverse-button-text">{{ reverseTime ? 'Forward' : 'Reverse' }}</span>
      </div>
    </div>
    
    <div id="playback-slider-container">
      
      <div id="tick-container">
        <div v-for="val in index" :key="val" v-bind="options(val)" class="tick">
          <span class="tick-label"> {{ valueToMark(val) }} </span>
        </div>
      </div>
      
      <v-slider
        ref="slider"
        hide-details
        v-model="value"
        :max="max ?? index[index.length - 1]"
        :min="min ?? index[0]"
        :thumb-size="16"
        color="white"
        track-color="white"
        track-fill-color="white"
        thumb-color="blue"
        track-size="8"
        :step="step"
        show-ticks="always"
        :ticks="marks"
        >
      </v-slider>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { SymmetricalLogTransform } from "../symmetrical_log";
import { PlaybackControlProps } from "../types";

const props = withDefaults(defineProps<PlaybackControlProps>(), {
  modelValue: 1,
  maxPower: 3,
  paused: true,
  max: null,
  min: null,
  color: "white",
  small: false,
  inline: true,
  inlineButton: false,
  showCloseButton: false,
  hidePlayButton: false,
});

const emit = defineEmits<{
  (event: "paused", paused: boolean): void
  (event: "update:modelValue", rate: number): void
}>();

const symLog = new SymmetricalLogTransform(10);
const index = ref(symLog.sequence(props.maxPower).filter(v => v > 0));

onMounted(() => {
  const container = document.getElementById("playback-slider-container");
  if (container) {
    const input = container.querySelector(".v-slider__container");
    if (input) {
      const height = input.clientHeight;
      container.style.setProperty("--v-slider-height", `${height}px`);
    }
  }

  // Create a resize observer for enclosing-playback-container
  // that adjusts its scale relative to a certain width
  const resizeObserver = new ResizeObserver(_entries => {
    const track = document.querySelector(".v-slider-track") as HTMLElement;
    const container = document.getElementById("enclosing-playback-container") as HTMLElement;
    if (container) {
      const input = container.querySelector('.v-slider__container');
      const tickContainer = document.querySelector('#tick-container') as HTMLElement;
      
      const psc = document.querySelector('#playback-slider-container') as HTMLElement;
      if (track && container) {
        const s = track.scrollWidth;
        container.style.setProperty('--track-width', `${s}px`);
      }
      if (tickContainer && input && psc) {
        psc.style.setProperty('--v-slider-height', `${input.clientHeight}px`);
      }
      
      if (props.inline && container) {
        container.classList.add('inset');
      } else {
        container.classList.remove('inset');
      }
    }
  });

  resizeObserver.observe(document.getElementById("enclosing-playback-container")!);
});

const cssVars = computed(() => {
  return {
    color: props.color,
  };
});

const reverseTime = computed({
  get() {
    return props.modelValue < 0;
  },
  set(reverse: boolean) {
    const val = symLog.fromSymLogIndex(value.value);
    emit("update:modelValue", reverse ? -val : val);
  }
});

const value = computed({
  get() {
    return Math.abs(symLog.toSymlogIndex(props.modelValue));
  },
  set(value: number) {
    const abs = symLog.fromSymLogIndex(value);
    const sign = reverseTime.value ? -1 : 1;
    emit("update:modelValue", sign * abs);
  }
});

const isPaused = computed({
  get() {
    return props.paused;
  },
  set(pause: boolean) {
    emit("paused", pause);
  }
});

const step = computed(() => Math.abs(value.value) <= 1 ? 1 : 0.1);

const marks = computed<Record<number, string>>(() => {
  const mks: Record<number, string> = {};
  index.value.forEach((value) => {
    const pre = reverseTime.value ? -1 : 1;
    mks[value] = value === 0 ? '' : (pre * symLog.fromSymLogIndex(value)).toString();
  });
  return mks;
});

function valueToMark(value: number): string {
  if (value === 0) {
    return "Pause";
  }
  const pre = reverseTime.value ? -1 : 1;
  return `${(pre * symLog.fromSymLogIndex(value)).toString()}x`;
}

function options(value: number): { style: { left: string } } {
  const min = props.min ?? index.value[0];
  const max = props.max ?? index.value[index.value.length - 1];
  const pos = (value - min) / (max - min) * 100;
  return {
    style: {
      left: `${pos}%`,
    },
  };
}
</script>
