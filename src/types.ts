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

/** Interface describing a logo */
export interface CreditLogo {
  /** The URL for the logo image */
  src: string;
  /** The URL to open when the logo is clicked */
  href: string;
  /** Alt text to use for the logo. If none is given, the logo will have no alt text */
  alt?: string;
}

/** A union type enumerating the default credit logos */
export type DefaultCreditLogo = "cosmicds" | "wwt" | "sciact" | "nasa";

/** Interface describing props for the credit logos component */
export interface CreditLogosProps {
  /** What size to use for the logos. Should be a valid CSS size. */
  logoSize?: string;
  /** Any extra logos that we want to use */
  extraLogos?: CreditLogo[];
  /** Which default logos to use. If not specified, use them all */
  defaultLogos: DefaultCreditLogo[];
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
  /** Whether or not the icon button is active. Only makes sense in cases where one wants the button to have an on/off state */
  modelValue?: boolean;
  /** The name of the FontAwesome icon to use. It's assumed that only one of this and `mdIcon` will be used */
  faIcon?: string;
  /** The name of the MID icon to use. It's assumed that only one of this and `faIcon` will be used */
  mdIcon?: string;
  /** The primary color of the button. Sets the icon and border colors. Default is white */
  color?: string;
  /** The color of the button when focused. Default is white */
  focusColor?: string;
  /** The color of the button when active. Default is white */
  activeColor?: string;
  /** The background color of the button. Default is #040404 */
  backgroundColor?: string;
  /** Whether the button has a border. Default is true */
  border?: boolean;
  /** The time duration, in ms, to recognize a press event as a long press. Default is 500 */
  longPressTimeMs?: number;
  /** The tooltip text for the button. If not specified, tooltip will not be shown */
  tooltipText?: string;
  /** The location of the tooltip. Default is start */
  tooltipLocation?: string;
  /** Whether to show the tooltip when the button is clicked. Default is false */
  tooltipOnClick?: boolean;
  /** Whether to show the tooltip when the button is focused. Default is false */
  tooltipOnFocus?: boolean;
  /** Whether to show the tooltip when the button is hovered. Default is true */
  tooltipOnHover?: boolean;
  /** The distance away from the button that the tooltip appears. Default is 0 */
  tooltipOffset?: string | number;
  /** Whether to show the tooltip when appropriate. Default is true */
  showTooltip?: boolean;
  /** The size of the FontAwesome icon */
  faSize?: SizeType;
  /** The size of the MDI icon. Should be a valid CSS size */
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
  /** The URL of a remote GeoJSON resource. This and `geojson` and not intended to be used together */
  url?: string;
  /** A GeoJSON object to add to the location selector */
  geojson?: GeoJSON.FeatureCollection | GeoJSON.Feature | GeoJSON.GeometryCollection;
  /** The style options for any circle markers related to this item. Required */
  style: CircleMarkerOptions;
}

/** Interface describing a place on the location selector */
export interface PlaceDeg extends LocationDeg { 
  /** The color to use for the circle showing the place */
  color?: string;
  /** The fill color to use for the circle showing the place */
  fillColor?: string;
  /** The fill opacity to use for the circle showing the place */
  fillOpacity?: number;
  /** The radius to use for the circle showing the place */
  radius?: number;
  /** The name of the place */
  name?: string;
}

/** Interface describing props for the location selector */
export interface LocationSelectorProps {
  /** The color to use for the activator button */
  activatorColor?: string;
  /** Whether to attempt to detect the user's location when the component is mounted. Default is true */
  detectLocation?: boolean;
  /** The currently selected location. Default is the coordinates for Harvard College Observatory */
  modelValue?: LocationDeg;
  /** Map options for the Leaflet map. If not specified, sensible defaults are used */
  mapOptions?: LeafletMapOptions;
  /** The initial place to be selected on the map */
  initialPlace?: PlaceDeg;
  /** The list of places to show on the map */
  places?: PlaceDeg[];
  /** Options for place circles */
  placeCircleOptions?: CircleMarkerOptions;
  /** Whether places can be selected on the map. Default is true */
  placeSelectable?: boolean;
  /** Whether a location can be selected on the map. Default is true */
  selectable?: boolean;
  /** Options for the circle showing the selected place */
  selectedCircleOptions?: CircleMarkerOptions;
  /** Which event to use to select a location. Default is "click" */
  selectionEvent?: "click" | "dblclick";
  /** Whether to use world radii for circle sizes (as opposed to screen radii). Default is true */
  worldRadii?: boolean;
  /** GeoJSON items to display on the map. The list is empty by default */
  geoJsonFiles?: GeoJSONProp[];
  /** Layers to show on the map. The list is empty by default */
  layers?: L.Layer[];
}

/* WWT HUD */

/** Interface describing the location of the WWT HUD */
export interface HUDLocation {
  /** Distance from the top. Should be a valid CSS value */
  top?: string | number,
  /** Distance from the left. Should be a valid CSS value */
  left?: string | number,
  /** Distance from the bottom. Should be a valid CSS value */
  bottom?: string | number,
  /** Distance from the right. Should be a valid CSS value */
  right?: string | number,
}

/** Interface describing props for the WWT HUD */
export interface WwtHUDProps {
  /** Location of the HUD in the browser window. Default is `{ top: "50%", left: "50%" }` */
  location?: HUDLocation;
  /** Define an offset for the HUD. Default is `{ x: 0.5, y: 0.5 }` */
  offsetCenter?: { x: number; y: number };
  /** Other variables to include in the HUD display. Default is `{}` */
  otherVariables?: Object;  // eslint-disable-line @typescript-eslint/ban-types
  /** The font size of the HUD text. Should be a valid CSS value for `font-size` */
  fontSize?: string;
  /** Background color for the HUD. Should be a valid CSS color. Default is `rgba(0, 0, 0, 0.5)` */
  backgroundColor?: string | null;
  /** Text shadow for the HUD text. Should be a valid CSS value for `text-shadow`. Default is `"0 0 5px black"` */
  textShadow?: string | null;
  /** The WWT engine store to use for the HUD. Required */
  store: WWTEngineStore;
}

/** Interface describing props for the speed control component */
export interface SpeedControlProps {
  /** The WWT engine store to use for the HUD. Required */
  store: WWTEngineStore;
  /** The primary color used for the component. Should be a valid CSS color */
  color?: string;
  /** The maximum allowed WWT speed */
  maxSpeed?: number;
  /** The default WWT playback rate */
  defaultRate?: number;
  /** Whether or not the speed control should be displayed inline */
  useInline?: boolean; 
  /** Whether or not to show the current playback status */
  showStatus?: boolean;
  /** The factor by which to adjust the WWT speed when speeding up or down */ 
  rateDelta?: number;
}
