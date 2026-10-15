import { ref, type Ref } from "vue";
import { createTrackingTimer } from "../tracking_timer";

/** add a counter tracker */
export function useCounter(initial = 0) {
  const count = ref(initial);

  function increment(by = 1) {
    count.value += by;
  }

  function reset() {
    count.value = initial;
  }

  return { count, increment, reset };
}

/**
 * Total time `isActive` has been true
 */
export function useElapsedTime(isActive: Ref<boolean>) {
  return createTrackingTimer({ active: isActive });
}
