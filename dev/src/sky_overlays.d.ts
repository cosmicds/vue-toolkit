import { RenderContext } from '@wwtelescope/engine';
import { HorizonOptions, SkyEclipseInfo, SkyOptions } from './types';
import * as wwtlib from "@wwtelescope/engine";
export declare const sunPlace: wwtlib.Place;
export declare function skyOpacityForSunAlt(sunAltRad: number, options?: SkyEclipseInfo): number;
export declare function drawHorizon(renderContext: RenderContext, options?: HorizonOptions): void;
export declare function drawSky(renderContext: RenderContext, options?: SkyOptions): void;
