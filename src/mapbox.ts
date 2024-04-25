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

export interface MapBoxFeatureCollection {
  type: "FeatureCollection";
  features: MapBoxFeature[];
}

export type MapBoxFeatureType = "country" | "region" | "postcode" | "district" | "place" | "locality" | "neighborhood" | "street" | "address";
export type MapBoxWorldviewType = "ar" | "cn" | "in" | "jp" | "ma" | "ru" | "tr" | "us";

// For countries, use the ISO 3166-1 alpha-2 country codes:
// https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
interface BaseMapBoxGeocodingOptions {
  permanent?: boolean;
  language?: string;
  limit?: number;
  countries?: string[];
  types?: MapBoxFeatureType[];

  // MapBox API access token
  // eslint-disable-next-line @typescript-eslint/naming-convention
  access_token: string;
}

interface MapBoxForwardGeocodingOptions extends BaseMapBoxGeocodingOptions {
  autocomplete?: boolean;
  bbox?: number;
  format?: "geojson" | "v5";
  proximity?: string;
}

interface MapBoxReverseGeocodingOptions extends BaseMapBoxGeocodingOptions {
  worldview?: MapBoxWorldviewType[];
}

interface MapBoxAdjustedGeocodingParams {
  countries?: string;
  types?: string;
 }

type MapBoxQueryOptions<T extends BaseMapBoxGeocodingOptions> = {
  [K in keyof Omit<T, "countries" | "types">]: T[K];
} & MapBoxAdjustedGeocodingParams;

const DEFAULT_RELEVANT_FEATURE_TYPES = ["postcode", "place", "region", "country"];
const NA_COUNTRIES = ["United States", "Canada", "Mexico"];
const NA_ABBREVIATIONS = ["US-", "CA-", "MX-"];

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

export function textForMapboxResults(results: MapBoxFeatureCollection, relevantTypes?: MapBoxFeatureType[]): string {
  const feature = findBestFeature(results, relevantTypes);
  return feature !== null ? textForMapboxFeature(feature) : "";
}

function convertOptionsToQueryParams<T extends BaseMapBoxGeocodingOptions>(options: T): MapBoxQueryOptions<T> {
  const { types, countries, ...params } = options;
  const queryParams = params as MapBoxQueryOptions<T>;
  queryParams.types = (types ?? ["place", "postcode"]).join(",");
  if (countries) {
    queryParams.countries = countries.join(",");
  }
  return queryParams;
}

function searchParams(options: MapBoxForwardGeocodingOptions | MapBoxReverseGeocodingOptions): URLSearchParams {
  const search = new URLSearchParams();
  const queryParams = convertOptionsToQueryParams(options);
  Object.entries(queryParams).forEach(([key, value]) => search.set(key, value.toString()));
  return search;
}

export async function textForLocation(longitudeDeg: number, latitudeDeg: number, options: MapBoxReverseGeocodingOptions): Promise<string> {
  const search = searchParams(options);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitudeDeg},${latitudeDeg}.json?${search.toString()}`;
  return fetch(url)
    .then(response => response.json())
    .then((result: MapBoxFeatureCollection) => {
      if (result.features.length === 0) {
        const ns = latitudeDeg >= 0 ? 'N' : 'S';
        const ew = longitudeDeg >= 0 ? 'E' : 'W';
        const lat = Math.abs(latitudeDeg).toFixed(3);
        const lon = Math.abs(longitudeDeg).toFixed(3);
        return `${lat}° ${ns}, ${lon}° ${ew}`;
      }
      return textForMapboxResults(result);
    });
}

export async function geocodingInfoForSearch(searchText: string, options: MapBoxForwardGeocodingOptions): Promise<MapBoxFeatureCollection> {
  const search = searchParams(options);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?${search.toString()}`;
  return fetch(url).then(response => response.json());
}
