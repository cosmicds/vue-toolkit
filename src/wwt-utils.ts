import { engineStore } from "@wwtelescope/engine-pinia";
import { KeyboardControlSettings } from "./keyboard";
type WWTEngineStore = ReturnType<typeof engineStore>;

function doZoom(store: WWTEngineStore, zoomIn: boolean) {
  const factor = zoomIn ? 1 / 1.3 : 1.3;
  store.zoom(factor);
}

function doMove(store: WWTEngineStore, x: number, y: number) {
  store.move({ x, y });
}

/**
  * A composable that sets up WWT keyboard controls.
  * @param store The WWT engine's Pinia store
  * @param element The element on which to attach the keyboard listeners. Uses the browser window if none is given
  * @returns The `KeyboardControlSettings` instance that was used to create the listeners
  */
export function useWWTKeyboardControls(store: WWTEngineStore, element?: Window | HTMLElement): KeyboardControlSettings {
  const root = element || window;
  const kcs = new KeyboardControlSettings({});
  root.addEventListener(
    "keydown",
    kcs.makeListener("zoomIn", () => doZoom(store, true)) as EventListener
  );
  root.addEventListener(
    "keydown",
    kcs.makeListener("zoomOut", () => doZoom(store, false)) as EventListener
  );
  root.addEventListener(
    "keydown",
    kcs.makeListener("moveUp", () =>
      doMove(store, 0, kcs.moveAmount)
    ) as EventListener
  );
  root.addEventListener(
    "keydown",
    kcs.makeListener("moveDown", () =>
      doMove(store, 0, -kcs.moveAmount)
    ) as EventListener
  );
  root.addEventListener(
    "keydown",
    kcs.makeListener("moveLeft", () =>
      doMove(store, kcs.moveAmount, 0)
    ) as EventListener
  );
  root.addEventListener(
    "keydown",
    kcs.makeListener("moveRight", () =>
      doMove(store, -kcs.moveAmount, 0)
    ) as EventListener
  );

  return kcs;
}
