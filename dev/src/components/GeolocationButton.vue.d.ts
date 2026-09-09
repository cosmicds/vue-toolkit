import { GeolocationButtonProps } from '../types';
declare var __VLS_18: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_18) => any;
};
declare const __VLS_base: import('vue').DefineComponent<GeolocationButtonProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    error: (error: GeolocationPositionError) => any;
    geolocation: (position: {
        latitude: number;
        longitude: number;
        accuracy: number;
        altitudeAccuracy: number | null | undefined;
        altitude: number | null;
        speed: number | null;
        heading: number | null;
    }) => any;
    permission: (permission: string) => any;
}, string, import('vue').PublicProps, Readonly<GeolocationButtonProps> & Readonly<{
    onError?: ((error: GeolocationPositionError) => any) | undefined;
    onGeolocation?: ((position: {
        latitude: number;
        longitude: number;
        accuracy: number;
        altitudeAccuracy: number | null | undefined;
        altitude: number | null;
        speed: number | null;
        heading: number | null;
    }) => any) | undefined;
    onPermission?: ((permission: string) => any) | undefined;
}>, {
    size: string;
    color: string;
    label: string;
    density: import('..').GeolocationButtonDensity;
    elevation: string;
    hideButton: boolean;
    showTextLabel: boolean;
    showCoords: boolean;
    showTextProgress: boolean;
    showProgressCircle: boolean;
    useTextButton: boolean;
    progressCircleSize: number;
    trueIcon: string;
    falseIcon: string;
    showPermissions: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
