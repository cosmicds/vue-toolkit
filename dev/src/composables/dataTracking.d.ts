export interface DataTrackingOptions {
    optOutKey: string;
    userIDKey: string;
    apiUrl?: string;
    storyPath: string;
    resetData: () => void;
    getData: () => Record<string, unknown>;
    updateIntervalMs?: number;
}
/**
 * A composable that encapsulates the general behavior needed for data tracking.
 * All the story that needs to use this has to do is provide functions for:
 * - Obtaining the current tracking data based on its state
 * - Resetting the tracking data
 * This composable will handle all of the server requests
 */
export declare function useDataTracking(options: DataTrackingOptions): {
    responseOptOut: import('vue').Ref<boolean | null, boolean | null>;
    userID: string;
    createUserEntry: () => Promise<void>;
    updateUserData: () => void;
    visibilityChangeListener: () => void;
    updateInterval: number | null;
};
