export const D2R = Math.PI / 180;
export const R2D = 180 / Math.PI;

export const API_BASE_URL = "https://api.cosmicds.cfa.harvard.edu";
export const MINIDS_BASE_URL = `${API_BASE_URL}/minids`;

/**
  * Determine whether the user's device supports touch events.
  *
  * @returns Whether touch events are supported
  */
export function supportsTouchscreen(): boolean {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ('ontouchstart' in window) || ('ontouchstart' in document.documentElement) || !!window.navigator.msPointerEnabled;
}

/**
  * Determine whether a given user agent string describes a mobile device.
  * This is done via a regex match against common user agent string pieces.
  * @returns Whether the user agent string describes a mobile device
  */
export function isMobile(userAgent: string): boolean {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
}

/** Blur the current active element, if there is one */
export function blurActiveElement() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) {
    active.blur();
  }
}

/**
  * Filter an array in place (as opposed to .filter, which creates a new array)
  * Modified from https://stackoverflow.com/a/37319954
  * @param{T[]} array - The array to filter
  * @param{(t: T) => boolean} condition - The filtering condition. Elements for which this returns true are retained
  * @template T
  */
export function filterInPlace<T>(array: T[], condition: (t: T) => boolean) {
  let i = 0;
  let j = 0;
  while (i < array.length) {
    const value = array[i];
    if (condition(value)) {
      array[j++] = value;
      i++;
    }
  }

  array.length = j;
}
