import { Position } from '@capacitor/geolocation';
export type PositionCoords = Position['coords'];
/**
  * A composable that encapsulates the current state of the browser
  * geolocation position and permission status.
  * @param onStartup - Whether or not to query the user's geolocation on startup.
  * @returns Reactive state describing the geolocation
  */
export declare function useGeolocation(onStartup?: boolean): {
    geolocation: import('vue').Ref<{
        latitude: number;
        longitude: number;
        accuracy: number;
        altitudeAccuracy: number | null | undefined;
        altitude: number | null;
        speed: number | null;
        heading: number | null;
    } | null, {
        latitude: number;
        longitude: number;
        accuracy: number;
        altitudeAccuracy: number | null | undefined;
        altitude: number | null;
        speed: number | null;
        heading: number | null;
    } | {
        latitude: number;
        longitude: number;
        accuracy: number;
        altitudeAccuracy: number | null | undefined;
        altitude: number | null;
        speed: number | null;
        heading: number | null;
    } | null>;
    error: import('vue').Ref<{
        readonly code: number;
        readonly message: string;
        readonly PERMISSION_DENIED: 1;
        readonly POSITION_UNAVAILABLE: 2;
        readonly TIMEOUT: 3;
    } | null, GeolocationPositionError | {
        readonly code: number;
        readonly message: string;
        readonly PERMISSION_DENIED: 1;
        readonly POSITION_UNAVAILABLE: 2;
        readonly TIMEOUT: 3;
    } | null>;
    permissions: import('vue').Ref<string, string>;
    permissionGranted: import('vue').Ref<boolean, boolean>;
    hasPermissionsAPI: import('vue').Ref<boolean, boolean>;
    handlePosition: (position: Position) => void;
    geolocate: () => Promise<Position>;
};
