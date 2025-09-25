/** Interface describing a MapBox content item */
export interface MapBoxContextItem {
  id: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  mapbox_id: string;
  text: string;
  wikidata: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  short_code?: string;
}

// The field names here come from MapBox
export interface MapBoxFeature {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  place_type: string[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  place_name: string;
  text?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  properties: { short_code: string; };
  center: [number, number];
  context: MapBoxContextItem[];
}

/** Interface describing a MapBox feature collection, which is a GeoJSON object */
export interface MapBoxFeatureCollection {
  /* The type of the collection */
  type: "FeatureCollection";
  /** The list of features in the collection */
  features: MapBoxFeature[];
}

/** Union type describing the feature types available in MapBox */
export type MapBoxFeatureType = "country" | "region" | "postcode" | "district" | "place" | "locality" | "neighborhood" | "street" | "address";

/** Union type describing the worldviews available in MapBox */
export type MapBoxWorldviewType = "ar" | "cn" | "in" | "jp" | "ma" | "ru" | "tr" | "us";

/** Interface describing options common to both forward and reverse MapBox geocoding */
interface BaseMapBoxGeocodingOptions {
  /** The language to use for the results, as an IEFT language tag */
  language?: string;
  /** The number of results to return. Default is 5 */
  limit?: number;
  /** Countries to include in the results. If a list is given, any result outside of these countries is omitted
    * Specify countries using ISO 3166-1 alpha-2 country codes: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    */
  countries?: string[];
  /** The result types to include */
  types?: MapBoxFeatureType[];

