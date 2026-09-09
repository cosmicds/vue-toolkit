import { SpeedControlProps } from '../types';
declare const __VLS_export: import('vue').DefineComponent<SpeedControlProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    reset: () => any;
    "update:modelValue": (playing: boolean) => any;
    "update:reverse": (reverse: boolean) => any;
    "slow-down": (rate: number) => any;
    "speed-up": (rate: number) => any;
    "set-rate": (rate: number) => any;
}, string, import('vue').PublicProps, Readonly<SpeedControlProps> & Readonly<{
    onReset?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((playing: boolean) => any) | undefined;
    "onUpdate:reverse"?: ((reverse: boolean) => any) | undefined;
    "onSlow-down"?: ((rate: number) => any) | undefined;
    "onSpeed-up"?: ((rate: number) => any) | undefined;
    "onSet-rate"?: ((rate: number) => any) | undefined;
}>, {
    color: string;
    modelValue: boolean;
    maxSpeed: number;
    defaultRate: number;
    useInline: boolean;
    showStatus: boolean;
    rateDelta: number;
    hideMoreControls: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
