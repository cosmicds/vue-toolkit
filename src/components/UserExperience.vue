<template>
  <v-card
    class="rating-root"
    :color="color"
    :style="css"
  >
    <template #title>
      <div class="rating-title">
        <span>{{ question }}</span>
        <v-spacer></v-spacer>
        <v-btn
          density="compact"
          class="close-button"
          icon="mdi-close"
          @click="$emit('dismiss', currentRating, comments)"
        ></v-btn>
      </div>
    </template>
    <v-card-text>
      <v-form
        @submit.prevent="$emit('finish', currentRating, comments)"
      >
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
                  <font-awesome-icon
                    v-bind="props"
                    :size="iconSize"
                    :class="['rating', rating, {'hovered': isHovering}, {'selected': rating === currentRating}]"
                    :icon="ratingIcons[rating][0]"
                    :color="(isHovering || rating === currentRating) ? ratingIcons[rating][1]: baseColor"
                    @click="currentRating = rating"
                  >
                  </font-awesome-icon>
                </template>
              </v-hover>
            </slot>
          </template>
        </div>
        <v-expand-transition>
          <v-textarea
            v-if="showComments"
            v-model="comments"
            class="comments-box text-body-2"
            :placeholder="commentPlaceholder"
            auto-grow
            max-rows="4"
            density="compact"
            width="100%"
            @keydown.stop
          >
          </v-textarea>
        </v-expand-transition>
        <v-expand-transition>
          <v-btn
            v-if="currentRating || showComments"
            type="submit"
            width="fit-content"
            color="success"
          >
            Submit 
          </v-btn>
      </v-expand-transition>
      </v-form>
    </v-card-text>
    <template #actions>
      <slot name="footer"></slot>
    </template>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { MiniDSBase } from "..";
import { DEFAULT_RATING_COLORS, type UserExperienceRating } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { VTextarea, VExpandTransition, VCard, VForm, VSpacer, VCardText, VBtn, VHover } from "vuetify/components";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFaceGrinStars,
  faFaceSmile,
  faFaceMeh,
  faFaceFrownOpen,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";

library.add(faFaceGrinStars);
library.add(faFaceSmile);
library.add(faFaceMeh);
library.add(faFaceFrownOpen);
library.add(faFaceFrown);


export default defineComponent({
  extends: MiniDSBase,

  components: {
    'font-awesome-icon': FontAwesomeIcon,
    'v-textarea': VTextarea,
    'v-expand-transition': VExpandTransition,
    'v-form': VForm,
    'v-card': VCard,
    'v-spacer': VSpacer,
    'v-card-text': VCardText,
    'v-btn': VBtn,
    'v-hover': VHover,
  },

  props: {
    ratingColors: {
      type: Array as PropType<string[]>,
      default: () => DEFAULT_RATING_COLORS,
    },
    question: {
      type: String,
      default: "How would you rate your experience?",
    },
    commentPlaceholder: {
      type: String,
      default: "Please tell us more if you like",
    },
    askForComments: {
      type: Boolean,
      default: true,
    },
    iconSize: {
      type: String,
      default: "5x",
    },
    color: {
      type: String,
      default: "surface",
    },
    baseColor: {
      type: String,
      required: true,
    }
  },

  data() {
    const ratingIcons: Record<UserExperienceRating, [string, string]> = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "very_bad": ["fa-face-frown", "red"],
      "poor": ["fa-face-frown-open", "orange"],
      "good": ["fa-face-smile", "lightgreen"],
      "excellent": ["fa-face-grin-stars", "green"],
    };
    return {
      currentRating: null as UserExperienceRating | null,
      comments: null as string | null,
      showComments: false,
      ratings: Object.keys(ratingIcons) as UserExperienceRating[],
      ratingIcons,
    };
  },

  computed: {
    showFooter() {
      return !!this.$slots.footer;
    },
    css() {
      return {
        "--footer-visible": this.showFooter ? "visible" : "none",
      };
    }
  },

  watch: {
    currentRating(rating: UserExperienceRating | null) {
      if (rating) {
        if (this.askForComments) {
          this.showComments = true;
        }
        this.$emit("rating", rating);
      }
    }
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
  justify-content: center;
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

.close-button {
  display: inline;
}

.v-card-text {
  width: 100%;
}

.close-button {
  position: absolute;
  top: 5px;
  right: 5px;
}

.rating-title {
  padding: 5px 10px;
}
</style>
