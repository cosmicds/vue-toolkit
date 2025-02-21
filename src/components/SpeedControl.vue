<template>
  <div id="speed-control">
    <div id="speed-buttons">
      <icon-button
        @activate="() => {
          reverseRate();
          emit('update:reverse', playbackRate < 0);
        }"
        :md-icon="playbackRate < 0 ? 'mdi-step-forward-2' : 'mdi-step-backward-2'"
        :color="color"
        :focus-color="color"
        :tooltip-text="playbackRate < 0 ? 'Play time forward' : 'Play time backwards'"
        tooltip-location="top"
        tooltip-offset="5px"
        :show-tooltip="!mobile"
        md-size="18"
      >
      </icon-button>
      
      <icon-button 
        id="play-pause-icon"
        :fa-icon="!timePlaying ? 'play' : 'pause'"
        @activate="
          () => {
            timePlaying = !timePlaying;
            emit('update:playing', timePlaying);
          }
        "
        :color="color"
        :focus-color="color"
        tooltip-text="Play/Pause"
        tooltip-location="top"
        tooltip-offset="5px"
        faSize="1x"
        :show-tooltip="!mobile"
      ></icon-button>
      
      <icon-button 
        id="slow-down"
        :fa-icon="'angles-down'"
        @activate="
          () => {
            decreaseRate();
            timePlaying = true;
            emit('slow-down', playbackRate);
          }
        "
        :color="color"
        :focus-color="color"
        :tooltip-text="`Slow down ${rateDelta}x`"
        tooltip-location="top"
        tooltip-offset="5px"
        faSize="1x"
        :show-tooltip="!mobile"
      ></icon-button>
      
      <icon-button 
        id="speed-up"
        :fa-icon="'angles-up'"
        @activate="
          () => {
            increaseRate();
            timePlaying = true;
            emit('speed-up', playbackRate);
          }
        "
        :color="color"
        :focus-color="color"
        :tooltip-text="`Speed up ${rateDelta}x`"
        tooltip-location="top"
        tooltip-offset="5px"
        faSize="1x"
        :show-tooltip="!mobile"
      ></icon-button>

      <icon-button 
        id="reset"
        :fa-icon="'rotate'"
        @activate="
          () => {
            playbackRate = defaultRate;
            timePlaying = false;
            forceRate = false;
            emit('reset');
          }
        "
        :color="color"
        :focus-color="color"
        tooltip-text="Reset"
        tooltip-location="top"
        tooltip-offset="5px"
        faSize="1x"
        :show-tooltip="!mobile"
      ></icon-button>

      <v-dialog
        v-if="!useInline"
        v-model="playbackVisible"
        :scrim="false"
        location="top"
        offset="40"
        location-strategy="connected"
        persistent
        no-click-animation
        :retain-focus="false"
      >
        <template v-slot:activator="{ props }">
          <icon-button
            id="speed-control-icon"
            @activate="
              () => {
                playbackVisible = !playbackVisible;
              }
            "
            :fa-icon="playbackVisible ? 'times' : 'gauge-high'"
            :color="color"
            :focus-color="color"
            tooltip-text="More Speed Controls"
            tooltip-location="top"
            tooltip-offset="5px"
            faSize="1x"
            :show-tooltip="!mobile"
            v-bind="props"
          ></icon-button>
        </template>
        <PlaybackControl
          class="desktop-playback-control"
          v-if="playbackVisible"
          :model-value="playbackRate"
          @update:modelValue="
            (value: number) => {
              forceRate = false;
              playbackRate = value;
              emit('set-rate', value);
            }
          "
          :paused="!timePlaying"
          @paused="(paused: boolean) => {
            timePlaying = !paused;
            emit('update:playing', !paused);
          }"
          :max-power="Math.log10(maxSpeed)"
          :max="Math.log10(maxSpeed) + 1"
          :color="color"
          :inline="false"
          show-close-button
          @close="
            () => {
              playbackVisible = false;
            }
          "
        />
      </v-dialog>
      <div v-if="useInline" id="inline-speed-control">
        <icon-button
          id="speed-control-icon"
          @activate="
            () => {
              playbackVisible = !playbackVisible;
              allowClickOutside = false; // prevent onClickOutside from hiding it.
            }
          "
          :fa-icon="playbackVisible ? 'times' : 'gauge-high'"
          :color="color"
          :focus-color="color"
          tooltip-text="Time Controls"
          tooltip-location="top"
          tooltip-offset="5px"
          faSize="1x"
          :show-tooltip="!mobile"
        ></icon-button>

        <playback-control
          class="mobile-playback-control"
          v-show="playbackVisible"
          :model-value="playbackRate"
          @update:modelValue="
            (value: number) => {
              forceRate = false;
              playbackRate = value;
              emit('set-rate', value);
            }
          "
          :paused="!timePlaying"
          @paused="timePlaying = !$event"
          :max-power="Math.log10(maxSpeed)"
          :max="Math.log10(maxSpeed) + 1"
          :color="color"
          :inline="true"
          inline-button
          v-click-outside="onClickOutside"
          @close="
            () => {
              playbackVisible = false;
            }
          "
        />
      </div>
    </div>
    
    <div v-if="showStatus" id="speed-text">{{ Math.round(playbackRate) }}x {{ timePlaying ? '' : '(Paused)'  }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';

import { usePlaybackControl } from "../composables/playbackControl";
import { supportsTouchscreen } from "../utils";
import { SpeedControlProps } from "../types";

import PlaybackControl from "./PlaybackControl.vue";

const { 
  color, 
  maxSpeed, 
  defaultRate, 
  store, 
  showStatus, 
  rateDelta, 
  useInline,
} = withDefaults(defineProps<SpeedControlProps>(),
  {
    color: 'white',
    maxSpeed: 10000,
    defaultRate: 1,
    useInline: false,
    showStatus: false,
    rateDelta: 10,
  }
);

const playing = defineModel<boolean>('playing', {default: false, required: true});
const minSpeed = 1;

const emit = defineEmits<{
  (event: "reset"): void
  (event: "update:reverse", reverse: boolean): void
  (event: "update:playing", playing: boolean): void
  (event: "slow-down", rate: number): void
  (event: "speed-up", rate: number): void
  (event: "set-rate", rate: number): void
}>();

const playbackVisible = ref(false);
const forceRate = ref(false);

const { timePlaying, clockRate, setSpeed } = usePlaybackControl(store, false);
const { smAndDown } = useDisplay();
const mobile = computed(() => smAndDown && supportsTouchscreen());

setSpeed(defaultRate);
timePlaying.value = playing.value;

watch(playing, (v) => {timePlaying.value = v;});
watch(timePlaying, (v) => {playing.value = v;});

function clamp(val: number) {
  return Math.min(Math.max(val, minSpeed), maxSpeed);
}

const playbackRate = computed({
  get: function(): number {
    if (forceRate.value) {
      const sign = Math.sign(clockRate.value);
      return sign * Math.min(10, sign * clockRate.value);
    }
    return clockRate.value;
  },
  set: function(value: number) {
    clockRate.value = Math.sign(value) * clamp(Math.abs(value));
  }
});

function reverseRate() {
  playbackRate.value = -playbackRate.value;
}

function increaseRate() {
  const sign = Math.sign(playbackRate.value);
  const abs = Math.abs(playbackRate.value);
  const newRate = abs * rateDelta;
  playbackRate.value = sign * clamp(newRate);
}
function decreaseRate() {
  const sign = Math.sign(playbackRate.value);
  const abs = Math.abs(playbackRate.value);
  const newRate = abs / rateDelta;
  playbackRate.value = sign * clamp(newRate);
}


const allowClickOutside = ref(false);
function onClickOutside() {
  if (playbackVisible.value && allowClickOutside.value) {
    playbackVisible.value = false;
    return;
  }
  allowClickOutside.value = playbackVisible.value;
}
</script>

<style lang="less">

#speed-control {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  //margin-left: 10px;

  #speed-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 600px) {
      gap: 20px;
    }

    @media (min-width: 601px) {
      gap: 10px;
    }

  }
  
  @media (orientation: landscape) {
    // margin-left: 3rem;
  }
  
  .icon-wrapper {
    padding-inline: calc(0.3 * var(--default-line-height));
    padding-block: calc(0.4 * var(--default-line-height));
    border: 2px solid var(--accent-color);
  }

}

#enclosing-playback-container.desktop-playback-control {
  --tick-font-size: 12px;
  margin-bottom: calc(2.5rem + 5px);
  padding-right: 1rem;
  
}

// account for the long 10000x text
#enclosing-playback-container.inset {
  padding-right: 1rem;
}


#inline-speed-control {
  display: flex; 
  flex-grow: 0;
  align-items: flex-end; 
  position: relative; 
  gap: 6px;

#enclosing-playback-container.mobile-playback-control {
    position: fixed;
    width: calc(90% - 1rem);
    left: calc(50% - 11px); // 9px is half the size close button
    --off: 0; //calc(50%);
    transform: translateX(-50%) translateY(var(--off)) !important;
  }

}


#speed-text {
  background-color: rgba(0, 0, 0, 0.5);
  padding-inline: 0.4em;
  border-radius: 0.3em;
  font-size: calc(1 * var(--default-font-size));
  text-wrap: nowrap;  
  width: fit-content;
  align-self: center;
}

</style>
