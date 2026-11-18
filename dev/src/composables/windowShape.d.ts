/** Interface describing the shape of a browser window */
export interface WindowShape {
    width: number;
    height: number;
}
/** A default `WindowShape` to use */
export declare const defaultWindowShape: {
    width: number;
    height: number;
};
/**
  * A composable that encapsulates a changing window shape.
  *
  * @returns A reactive variable describing the current window shape.
  */
export declare function useWindowShape(): import('vue').Ref<{
    width: number;
    height: number;
}, WindowShape | {
    width: number;
    height: number;
}>;
