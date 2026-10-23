/** Class representing a background imageset for WorldWide Telescope */
export declare class BackgroundImageset {
    /** The outward-facing name to use for the imageset in a story */
    imagesetName: string;
    /** The name of the imageset object inside WorldWide Telescope */
    displayName: string;
    constructor(displayName: string, imagesetName: string);
}
/** A default list of `BackgroundImagset` objects to use within data stories */
export declare const skyBackgroundImagesets: BackgroundImageset[];
