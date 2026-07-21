// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable */


// We need this import for WWT types that aren't exported
// from the engine at the JS level
import * as wwtlib from "@wwtelescope/engine";
import {
  Color,
  Coordinates,
  Place,
  RenderContext,
  SpaceTimeController,
  WWTControl,
} from "@wwtelescope/engine";
import { Classification, SolarSystemObjects } from "@wwtelescope/engine-types";
import { HorizonSkyOptions } from "./types";
import { D2R, R2D } from "@cosmicds/vue-toolkit";

export const sunPlace = new Place();
sunPlace.set_names(["Sun"]);
sunPlace.set_classification(Classification.solarSystem);
sunPlace.set_target(SolarSystemObjects.sun);
sunPlace.set_zoomLevel(20);

export function skyOpacityForSunAlt(sunAltRad: number) {
  const civilTwilight = -6 * D2R;
  const astronomicalTwilight = 3 * civilTwilight;
  
  return Math.min(Math.max((1 + Math.atan(Math.PI * sunAltRad / (-astronomicalTwilight))) / 2, 0), 1);
}

export const drawHorizon = (renderContext: RenderContext, options: HorizonSkyOptions) => {
  const n = 6;
  const delta = 2 * R2D * Math.PI / n;
  const triangleList = new wwtlib.TriangleList();
  const color = Color.load(options.color);
  color.a = Math.round(255 * options.opacity ?? 1);

  const now = SpaceTimeController.get_now();
  for (let i = 0; i < n; i++) {
    let points: Coordinates[] = [
      Coordinates.fromLatLng(0, i * delta),
      Coordinates.fromLatLng(-90, i * delta),
      Coordinates.fromLatLng(0, (i + 1) * delta),
    ];
    points = points.map(point => {
      const raDecRad = Coordinates.horizonToEquatorial(point, SpaceTimeController.get_location(), now);
      return Coordinates.raDecTo3d(R2D * raDecRad.raRad / 15, R2D * raDecRad.decRad);
    });
    triangleList.addSubdividedTriangles(...points, color, new wwtlib.Dates(0, 1), 2);
  }
  triangleList.draw(renderContext, 1, true);
};


export const drawSky = (renderContext: RenderContext, options: HorizonSkyOptions) => {
  const n = 6;
  const delta = 2 * Math.PI / n;
  const triangleList = new wwtlib.TriangleList();
  const color = Color.load(options.color);

  const sunCoordinates = Coordinates.fromRaDec(sunPlace.get_RA(), sunPlace.get_dec());
  const sunAltAz = Coordinates.equatorialToHorizontal(
                      sunCoordinates,
                      SpaceTimeController.get_location(),
                      SpaceTimeController.get_now());

  const opacity = skyOpacityForSunAlt(sunAltAz.get_alt() * D2R);
  color.a = Math.round(255 * opacity);
  WWTControl.scriptInterface.setForegroundOpacity((1 - opacity) * 100);
  const now = SpaceTimeController.get_now();
  for (let i = 0; i < n; i++) {
    let points: Coordinates[] = [
      Coordinates.fromLatLng(0, i * delta),
      Coordinates.fromLatLng(0, (i + 1) * delta),
      Coordinates.fromLatLng(90, i * delta),
    ];
    points = points.map(point => {
      const raDecRad = Coordinates.horizonToEquatorial(point, SpaceTimeController.get_location(), now);
      return Coordinates.raDecTo3d(R2D * raDecRad.raRad / 15, R2D * raDecRad.decRad);
    });
    triangleList.addSubdividedTriangles(...points, color, new wwtlib.Dates(0, 1), 2);
  }
  triangleList.draw(renderContext, 1, true);
};
