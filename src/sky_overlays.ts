// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable */

import {
  Annotation,
  Color,
  Coordinates,
  Place,
  Poly,
  SpaceTimeController,
  WWTControl,
} from "@wwtelescope/engine";
import { Classification, SolarSystemObjects } from "@wwtelescope/engine-types";
import type { HorizonOptions, SkyEclipseInfo, SkyOptions, WWTEngineStore } from "./types";
import { D2R, R2D } from "./utils";

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

export function addHorizon(store: WWTEngineStore, options?: HorizonOptions) {
  const color = options?.color ?? "#01362C";
  const n = 6;
  const delta = 360 / n;
  const batch = store.createHorizontalAnnotationBatch("horizontal");
  const triangles: Poly[] = [];
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
    store.addAnnotation(triangle, batch);
  }

  function remove() {
    triangles.forEach(triangle => store.removeAnnotation(triangle));
  }

  return {
    annotations: triangles,
    remove,
  };
};

export function addSky(store: WWTEngineStore, options?: SkyOptions) {
  const n = 6;
  const delta = 360 / n;
  const color = options?.color ?? "#4190ED";

  const sunCoordinates = Coordinates.fromRaDec(sunPlace.get_RA(), sunPlace.get_dec());
  const sunAltAz = Coordinates.equitorialToHorizon(
                      sunCoordinates,
                      SpaceTimeController.get_location(),
                      SpaceTimeController.get_now());

  const opacity = options?.opacity ?? skyOpacityForSunAlt(sunAltAz.get_alt() * D2R, options?.eclipseInfo);
  store.setForegroundOpacity((1 - opacity) * 100);
  const batch = store.createHorizontalAnnotationBatch("horizontal");
  const triangles: Poly[] = [];
  for (let i = 0; i < n; i++) {
    const triangle = new Poly();
    triangle.set_fill(true);
    triangle.addPoint((i + 1) * delta, 0);
    triangle.addPoint(-i * delta, 90);
    triangle.addPoint(i * delta, 0);
    triangle.set_lineColor(color);
    triangle.set_fillColor(color);
    triangle.set_opacity(options?.opacity ?? 1);
    triangles.push(triangle);
    store.addAnnotation(triangle, batch);
  }

  function remove() {
    triangles.forEach(triangle => store.removeAnnotation(triangle));
  }

  return {
    annotations: triangles,
    remove,
  };
};
