import CDSPrivacyPolicy from "./CDSPrivacyPolicy.vue";
import DataCollectionOptOutCard from "./DataCollectionOptOutCard.vue";
import DataCollectionOptOutFooter from "./DataCollectionOptOutFooter.vue";
import { useCounter, useElapsedTime } from "./useDataCollection";
import { useUserExperienceRating, type UseUserExperienceRatingOptions } from "./useUserExperienceRating";

export {
  CDSPrivacyPolicy,
  DataCollectionOptOutCard,
  DataCollectionOptOutFooter,

  useCounter,
  useElapsedTime,
  useUserExperienceRating,
  UseUserExperienceRatingOptions,
};

export * from "./types";
