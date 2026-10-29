// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable */

import {
  Annotation,
  AnnotationBatch,
  Color,
  Coordinates,
  Place,
  Poly,
  SpaceTimeController,
  WWTControl,
} from "@wwtelescope/engine";
import { Classification, SolarSystemObjects } from "@wwtelescope/engine-types";
import type { HorizonOptions, SkyEclipseInfo, SkyOptions, WWTEngineStore } from "../types";
import { D2R, R2D, value } from "../utils";

import { v4 } from "uuid";
import { isRef, onMounted, onUnmounted, watch, type WatchHandle } from "vue";

export const sunPlace = new Place();
sunPlace.set_names(["Sun"]);
sunPlace.set_classification(Classification.solarSystem);
sunPlace.set_target(SolarSystemObjects.sun);
sunPlace.set_zoomLevel(20);


export function skyOpacityForSunAlt(sunAltRad: number, options?: SkyEclipseInfo): number {
  const civilTwilight = -6 * D2R;
  const astronomicalTwilight = 3 * civilTwilight;
  
  let opacity = Math.min(Math.max((1 + Math.atan(Math.PI * sunAltRad / (-astronomicalTwilight))) / 2, 0), 1);
  let fraction = options?.fractionEclipsed ?? 0;
  if (options && options.inTotality && !options.inEclipse) {
    fraction = Math.min(fraction, 0.98);
  }
  opacity *= (1 - 0.5 * Math.pow(Math.E,-Math.pow((fraction -1),2)/(0.001)));
  return opacity;
}

interface WWTSkyOverlayData {
  triangles: Poly[];
  batch: AnnotationBatch;
  store: WWTEngineStore;
}

function setupSkyOverlayWatchers(
  data: WWTSkyOverlayData,
  options?: HorizonOptions,
) {

  let unwatchColor: WatchHandle | null = null;
  if (isRef(options?.color)) {
    unwatchColor = watch(options.color, color => {
      data.triangles.forEach(triangle => {
        triangle.set_fillColor(color);
        triangle.set_lineColor(color);
      });
    });
  }

  let unwatchOpacity: WatchHandle | null = null;
  if (isRef(options?.opacity)) {
    unwatchOpacity = watch(options.opacity, opacity => {
      data.triangles.forEach(triangle => {
        triangle.set_opacity(opacity);
      });
    });
  }

  let unwatchShow: WatchHandle | null = null;
  if (isRef(options?.show)) {
    unwatchShow = watch(options.show, show => {
      data.triangles.forEach(triangle => {
        if (show) {
          data.store.addAnnotation(triangle, data.batch);
        } else {
          data.store.removeAnnotation(triangle, data.batch);
        }
      });
    });
  }

  function cleanup() {
    if (unwatchColor) { unwatchColor(); }
    if (unwatchOpacity) { unwatchOpacity(); }
    if (unwatchShow) { unwatchShow(); }
  }

  return cleanup;
}

export function useHorizon(store: WWTEngineStore, options?: HorizonOptions) {
  const color = value(options?.color, "#01362C");
  const n = 6;
  const delta = 360 / n;
  const batch = store.createHorizontalAnnotationBatch(`${v4()}-horizon`);
  const triangles: Poly[] = [];
  const show = value(options?.show, true);
  for (let i = 0; i < n; i++) {
    const triangle = new Poly();
    triangle.set_fill(true);
    triangle.addPoint((i + 1) * delta, 0);
    triangle.addPoint(-i * delta, -90);
    triangle.addPoint(i * delta, 0);
    triangle.set_lineColor(color);
    triangle.set_fillColor(color);
    triangle.set_opacity(options?.opacity ?? 1);
    triangles.push(triangle);
    if (show) {
      store.addAnnotation(triangle, batch);
    }
  }

  const watcherCleanup = setupSkyOverlayWatchers({ triangles, store, batch }, options); 

  function cleanup() {
    triangles.forEach(triangle => store.removeAnnotation(triangle, batch));
    watcherCleanup();
  }

  onUnmounted(cleanup);

  return cleanup;
};

function getSkyOpacity(options?: SkyOptions) {
  if (options?.opacity != null) {
    return options.opacity;
  }

  const sunCoordinates = Coordinates.fromRaDec(sunPlace.get_RA(), sunPlace.get_dec());
  const sunAltAz = Coordinates.equitorialToHorizon(
                      sunCoordinates,
                      SpaceTimeController.get_location(),
                      SpaceTimeController.get_now());

  return skyOpacityForSunAlt(sunAltAz.get_alt() * D2R, options?.eclipseInfo);
}

export function useSky(store: WWTEngineStore, options?: SkyOptions) {
  const n = 6;
  const delta = 360 / n;
  const color = value(options?.color, "#4190ED");

  const opacity = getSkyOpacity(options);
  const show = value(options?.show, true);
  store.setForegroundOpacity((1 - opacity) * 100);
  const batch = store.createHorizontalAnnotationBatch(`${v4()}-sky`);
  const triangles: Poly[] = [];
  for (let i = 0; i < n; i++) {
    const triangle = new Poly();
    triangle.set_fill(true);
    triangle.addPoint((i + 1) * delta, 0);
    triangle.addPoint(i * delta, 0);
    triangle.addPoint(-i * delta, 90);
    triangle.set_lineColor(color);
    triangle.set_fillColor(color);
    triangle.set_opacity(opacity);
    triangles.push(triangle);
    if (show) {
      store.addAnnotation(triangle, batch);
    }
  }
  
  let currentOpacity = opacity;

  store.addFrameCallback(() => {
    const newOpacity = getSkyOpacity(options);
    if (newOpacity != currentOpacity) {
      triangles.forEach(triangle => triangle.set_opacity(newOpacity));
      currentOpacity = newOpacity;
    }
  });

  const watcherCleanup = setupSkyOverlayWatchers({ triangles, store, batch }, options); 

  function cleanup() {
    triangles.forEach(triangle => store.removeAnnotation(triangle, batch));
    watcherCleanup();
  }

  onUnmounted(cleanup);

  return cleanup;
};
