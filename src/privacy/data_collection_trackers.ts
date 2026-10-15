import { toRef, type MaybeRef, type Ref, toValue } from "vue";

/** add a counter tracker */
export interface CreateTrackingCounterOptions {
  initial?: MaybeRef<number>;
}
/**
 * This is a utility function that manages a counter that can be incremented and reset.
 * When called with no arguments the counter will start at 0.
 */
export function createTrackingCounter(options: CreateTrackingCounterOptions = {initial: 0}): {
  count: Ref<number>;
  increment: (by?: number) => void;
  reset: () => void;
} {
  const count = toRef(options.initial ?? 0);
  const _initial = toValue(options.initial ?? 0);
  
  function increment(by = 1) {
    count.value += by;
  }

  function reset() {
    count.value = _initial;
  }

  return { count, increment, reset };
}