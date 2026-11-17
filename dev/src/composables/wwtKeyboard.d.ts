import { KeyboardControlSettings } from '../keyboard';
import { WWTEngineStore } from '../types';
/**
  * A composable that sets up WWT keyboard controls.
  * @param store The WWT engine's Pinia store
  * @param element The element on which to attach the keyboard listeners. Uses the browser window if none is given
  * @returns The `KeyboardControlSettings` instance that was used to create the listeners
  */
export declare function useWWTKeyboardControls(store: WWTEngineStore, element?: Window | HTMLElement): KeyboardControlSettings;
