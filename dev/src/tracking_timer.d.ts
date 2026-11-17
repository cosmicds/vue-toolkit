import { Ref } from 'vue';
export interface CreateTrackingTimerOptions {
    active: Ref<boolean>;
}
/**
 * This is a utility function that manages the relevant state for a timer that tracks
 * when a condition is true (i.e. when a certain window or tab is open).
 * This keeps track of the amount of time that the value of the provided ref
 * (which could also be a computed) is true
 */
export declare function createTrackingTimer(options: CreateTrackingTimerOptions): {
    getStartTime: () => number | null;
    getTotalTime: () => number;
    reset: () => void;
};