  /** The access token for MapBox. Required */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string;
}

/** Interface describing options for forward geocoding */
export interface MapBoxForwardGeocodingOptions extends BaseMapBoxGeocodingOptions {
  /** Whether to return autocomplete results. MapBox default is true */
  autocomplete?: boolean;
  /** A bounding box for results. Should be a string of the form "minLon,minLat,maxLon,maxLat" */
  bbox?: string;
  /** Whether MapBox should try approximate, as well as exact, matching. MapBox default is true */
  fuzzyMatch?: boolean;
  /** If specified, results are biased to favor results closer to this location. Should be a string of the form "longitude, latitude" */
  proximity?: string;
}

/** Interface describing options for reverse geocoding */
export interface MapBoxReverseGeocodingOptions extends BaseMapBoxGeocodingOptions {
  /** The worldview to use for search results. MapBox default is "us" */
  worldview?: MapBoxWorldviewType[];
}

/** Interface describing geocoding query parameters that are adjusted from the options exposed by our methods */
interface MapBoxAdjustedGeocodingParams {
  /** We take in a string of country codes, but MapBox wants a comma-separated list */
  country?: string;
  /** We take in a list of types, but MapBox wants a comma-separated list */
  types?: string;
 }

/** A type describing the query parameter type corresponding to one of our option types */
type MapBoxQueryOptions<T extends BaseMapBoxGeocodingOptions> = {
  [K in keyof Omit<T, "countries" | "types">]: T[K];
} & MapBoxAdjustedGeocodingParams;

const DEFAULT_RELEVANT_FEATURE_TYPES = ["postcode", "place", "region", "country"];
const NA_COUNTRIES = ["United States", "Canada", "Mexico"];
const NA_ABBREVIATIONS = ["US-", "CA-", "MX-"];

/** Find the best feature from a collection of MapBox features.
  * We look for feature place types in the order: 'place', 'postcode', 'region', 'country'
  * @param collection The collection of items to search
  * @param relevantTypes The set of feature place types to consider. If not specified, we use the four types mentioned above
  * @returns The "best" feature, as described above
  */
export function findBestFeature(collection: MapBoxFeatureCollection, relevantTypes?: MapBoxFeatureType[]): MapBoxFeature | null {
  const types = relevantTypes ?? DEFAULT_RELEVANT_FEATURE_TYPES;
  const relevantFeatures = collection.features.filter(feature => types.some(type => feature.place_type.includes(type)));
  const placeFeature = relevantFeatures.find(feature => feature.place_type.includes("place")) ?? (relevantFeatures.find(feature => feature.place_type.includes("postcode")) ?? undefined);
  if (placeFeature !== undefined) {
    return placeFeature;
  }
  const regionFeature = relevantFeatures.find(feature => feature.place_type.includes("region"));
  if (regionFeature !== undefined) {
    return regionFeature;
  }
  const countryFeature = relevantFeatures.find(feature => feature.place_type.includes("country"));
  if (countryFeature !== undefined) {
    return countryFeature;
  }
  return null;
}

/**
  * Create text describing a MapBox feature, based on the MapBox items inside of the feature's context
  * @param feature The MapBox feature
  * @param relevantTypes The item types inside the feature's context that we want to consider when creating the string. If not specified, we use 'place', 'postcode', 'region', and 'country'
  * @returns A string describing the feature
  */
export function textForMapboxFeature(feature: MapBoxFeature, relevantTypes?: MapBoxFeatureType[]): string {
  const types = relevantTypes ?? DEFAULT_RELEVANT_FEATURE_TYPES;
  const pieces: string[] = [];
  if (feature.text) {
    pieces.push(feature.text);
  }
  feature.context.forEach(item => {
    const itemType = item.id.split(".")[0];
    if (!types.includes(itemType)) {
      return;
    }
    let text = null as string | null;
    const shortCode = item.short_code;
    if (itemType === "region" && shortCode != null) {
      if (NA_ABBREVIATIONS.some(abbr => shortCode.startsWith(abbr))) {
        text = shortCode.substring(3);
      }
    } else if (itemType === "country") {
      const itemText = item.text;
      if (!NA_COUNTRIES.includes(itemText)) {
        text = itemText; 
      }
    }
    if (text !== null) {
      pieces.push(text);
    }
  });
  return pieces.join(", ");
}

/**
  * Return text describing the "best" feature in a MapBox collection.
  * See @link{findBestFeature} for a description of how a feature is chosen
  * @param results The feature collection to use
  * @param relevantTypes The item types inside the best feature's context that we want to consider when creating the string. If not specified, we use 'place', 'postcode', 'region', and 'country'
  */
export function textForMapboxResults(results: MapBoxFeatureCollection, relevantTypes?: MapBoxFeatureType[]): string {
  const feature = findBestFeature(results, relevantTypes);
  return feature !== null ? textForMapboxFeature(feature) : "";
}

/**
  * Convert our MapBox options to options suitable for a query to the MapBox API
  * @param options The toolkit MapBox options
  * @returns The options converted into a suitable object to use for a MapBox API query
  * @template T extends @link{BaseMapBoxGeocodingOptions}
  */
function convertOptionsToQueryParams<T extends BaseMapBoxGeocodingOptions>(options: T): MapBoxQueryOptions<T> {
  const { types, countries, ...params } = options;
  const queryParams = params as MapBoxQueryOptions<T>;
  queryParams.types = (types ?? ["place", "postcode"]).join(",");
  if (countries) {
    queryParams.country = countries.join(",");
  }
  return queryParams;
}

/**
  * Convert a set of MapBox geocoding options to URL search parameters
  * @param options The MapBox geocoding options
  * @returns A `URLSearchParams` object that can be used for a MapBox query
  */
function searchParams(options: MapBoxForwardGeocodingOptions | MapBoxReverseGeocodingOptions): URLSearchParams {
  const search = new URLSearchParams();
  const queryParams = convertOptionsToQueryParams(options);
  Object.entries(queryParams).forEach(([key, value]) => search.set(key, value.toString()));
  return search;
}

/**
  * Obtain a string describing the given location in terms of NSEW directions - for example: 10° N, 25° W
  * @param longitudeDeg The longitude of the location, in degrees
  * @param latitudeDeg The latitude of the location, in degrees
  * @returns A string describing the given coordinates
  */
export function latitudeLongitudeText(longitudeDeg: number, latitudeDeg: number) {
  const ns = latitudeDeg >= 0 ? 'N' : 'S';
  const ew = longitudeDeg >= 0 ? 'E' : 'W';
  const lat = Math.abs(latitudeDeg).toFixed(3);
  const lon = Math.abs(longitudeDeg).toFixed(3);
  return `${lat}° ${ns}, ${lon}° ${ew}`;
}

/**
  * Obtain text describing a given longitude and latitude based on a MapBox reverse geocoding query
  * @param longitudeDeg The longitude of the location, in degrees
  * @param latitudeDeg The latitude of the location, in degrees
  * @param options Options for the MapBox reverse geocoding
  * @returns A promise that resolves to the string describing the given coordinates
  */
export async function textForLocation(longitudeDeg: number, latitudeDeg: number, options: MapBoxReverseGeocodingOptions): Promise<string> {
  const search = searchParams(options);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitudeDeg},${latitudeDeg}.json?${search.toString()}`;
  return fetch(url)
    .then(response => response.json())
    .then((result: MapBoxFeatureCollection) => {
      if (result.features.length === 0) {
        return latitudeLongitudeText(latitudeDeg, longitudeDeg);
      }
      return textForMapboxResults(result);
    });
}

/**
  * Obtain a collection of MapBox items obtained from performing a forward geocoding query for a particular search string.
  * Note that the number of items returned is set by the `limit` field in your options.
  * If `limit` is not specified, the MapBox default is 5
  * @param searchText The search string
  * @param options Options for the MapBox forward geocoding
  * @returns A promise that resolves to the found collection of MapBox items
  */
export async function geocodingInfoForSearch(searchText: string, options: MapBoxForwardGeocodingOptions): Promise<MapBoxFeatureCollection> {
  const search = searchParams(options);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?${search.toString()}`;
  return fetch(url).then(response => response.json());
}
