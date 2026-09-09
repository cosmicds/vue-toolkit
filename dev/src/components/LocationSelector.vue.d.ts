import { default as L, CircleMarkerOptions } from 'leaflet';
import { GeoJSONProp, LeafletMapOptions, LocationDeg, LocationSelectorProps, PlaceDeg } from '../types';
declare const __VLS_export: import('vue').DefineComponent<LocationSelectorProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {} & {
    error: (message: string) => any;
    place: (place: PlaceDeg) => any;
    "update:modelValue": (location: LocationDeg) => any;
    mapReady: () => any;
}, string, import('vue').PublicProps, Readonly<LocationSelectorProps> & Readonly<{
    onError?: ((message: string) => any) | undefined;
    onPlace?: ((place: PlaceDeg) => any) | undefined;
    "onUpdate:modelValue"?: ((location: LocationDeg) => any) | undefined;
    onMapReady?: (() => any) | undefined;
}>, {
    modelValue: LocationDeg;
    places: PlaceDeg[];
    selectable: boolean;
    activatorColor: string;
    detectLocation: boolean;
    mapOptions: LeafletMapOptions;
    placeCircleOptions: CircleMarkerOptions;
    placeSelectable: boolean;
    selectedCircleOptions: CircleMarkerOptions;
    selectionEvent: "click" | "dblclick";
    worldRadii: boolean;
    geoJsonFiles: GeoJSONProp[];
    layers: L.Layer[];
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
