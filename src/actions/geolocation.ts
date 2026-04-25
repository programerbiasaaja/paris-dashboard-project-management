"use server";

import { CONFIG } from "@/config";
import { APIProvider } from "@/lib/api";
import { unsealSession } from "@/lib/session";

export const autoCompletePlaceAction = async ({ inputvalue }: { inputvalue: string }) => {
    try {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(inputvalue)}&key=${CONFIG.google_api.place}`,
        );

        if (!res.ok) throw new Error("Failed to fetch autocomplete data");

        const result = await res.json();
        if (result.status !== "OK") {
            throw new Error(result.error_message || `Google Places API error: ${result.status}`);
        }

        return result;
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; // penting: biar bisa ditangkap di client
    }
};

export const placeDetailAction = async ({ place_id }: { place_id: string }) => {
    try {
        const res = await fetch(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(place_id)}&key=${CONFIG.google_api.place}`,
        );

        if (!res.ok) throw new Error("Failed to fetch place details");

        const result = await res.json();
        if (result.status !== "OK") {
            throw new Error(result.error_message || `Google Places API error: ${result.status}`);
        }

        return result;
    } catch (error) {
        console.error("Place detail fetch error:", error);
        throw error; // penting agar bisa ditangkap di client
    }
};

export const fetchGeolocation = async ({ type, id }: { type: "provinces" | "cities" | "districts" | "villages"; id: string }) => {
    try {
        const session = await unsealSession();
        let URL;
        switch (type) {
            case "provinces":
                URL = `/geolocation/provinces?pagination=false`;
                break;
            case "cities":
                URL = `/geolocation/cities?province_id=${id}&pagination=false`;
                break;
            case "districts":
                URL = `/geolocation/districts?city_id=${id}&pagination=false`;
                break;
            case "villages":
                URL = `/geolocation/villages?district_id=${id}&pagination=false`;
                break;
            default:
                URL = "";
                break;
        }

        const result = await APIProvider({ session }).Endpoint("GET", "geolocation", URL).Result();

        return result?.data?.items || [];
    } catch (error) {
        console.error("ERROR FETCH GEO", error);
        return [];
    }
};

export const fetchSectorDerivatives = async ({
    type,
    id,
    sector,
}: {
    type: "sectors" | "programs" | "sub_programs";
    sector?: string;
    id?: string;
}) => {
    try {
        const session = await unsealSession();
        let URL;
        switch (type) {
            case "sectors":
                URL = `/sectors?pagination=false`;
                break;
            case "programs":
                URL = `/programs?level=1&sector=${sector}&pagination=false&status=active`;
                break;
            case "sub_programs":
                URL = `/programs?level=2&level_parent=${id}&pagination=false&status=active`;
                break;
            default:
                URL = "";
                break;
        }

        const result = await APIProvider({ session }).Endpoint("GET", "geolocation", URL).Result();

        if (type == "sectors") {
            return result?.data || [];
        }

        return result?.data?.items || [];
    } catch (error) {
        console.error("ERROR FETCH GEO", error);
        return [];
    }
};
