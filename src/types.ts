import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { CircleMarkerOptions, TileLayerOptions } from "leaflet";
import { engineStore } from "@wwtelescope/engine-pinia";

/** The type of the WWT engine Pinia store */
export type WWTEngineStore = ReturnType<typeof engineStore>;

/* Funding acknowledgement */

/** Interface describing props for the funding acknowledgement component */
export interface FundingAcknowledgementProps {
  /** The color of the acknowledgement text */
  color?: string;

  /** The background color of the acknowledgement */
  backgroundColor?: string;
}

/* Credit logos */

/** Interface describing props for the credit logos component */
export interface CreditLogosProps {
  /** What size to use for the logos. Should be a valid CSS size. */
  logoSize?: string;
}

/* Gallery */

/** Interface describing props for the gallery component */
export interface GalleryProps {
  /** The URL of a WTML file describing the desired gallery contents. Required */
  wtmlUrl: string;
  /** The number of columns of the gallery.
    * Accepts a number or a valid CSS value to be used in `repeat` for `grid-template-columns`
    * Defaults to 'auto-fit'
    */
  columns?: number | string;
  /** The width of the gallery. Should be a valid CSS value for `width`. Defaults to 300px */
  width?: string;
  /** Maximum height of the gallery. Should be a valid CSS value for `max-height`. Defaults to 500px */
  maxHeight?: string;
  /** The title of the gallery. Default is 'Gallery' */
  title?: string;
  /** The accent color to use for selected images in the gallery. Should be a valid CSS color. Default is 'dodgerblue' */
  selectedColor?: string;
  /** Whether a user can select only one image at a time. Default true */
  singleSelect?: boolean;
  /** Whether only the last selected image is highlighted. Default false */ 
  highlightLastOnly?: boolean;
  /** The index of the preview image in the WTML file. Defaults to 0. */
  previewIndex?: number;
  /** The text to show when the gallery is closed. Default is 'Image Gallery' */
  closedText?: string;
}

/* Geolocation button */

/** A union type consisting of the density options for the geolocation button */
export type GeolocationButtonDensity = null | "default" | "comfortable" | "compact";

/** Interface describing props for the geolocation button */
export interface GeolocationButtonProps {
  /** The color of the geolocation button. Defaults to "white" */
  color?: string;
  /** The size of the button */
  size?: string;
  /** The density of the button. This adjusts the vertical height of the button. Defaults to "comfortable" */
  density?: GeolocationButtonDensity;
  /** The elevation of the button. Defaults to "2" */
  elevation?: string;
  /** Whether to hide the button. Defaults to false */
  hideButton?: boolean;
  /** Whether to show the button's text label. Defaults to false */
  showTextLabel?: boolean;
  /** Whether to show the button's geolocation coordinates. Defaults to false */ 
  showCoords?: boolean;
  /** Whether to show text indicating when location fetching is in progress. Defaults to false */
  showTextProgress?: boolean;
  /** Whether to show circle indicator when fetching is in progress. Defaults to true */
  showProgressCircle?: boolean;
  /** Whether to include text on the button. Defaults to false */
  useTextButton?: boolean;
  /** The size of the in-progress circle. Defaults to 12 */
  progressCircleSize?: number;
  /** The button's label. Defaults to "My Location" */
  label?: string;
  /** The ID to use to create the button ID */
  id?: string;
  /** The icon to use when the geolocation has been obtained */
  trueIcon?: string;
  /** The icon to use when there is no value for the geolocation */
  falseIcon?: string;
  /** Whether to show the location and permission status. Useful for debugging, defaults to false */
  showPermissions?: boolean;
}

/* Icon button */

/**
  * A type describing the props of a FontAwesome icon
  * We need to do this because FontAwesome doesn't export the prop types
  */ 
export type FontAwesomeIconProps = InstanceType<typeof FontAwesomeIcon>["$props"];
/** A type describing the size options for a FontAwesome icon */
export type SizeType = Extract<FontAwesomeIconProps, 'size'>;

/** An interface describing props for the icon button */
export interface IconButtonProps {
  modelValue?: boolean;
  faIcon?: string;
  mdIcon?: string;
  color?: string;
  focusColor?: string;
  backgroundColor?: string;
  boxShadow?: boolean;
  border?: boolean;
  longPressTimeMs?: number;
  tooltipText?: string;
  tooltipLocation?: string;
  tooltipOnClick?: boolean;
  tooltipOnFocus?: boolean;
  tooltipOnHover?: boolean;
  tooltipOffset?: string | number;
  showTooltip?: boolean;
  faSize?: SizeType;
  mdSize?: string;
}


/* Location selector */

/** An interface describing a latitude/longitude location */
export interface LocationDeg {
  /** The longitude of the location, in degrees */
  longitudeDeg: number;
  /** The latitude of the location, in degrees */
  latitudeDeg: number;
}

/** An interface describing options for the Leaflet map in the location selector */
export interface LeafletMapOptions extends TileLayerOptions {
  /** The template URL to use for the base map layer */
  templateUrl: string;
  /** The initial location to center the map on */
  initialLocation?: LocationDeg;
  /** The initial zoom level of the map */
  initialZoom?: number;
}

/** An interface describing a GeoJSON item, to be used as a prop for the location selector */
export interface GeoJSONProp {
  url?: string;
  geojson?: GeoJSON.FeatureCollection | GeoJSON.Feature | GeoJSON.GeometryCollection;
  style: CircleMarkerOptions;
}

export interface PlaceDeg extends LocationDeg { 
  color?: string;
  fillColor?: string;
  fillOpacity?: number;
  radius?: number;
  name?: string;
}

export interface LocationSelectorProps {
  activatorColor?: string;
  detectLocation?: boolean;
  modelValue?: LocationDeg;
  mapOptions?: LeafletMapOptions;
  initialPlace?: PlaceDeg;
  places?: PlaceDeg[];
  placeCircleOptions?: CircleMarkerOptions;
  placeSelectable?: boolean;
  selectable?: boolean;
  selectedCircleOptions?: CircleMarkerOptions;
  selectionEvent?: "click" | "dblclick";
  worldRadii?: boolean;
  geoJsonFiles?: GeoJSONProp[];
  layers?: L.Layer[];
}

/* WWT HUD */

export interface HUDLocation {
  top?: string | number,
  left?: string | number,
  bottom?: string | number,
  right?: string | number,
}

export interface WwtHUDProps {
  location?: HUDLocation;
  offsetCenter?: { x: number; y: number };
  otherVariables?: Object;  // eslint-disable-line @typescript-eslint/ban-types
  fontSize?: string;
  backgroundColor?: string | null;
  textShadow?: string | null;
  store: ReturnType<typeof engineStore>;
}
