/** Degrees -> radians conversion factor */
export const D2R = Math.PI / 180;
/** Radians -> degrees conversion factor */
export const R2D = 180 / Math.PI;

/** The base URL for the CosmicDS API server */
export const API_BASE_URL = "https://api.cosmicds.cfa.harvard.edu";

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
  *
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
  * Filter an array in place (as opposed to .filter, which creates a new array).
  * Modified from https://stackoverflow.com/a/37319954
  *
  * @param array - The array to filter
  * @param condition - The filtering condition. Elements for which this returns true are retained
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

export type UserExperienceRating = "very_bad" | "poor" | "medium" | "good" | "excellent";
export const DEFAULT_RATING_COLORS = ["red", "orange", "yellow", "lightgreen", "green"];

export interface UserExperienceSubmissionInfo {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  story_name: string;
  uuid: string;
  comments?: string;
  rating?: UserExperienceRating;
}

export async function submitUserExperienceRating(
  info: UserExperienceSubmissionInfo,
  apiKey: string,
  url?: string
): Promise<Response | null> {
  const body: UserExperienceSubmissionInfo = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    story_name: info.story_name,
    uuid: info.uuid,
  };
  if (info.comments) {
    body.comments = info.comments;
  }
  if (info.rating) {
    body.rating == info.rating;
  }
  const destination = url ?? `${API_BASE_URL}/stories/user-experience`;
  return fetch(destination, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Authorization": apiKey,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Content-Type": "application/json",
    },
  })
    .catch(error => {
      console.error(error);
      return null;
    });
}

export interface BounceAnimationProperties {
  bounceAmount: string;
  bounceDuration: number;
  betweenBouncesDuration: number;
  bounceCount: number;
}

export function createBounceKeyframes(props: BounceAnimationProperties): Keyframe[] {
  const totalDuration = props.bounceDuration + props.betweenBouncesDuration;
  const bounceFraction = props.bounceDuration / totalDuration;
  return [
    { transform: "translateY(0)", offset: 0 },
    { transform: `translateY(-${props.bounceAmount})`, offset: 0.5 * bounceFraction },
    { transform: "translateY(0)", offset: bounceFraction },
  ];
}

export function createBounceAnimation(element: HTMLElement, props: BounceAnimationProperties): Animation {
  const keyframes = createBounceKeyframes(props);
  const totalDuration = props.bounceDuration + props.betweenBouncesDuration;
  console.log(props);
  const animation = element.animate(keyframes, {
    duration: totalDuration,
    iterations: props.bounceCount
  });
  return animation;
}
