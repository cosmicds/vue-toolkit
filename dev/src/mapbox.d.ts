/** Interface describing a MapBox content item */
export interface MapBoxContextItem {
    id: string;
    mapbox_id: string;
    text: string;
    wikidata: string;
    short_code?: string;
}
export interface MapBoxFeature {
    place_type: string[];
    place_name: string;
    text?: string;
    properties: {
        short_code: string;
    };
    center: [number, number];
    context: MapBoxContextItem[];
}
/** Interface describing a MapBox feature collection, which is a GeoJSON object */
export interface MapBoxFeatureCollection {
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
/** Find the best feature from a collection of MapBox features.
  * We look for feature place types in the order: 'place', 'postcode', 'region', 'country'
  * @param collection The collection of items to search
  * @param relevantTypes The set of feature place types to consider. If not specified, we use the four types mentioned above
  * @returns The "best" feature, as described above
  */
export declare function findBestFeature(collection: MapBoxFeatureCollection, relevantTypes?: MapBoxFeatureType[]): MapBoxFeature | null;
/**
  * Create text describing a MapBox feature, based on the MapBox items inside of the feature's context
  * @param feature The MapBox feature
  * @param relevantTypes The item types inside the feature's context that we want to consider when creating the string. If not specified, we use 'place', 'postcode', 'region', and 'country'
  * @returns A string describing the feature
  */
export declare function textForMapboxFeature(feature: MapBoxFeature, relevantTypes?: MapBoxFeatureType[]): string;
/**
  * Return text describing the "best" feature in a MapBox collection.
  * See @link{findBestFeature} for a description of how a feature is chosen
  * @param results The feature collection to use
  * @param relevantTypes The item types inside the best feature's context that we want to consider when creating the string. If not specified, we use 'place', 'postcode', 'region', and 'country'
  */
export declare function textForMapboxResults(results: MapBoxFeatureCollection, relevantTypes?: MapBoxFeatureType[]): string;
/**
  * Obtain a string describing the given location in terms of NSEW directions - for example: 10° N, 25° W
  * @param longitudeDeg The longitude of the location, in degrees
  * @param latitudeDeg The latitude of the location, in degrees
  * @returns A string describing the given coordinates
  */
export declare function latitudeLongitudeText(longitudeDeg: number, latitudeDeg: number): string;
/**
  * Obtain text describing a given longitude and latitude based on a MapBox reverse geocoding query
  * @param longitudeDeg The longitude of the location, in degrees
  * @param latitudeDeg The latitude of the location, in degrees
  * @param options Options for the MapBox reverse geocoding
  * @returns A promise that resolves to the string describing the given coordinates
  */
export declare function textForLocation(longitudeDeg: number, latitudeDeg: number, options: MapBoxReverseGeocodingOptions): Promise<string>;
/**
  * Obtain a collection of MapBox items obtained from performing a forward geocoding query for a particular search string.
  * Note that the number of items returned is set by the `limit` field in your options.
  * If `limit` is not specified, the MapBox default is 5
  * @param searchText The search string
  * @param options Options for the MapBox forward geocoding
  * @returns A promise that resolves to the found collection of MapBox items
  */
export declare function geocodingInfoForSearch(searchText: string, options: MapBoxForwardGeocodingOptions): Promise<MapBoxFeatureCollection>;
export {};
