/** Degrees -> radians conversion factor */
export declare const D2R: number;
/** Radians -> degrees conversion factor */
export declare const R2D: number;
/** The base URL for the CosmicDS API server */
export declare const API_BASE_URL = "https://api.cosmicds.cfa.harvard.edu";
/**
  * Determine whether the user's device supports touch events.
  *
  * @returns Whether touch events are supported
  */
export declare function supportsTouchscreen(): boolean;
/**
  * Determine whether a given user agent string describes a mobile device.
  * This is done via a regex match against common user agent string pieces.
  *
  * @returns Whether the user agent string describes a mobile device
  */
export declare function isMobile(userAgent: string): boolean;
/** Blur the current active element, if there is one */
export declare function blurActiveElement(): void;
/**
  * Filter an array in place (as opposed to .filter, which creates a new array).
  * Modified from https://stackoverflow.com/a/37319954
  *
  * @param array The array to filter
  * @param condition The filtering condition. Elements for which this returns true are retained
  * @template T
  */
export declare function filterInPlace<T>(array: T[], condition: (t: T) => boolean): void;
/**
  * Determine whether a given WebGL major version is supported.
  *
  * @param version The WebGL major version
  * @returns Whether the specified WebGL version is enabled on the current browser
  */
export declare function isWebGLEnabled(version?: 1 | 2): boolean;
export type UserExperienceRating = "very_bad" | "poor" | "good" | "excellent";
export declare const DEFAULT_RATING_COLORS: string[];
export interface UserExperienceSubmissionInfo {
    story_name: string;
    uuid: string;
    comments?: string;
    rating?: UserExperienceRating;
}
export declare function submitUserExperienceRating(info: UserExperienceSubmissionInfo, apiKey: string, url?: string): Promise<Response | null>;
export interface BounceAnimationProperties {
    bounceAmount: string;
    bounceDuration: number;
    betweenBouncesDuration: number;
    bounceCount: number;
}
export declare function createBounceKeyframes(props: BounceAnimationProperties): Keyframe[];
export declare function createBounceAnimation(element: HTMLElement, props: BounceAnimationProperties): Animation;
