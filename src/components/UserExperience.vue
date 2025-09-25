<template>
  <div class="rating-root">
    <h3>How would you rate your experience?</h3>
    <div class="rating-icon-row">
      <slot
        v-for="rating in Object.keys(ratingIcons)"
        :rating="rating"
      >
        <v-hover
          :key="rating"
        >
          <template #default="{ isHovering, props }">
            <FontAwesomeIcon
              v-bind="props"
              size="5x"
              :class="['rating', rating, {'hovered': isHovering}, {'selected': rating === currentRating}]"
              :icon="ratingIcons[rating as UserExperienceRating][0]"
              :color="(isHovering || rating === currentRating) ? ratingIcons[rating as UserExperienceRating][1]: baseColor"
              @click="currentRating = rating as UserExperienceRating"
            >
            </FontAwesomeIcon>
          </template>
        </v-hover>
      </slot>
    </div>
    <VTextarea
      v-model="comments"
      class="comments-box"
      :placeholder="commentPlaceholder"
      auto-grow
      max-rows="4"
      density="compact"
      width="100%"
    >
    </VTextarea>
    <v-btn
      @click="handleRatingSubmission"
      width="fit-content"
    >
      Submit
    </v-btn>
    <notifications group="rating-submission" position="center bottom" classes="rating-notification"/>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/naming-convention */
import { computed, ref } from "vue";
import { useTheme } from "vuetify";
import { v4 } from "uuid";
import type { UserExperienceProps } from "../types";
import { DEFAULT_RATING_COLORS, type UserExperienceRating, submitUserExperienceRating } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrownOpen,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

import { VTextarea } from "vuetify/components";
import { notify } from "@kyvg/vue3-notification";

const { current: currentTheme } = useTheme();

const props = withDefaults(defineProps<UserExperienceProps>(), {
  ratingColors: () => DEFAULT_RATING_COLORS,
  commentPlaceholder: "Tell us any comments you have about this story",
});

const emit = defineEmits<{
  (event: "submit"): void;
}>();

library.add(faFaceGrinStars);
library.add(faFaceSmile);
library.add(faFaceMeh);
library.add(faFaceFrownOpen);
library.add(faFaceFrown);


const ratingIcons: Record<UserExperienceRating, [string, string]> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "very_bad": ["fa-face-frown", "red"],
  "poor": ["fa-face-frown-open", "orange"],
  "medium": ["fa-face-meh", "goldenrod"],
  "good": ["fa-face-smile", "lightgreen"],
  "excellent": ["fa-face-grin-stars", "green"],
};

const currentRating = ref<UserExperienceRating | null>(null);
const baseColor = computed(() => props.baseColor ?? (currentTheme.value.dark ? 'white' : 'black'));
const comments = ref<string | null>(null);

async function handleRatingSubmission() {
  submitUserExperienceRating({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    story_name: props.story,
    uuid: v4(),
    comments: comments.value ?? undefined,
    rating: currentRating.value ?? undefined,
  }, props.apiKey).then((response) => {
    console.log(`Response: ${response}`);
    const type = response ? "success" : "error";
    const text = response ?
      "Your feedback was submitted successfully!" :
      "There was an issue submitting your feedback";
    notify({
      group: "rating-submission",
      type,
      text,
      duration: 4500,
    });

    if (response) {
      emit("submit");
    }
  });
}
</script>

<style lang="less">
.rating-root {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.rating-icon-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.rating {
  transition: color 0.1s;
}

.selected {
  border-radius: 50%;
  box-shadow: 0 0 0 5px silver;
}

.rating-notification {
  border-radius: 5px;
  font-size: calc(1.1 * var(--default-font-size));
  padding: 1em;
  color: white;

  &.success {
    background-color: #9a009a;
  }
  &.error {
    background-color: #b30000;
  }
}
</style>
