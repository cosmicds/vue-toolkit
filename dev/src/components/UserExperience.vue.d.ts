import { UserExperienceRating } from '../utils';
declare var __VLS_35: {
    rating: UserExperienceRating;
}, __VLS_77: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_35) => any;
} & {
    footer?: (props: typeof __VLS_77) => any;
};
declare const __VLS_base: import('vue').DefineComponent<{
    askForComments?: boolean;
    question?: string;
    commentPlaceholder?: string;
    baseColor?: string;
    ratingColors?: string[];
    iconSize?: import('..').FontAwesomeIconSize;
    color?: string;
}, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    rating: (rating: UserExperienceRating | null) => any;
    finish: (rating: UserExperienceRating | null, comments: string | null) => any;
    dismiss: (rating: UserExperienceRating | null, comments: string | null) => any;
}, string, import('vue').PublicProps, Readonly<{
    askForComments?: boolean;
    question?: string;
    commentPlaceholder?: string;
    baseColor?: string;
    ratingColors?: string[];
    iconSize?: import('..').FontAwesomeIconSize;
    color?: string;
}> & Readonly<{
    onRating?: ((rating: UserExperienceRating | null) => any) | undefined;
    onFinish?: ((rating: UserExperienceRating | null, comments: string | null) => any) | undefined;
    onDismiss?: ((rating: UserExperienceRating | null, comments: string | null) => any) | undefined;
}>, {
    color: string;
    question: string;
    askForComments: boolean;
    commentPlaceholder: string;
    ratingColors: string[];
    iconSize: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
