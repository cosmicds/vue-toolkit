import { watch, type Ref } from "vue";

export interface CreateTrackingTimerOptions {
  active: Ref<boolean>;
}

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
  }

}
