import { PlaybackControlProps } from '../types';
declare const __VLS_export: import('vue').DefineComponent<PlaybackControlProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    "update:modelValue": (rate: number) => any;
    closed: () => any;
    paused: (paused: boolean) => any;
}, string, import('vue').PublicProps, Readonly<PlaybackControlProps> & Readonly<{
    "onUpdate:modelValue"?: ((rate: number) => any) | undefined;
    onClosed?: (() => any) | undefined;
    onPaused?: ((paused: boolean) => any) | undefined;
}>, {
    small: boolean;
    color: string;
    modelValue: number;
    min: number | null;
    max: number | null;
    maxPower: number;
    paused: boolean;
    inline: boolean;
    inlineButton: boolean;
    showCloseButton: boolean;
    hidePlayButton: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
