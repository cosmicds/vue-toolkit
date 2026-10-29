/** Class representing a key press */
export declare class KeyPressInfo {
    /** The code of the key that was pressed */
    code: string;
    /** Whether the control modifier was pressed */
    ctrl: boolean;
    /** Whether the alt modifier was pressed */
    alt: boolean;
    /** Whether the shift modifier was pressed */
    shift: boolean;
    /** Whether the meta modifier was pressed */
    meta: boolean;
    /**
      * Create an instance of key press information
      * @param code The key code describing the keypress
      * @param modifiers An object of boolean values describing which modifier keys were pressed down
      */
    constructor(code: string, modifiers?: {
        ctrl?: boolean;
        alt?: boolean;
        shift?: boolean;
        meta?: boolean;
    });
    /**
      * Determine whether a keyboard event matches this key press information
      * @param event - The keyboard event to test
      * @returns Whether or not the given event matches
      */
    matches(event: KeyboardEvent): boolean;
}
/** Type describing the possible WWT actions */
type ActionType = KeyboardControlSettings["actionTypes"][number];
/**
  * Class describing keyboard control settings for WorldWide Telescope actions
  */
export declare class KeyboardControlSettings {
    /** A list of key presses that should result in zooming in */
    zoomIn: KeyPressInfo[];
    /** A list of key presses that should result in zooming out */
    zoomOut: KeyPressInfo[];
    /** A list of key presses that should result in moving the view up */
    moveUp: KeyPressInfo[];
    /** A list of key presses that should result in moving the view down */
    moveDown: KeyPressInfo[];
    /** A list of key presses that should result in moving the view left */
    moveLeft: KeyPressInfo[];
    /** A list of key presses that should result in moving the view right */
    moveRight: KeyPressInfo[];
    /** A value describing how much to move on a movement press. Larger means more movement. */
    moveAmount: number;
    constructor({ zoomIn, zoomOut, moveUp, moveLeft, moveDown, moveRight, moveAmount }: {
        zoomIn?: KeyPressInfo[] | undefined;
        zoomOut?: KeyPressInfo[] | undefined;
        moveUp?: KeyPressInfo[] | undefined;
        moveLeft?: KeyPressInfo[] | undefined;
        moveDown?: KeyPressInfo[] | undefined;
        moveRight?: KeyPressInfo[] | undefined;
        moveAmount?: number | undefined;
    });
    readonly actionTypes: readonly ["zoomIn", "zoomOut", "moveUp", "moveDown", "moveLeft", "moveRight"];
    /** Make a listener for a given WWT action
      * @param actionName - The WWT action to make a listener for
      * @param action - Function to execute when the given WWT action occurs
      * @returns The key event listener for the desired behavior
      */
    makeListener(actionName: ActionType, action: () => void): (event: KeyboardEvent) => void;
}
export {};
