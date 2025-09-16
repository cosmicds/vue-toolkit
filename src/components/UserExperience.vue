<template>
  <div>
    <h3>How would you rate your experience?</h3>
    <div class="rating-icon-row">
      <FontAwesomeIcon
        v-for="[rating, [icon, color]] of Object.entries(ratingIcons)"
        class="rating"
        :key="rating"
        :icon="icon"
        :color="color"
      >
      </FontAwesomeIcon>
    </div>
    <VTextField
      v-model="comments"
      placeholder="Tell us any comments you have about this story"
    >
    </VTextField>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrownOpen,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

import { VTextField } from "vuetify/components";

const defaultRatingColors = ["red", "orange", "yellow", "lightgreen", "green"];

interface Props {
  baseColor?: string;
  ratingColors: string[];
}
withDefaults(defineProps<Props>(), {
  baseColor: "white",
  ratingColors: defaultRatingColors,
});

library.add(faFaceGrinStars);
library.add(faFaceSmile);
library.add(faFaceMeh);
library.add(faFaceFrownOpen);
library.add(faFaceFrown);


const ratings = ["very_bad", "poor", "medium", "good", "excellent"] as const;

const ratingIcons: Record<Rating, [string, string]> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "very_bad": ["fa-face-frown", "red"],
  "poor": ["fa-face-frown-open", "orange"],
  "medium": ["fa-face-meh", "yellow"],
  "good": ["fa-face-smile", "lightgreen"],
  "excellent": ["fa-face-grin-stars", "green"],
};

const rating = ref<Rating | null>(null);
const comments = ref<string | null>(null);

function submitRating() {

}
</script>

<style lang="less">

</style>
