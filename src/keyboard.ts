/** Class representing a key press */
class KeyPressInfo {
  code: string;
  ctrl: boolean;
  alt: boolean;
  shift: boolean;
  meta: boolean;

  /**
    * Create an instance of key press information
    * @param{string} code - The key code describing the keypress
    * @param{{ ctrl: boolean?, alt: boolean?, shift: boolean?, meta: boolean? }} - An object of boolean values describing which modifier keys were pressed down
    */
  constructor(
    code: string,
    modifiers?: {
      ctrl?: boolean;
      alt?: boolean;
      shift?: boolean;
      meta?: boolean;
    }
  ) {
    this.code = code;
    this.ctrl = modifiers?.ctrl ?? false;
    this.alt = modifiers?.alt ?? false;
    this.shift = modifiers?.shift ?? false;
    this.meta = modifiers?.meta ?? false;
  }

  /**
    * Determine whether a keyboard event matches this key press information
    * @param{KeyboardEvent} event - The keyboard event to test
    * @returns{boolean} Whether or not the given event matches
    */
  matches(event: KeyboardEvent): boolean {
    return (
      event.code === this.code &&
      event.ctrlKey === this.ctrl &&
      event.altKey === this.alt &&
      event.shiftKey === this.shift &&
      event.metaKey === this.meta
    );
  }
}

/** Type describing the possible WWT actions */
type ActionType = KeyboardControlSettings["actionTypes"][number];

/**
  * Class describing keyboard control settings for WorldWide Telescope actions
  */
export class KeyboardControlSettings {
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

  constructor({
    zoomIn = [new KeyPressInfo("KeyI")],
    zoomOut = [new KeyPressInfo("KeyO")],
    moveUp = [new KeyPressInfo("KeyW")],
    moveLeft = [new KeyPressInfo("KeyA")],
    moveDown = [new KeyPressInfo("KeyS")],
    moveRight =[new KeyPressInfo("KeyD")],
    moveAmount = 20
  }) {
    this.zoomIn = zoomIn;
    this.zoomOut = zoomOut;
    this.moveUp = moveUp;
    this.moveDown = moveDown;
    this.moveLeft = moveLeft;
    this.moveRight = moveRight;
    this.moveAmount = moveAmount;
  }

  // This is to make sure that we can't make a listener for an action type that doesn't exist
  readonly actionTypes = [
    "zoomIn",
    "zoomOut",
    "moveUp",
    "moveDown",
    "moveLeft",
    "moveRight",
  ] as const;
  
  /** Make a listener for a given WWT action
    * @param{ActionType} actionName - The WWT action to make a listener for
    * @param{() => void} action - Function to execute when the given WWT action occurs
    * @returns{(event: KeyboardEvent) => void} The key event listener for the desired behavior 
    */
  makeListener(
    actionName: ActionType,
    action: () => void
  ): (event: KeyboardEvent) => void {
    return (event) => {
      for (const keyPress of this[actionName]) {
        if (keyPress.matches(event)) {
          action();
        }
      }
    };
  }
}
