import { ISelect } from ".";

export interface IGeolocation {
    latitude: number;
    longitude: number;
}
export interface IGeolocationProvince {
    id: string;
    created_on: string;
    modified_on: null;
    deleted: number;
    name: string;
    lat: string;
    long: string;
}

export interface IGeolocationCity {
    id: number;
    created_on: string;
    modified_on: null;
    deleted: number;
    province_id: number;
    name: string;
    lat: string;
    long: string;
}

export interface IGeolocationDistrict {
    id: number;
    created_on: string;
    modified_on: null;
    deleted: number;
    city_id: number;
    name: string;
    lat: string;
    long: string;
}

export interface IGeolocationVillage {
    id: number;
    created_on: string;
    modified_on: string;
    deleted: number;
    district_id: number;
    code: string;
    name: string;
    lat: string;
    long: string;
}

export interface LocationItem {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon: string;
}

export interface IGooglePlacePrediction {
    description: string;
    matched_substrings: MatchedSubstring[];
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormatting;
    terms: Term[];
    types: string[];
}

export interface MatchedSubstring {
    length: number;
    offset: number;
}

export interface StructuredFormatting {
    main_text: string;
    main_text_matched_substrings: MatchedSubstring[];
    secondary_text: string;
}

export interface Term {
    offset: number;
    value: string;
}

export interface IAllGeo {
    id: string;
    district_id: string;
    name: string;
    lat: string;
    long: string;
    zipcode: number;
    district: {
        id: number;
        name: string;
        city: {
            id: string;
            name: string;
            province: {
                id: string;
                name: string;
            };
        };
    };
}

export interface ICountry {
    id: string;
    name: string;
    lat: string;
    long: string;
}

export interface ICountrySelect extends ICountry, ISelect {}
export interface IProvinceSelect extends IGeolocationProvince, ISelect {}
export interface ICitySelect extends IGeolocationCity, ISelect {}
export interface IDistrictSelect extends IGeolocationDistrict, ISelect {}
export interface IVillageSelect extends IGeolocationVillage, ISelect {}
