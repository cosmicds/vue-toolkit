<template>
  <v-card
    class="rating-root"
    :color="color"
    :style="css"
  >
    <v-card-title>{{ question }}</v-card-title>
    <v-card-text>
      <div class="rating-icon-row">
        <template
          v-for="rating in ratings"
        >
          <slot
            :rating="rating"
          >
            <v-hover
              :key="rating"
            >
              <template #default="{ isHovering, props }: { isHovering: boolean | null, props: Record<string, unknown> }">
                <FontAwesomeIcon
                  v-bind="props"
                  :size="iconSize"
                  :class="['rating', rating, {'hovered': isHovering}, {'selected': rating === currentRating}]"
                  :icon="ratingIcons[rating as UserExperienceRating][0]"
                  :color="(isHovering || rating === currentRating) ? ratingIcons[rating as UserExperienceRating][1]: baseColor"
                  @click="currentRating = rating as UserExperienceRating"
                >
                </FontAwesomeIcon>
              </template>
            </v-hover>
          </slot>
        </template>
      </div>
      <v-expand-transition>
        <v-form
          v-show="showComments"
          @submit.prevent="emit('finish')"
        >
          <VTextarea
            v-model="comments"
            class="comments-box text-body-2"
            :placeholder="commentPlaceholder"
            auto-grow
            max-rows="4"
            density="compact"
            width="100%"
          >
          </VTextarea>
          <v-btn
            type="submit"
            width="fit-content"
            color="success"
          >
           Finish 
          </v-btn>
        </v-form>
      </v-expand-transition>
    </v-card-text>
    <notifications group="rating-submission" position="center bottom" classes="rating-notification"/>
    <template #actions>
      <slot name="footer"></slot>
    </template>
  </v-card>
</template>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/naming-convention */
import { computed, ref, watch, useSlots } from "vue";
import { useTheme } from "vuetify";
import type { UserExperienceProps } from "../types";
import { DEFAULT_RATING_COLORS, type UserExperienceRating } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrownOpen,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

import { VCard, VExpandTransition, VTextarea } from "vuetify/components";

const { current: currentTheme } = useTheme();

const props = withDefaults(defineProps<UserExperienceProps>(), {
  ratingColors: () => DEFAULT_RATING_COLORS,
  question: "How would you rate your experience?",
  commentPlaceholder: "Please tell us more if you like",
  askForComments: true,
  iconSize: "5x",
  color: "surface",
});

const emit = defineEmits<{
  (event: "comments", comments: string): void;
  (event: "rating", rating: UserExperienceRating): void;
  (event: "finish"): void;
}>();

const slots = useSlots();
const showFooter = computed(() => !!slots.footer);

const css = computed(() => ({
  "--footer-visible": showFooter.value ? "visible" : "none",
}));

library.add(faFaceGrinStars);
library.add(faFaceSmile);
library.add(faFaceMeh);
library.add(faFaceFrownOpen);
library.add(faFaceFrown);


const ratingIcons: Record<UserExperienceRating, [string, string]> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "very_bad": ["fa-face-frown", "red"],
  "poor": ["fa-face-frown-open", "orange"],
  "good": ["fa-face-smile", "lightgreen"],
  "excellent": ["fa-face-grin-stars", "green"],
};

const ratings = Object.keys(ratingIcons) as UserExperienceRating[];

const currentRating = ref<UserExperienceRating | null>(null);
const baseColor = computed(() => props.baseColor ?? (currentTheme.value.dark ? 'white' : 'black'));
const comments = ref<string | null>(null);
const showComments = ref(false);

watch(currentRating, (rating: UserExperienceRating | null) => {
  if (rating) {
    if (props.askForComments) {
      showComments.value = true; 
    }
    emit("rating", rating);
  }
});

watch(comments, (text: string | null) => {
  if (text) {
    emit("comments", text);
  }
});
</script>

<style lang="less">
.rating-root {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  padding: 5px;
}

.rating-icon-row {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 20px;
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

.comments-box {
  width: 75%;
}

.v-card-actions {
  display: var(--footer-visible);
}
</style>
