import { MaybeRef, Ref } from 'vue';
/** add a counter tracker */
export interface CreateTrackingCounterOptions {
    initial?: MaybeRef<number>;
}
/**
 * This is a utility function that manages a counter that can be incremented and reset.
 * When called with no arguments the counter will start at 0.
 */
export declare function createTrackingCounter(options?: CreateTrackingCounterOptions): {
    count: Ref<number>;
    increment: (by?: number) => void;
    reset: () => void;
};
