import { Ref, MaybeRef } from 'vue';
import { UserExperienceRating } from '../utils';
export interface UseUserExperienceRatingOptions {
    responseOptOut?: Ref<boolean | null>;
    timeout?: number;
    questions?: string[];
    debug?: boolean;
    /** defaults to the story prefix */
    storagePrefix?: string;
    mixin?: boolean;
}
export declare function useUserExperienceRating(storyPrefix: string, uuid: MaybeRef<string>, options?: UseUserExperienceRatingOptions): {
    ratingOptOut: Ref<boolean | null, boolean | null>;
    showRating: Ref<boolean, boolean>;
    showRatingPrivacyPolicy: Ref<boolean, boolean>;
    question: Ref<string, string>;
    initializePrompt: () => Promise<void>;
    dismiss: () => void;
    optOut: () => void;
    updateUserExperienceInfo: (rating: UserExperienceRating | null, comments: string | null) => Promise<void>;
};
