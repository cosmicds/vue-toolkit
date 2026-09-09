import { MapBoxFeature } from '../mapbox';
import { SearchProvider, LocationSearchProps } from '../types';
declare const __VLS_export: import('vue').DefineComponent<LocationSearchProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    error: (message: string) => any;
    "update:modelValue": (value: boolean) => any;
    "set-location": (feature: MapBoxFeature) => any;
}, string, import('vue').PublicProps, Readonly<LocationSearchProps> & Readonly<{
    onError?: ((message: string) => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    "onSet-location"?: ((feature: MapBoxFeature) => any) | undefined;
}>, {
    small: boolean;
    modelValue: boolean;
    accentColor: string;
    bgColor: string;
    searchProvider: SearchProvider;
    stayOpen: boolean;
    buttonSize: "2xs" | "xs" | "sm" | "lg" | "xl" | "2xl" | "1x" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
