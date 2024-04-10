export const D2R = Math.PI / 180;
export const R2D = 180 / Math.PI;

export const API_BASE_URL = "https://api.cosmicds.cfa.harvard.edu";
export const MINIDS_BASE_URL = `${API_BASE_URL}/minids`;

export function supportsTouchscreen() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return ('ontouchstart' in window) || ('ontouchstart' in document.documentElement) || !!window.navigator.msPointerEnabled;
}

export function isMobile(userAgent: string): boolean {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
}

export function blurActiveElement() {
  const active = document.activeElement;
  if (active instanceof HTMLElement) {
    active.blur();
  }
}
