import type { BackgroundImageset } from "./background";
import { skyBackgroundImagesets } from "./background";

import type { KeyPressInfo, KeyboardControlSettings } from "./keyboard";

import { useFullscreen } from "./composables/fullscreen";
import type { PositionCoords } from "./composables/geolocation";
import { useGeolocation } from "./composables/geolocation";
import { usePlaybackControl } from "./composables/playbackControl";
import type { WindowShape } from "./composables/windowShape";
import { useWindowShape } from "./composables/windowShape";
import { useWWTKeyboardControls } from "./composables/wwtKeyboard";

import AttentionHook from "./components/AttentionHook.vue";
import CreditLogos from "./components/CreditLogos.vue";
import DateTimePicker from "./components/DateTimePicker.vue";
import FolderView from "./components/FolderView.vue";
import FundingAcknowledgement from "./components/FundingAcknowledgement.vue";
import Gallery from "./components/Gallery.vue";
import GeolocationButton from "./components/GeolocationButton.vue";
import IconButton from "./components/IconButton.vue";
import LocationSearch from "./components/LocationSearch.vue";
import LocationSelector from "./components/LocationSelector.vue";
import PlaybackControl from "./components/PlaybackControl.vue";
import ShareButton from "./components/ShareButton.vue";
import SpeedControl from "./components/SpeedControl.vue";
import TapToInput from "./components/TapToInput.vue";
import UserExperience from "./components/UserExperience.vue";
import WwtHud from "./components/WwtHud.vue";

export type {
  BackgroundImageset,
  KeyPressInfo,
  KeyboardControlSettings,
  PositionCoords,
  WindowShape,
};

export {
  skyBackgroundImagesets,

  useGeolocation,
  useFullscreen,
  usePlaybackControl,
  useWindowShape,
  useWWTKeyboardControls,

  AttentionHook,
  CreditLogos,
  DateTimePicker,
  FolderView,
  FundingAcknowledgement,
  Gallery,
  GeolocationButton,
  IconButton,
  LocationSearch,
  LocationSelector,
  PlaybackControl,
  ShareButton,
  SpeedControl,
  TapToInput,
  UserExperience,
  WwtHud,
};

export * from "./mapbox";
export * from "./types";
export * from "./utils";
