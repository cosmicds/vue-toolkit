import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { CircleMarkerOptions, TileLayerOptions } from "leaflet";
import { engineStore } from "@wwtelescope/engine-pinia";

export type WWTEngineStore = ReturnType<typeof engineStore>;

/* Funding acknowledgement */

export interface FundingAcknowledgementProps {
  color?: string;
  backgroundColor?: string;
}

/* Credit logos */

export interface CreditLogosProps {
  visible?: boolean;
  logoSize?: string;
}

/* Gallery */

export interface GalleryProps {
  wtmlUrl: string;
  columns?: number | string;
  width?: string;
  maxHeight?: string;
  title?: string;
  selectedColor?: string;
  singleSelect?: boolean;
  highlightLastOnly?: boolean;
  previewIndex?: number;
  closedText?: string;
}

/* Geolocation button */

export type GeolocationButtonDensity = null | "default" | "comfortable" | "compact";

export interface GeolocationButtonProps {
  color?: string;
  disabled?: boolean;
  size?: string;
  density?: GeolocationButtonDensity;
  elevation?: string;
  hideButton?: boolean;
  showTextLabel?: boolean;
  showCoords?: boolean;
  showTextProgress?: boolean;
  showProgressCircle?: boolean;
  useTextButton?: boolean;
  progressCircleSize?: number;
  label?: string;
  id?: string;
  trueIcon?: string;
  falseIcon?: string;
  backgroundColor?: string;
  showPermissions?: boolean;
}

/* Icon button */
// We need to do this because FontAwesome doesn't export the prop types
export type FontAwesomeIconProps = InstanceType<typeof FontAwesomeIcon>["$props"];
export type SizeType = Extract<FontAwesomeIconProps, 'size'>;

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

export interface LocationDeg {
  longitudeDeg: number;
  latitudeDeg: number;
}

export interface LeafletMapOptions extends TileLayerOptions {
  templateUrl: string;
  initialLocation?: LocationDeg;
  initialZoom?: number;
}

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
