import { watch, type Ref } from "vue";

export interface CreateTrackingTimerOptions {
  active: Ref<boolean>;
}

/**
 * This is a utility function that manages the relevant state for a timer that tracks
 * when a condition is true (i.e. when a certain window or tab is open).
 * This keeps track of the amount of time that the value of the provided ref 
 * (which could also be a computed) is true
 */
export function createTrackingTimer(options: CreateTrackingTimerOptions) {

  let startTimestamp: number | null = null;
  let storedTimeMs = 0;

  watch(options.active, (active: boolean) => {
    const now = Date.now();
    if (active) {
      startTimestamp = now; 
    } else if (startTimestamp !== null) {
      storedTimeMs += (now - startTimestamp);
      startTimestamp = null;
    }
  });

  function getStartTime(): number | null {
    return startTimestamp;
  }

  function getTotalTime(): number {
    let total = storedTimeMs;
    if (options.active.value && startTimestamp !== null) {
      total += (Date.now() - startTimestamp);
    }
    return total;
  }

  function reset() {
    storedTimeMs = 0;
    startTimestamp = options.active.value ? Date.now() : null;
  }

  return {
    getStartTime,
    getTotalTime,
    reset,
  };

}
