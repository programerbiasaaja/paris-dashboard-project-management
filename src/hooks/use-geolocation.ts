"use client";

import { fetchGeolocation } from "@/actions/geolocation";
import { useLoading } from "@/provider/loader-provider";
import { ICitySelect, IDistrictSelect, IGeolocationCity, IGeolocationDistrict, IGeolocationProvince, IProvinceSelect, IVillageSelect } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";

const useGeolocation = ({
    provinces,
    defaultGeo,
}: {
    provinces: IGeolocationProvince[];
    defaultGeo?: {
        province_id?: string | null;
        city_id?: string | null;
        village_id?: string | null;
    };
}): {
    listProvince: IProvinceSelect[];
    listCities: ICitySelect[];
    listDistrict: IDistrictSelect[];
    listVillage: IVillageSelect[];
    changeProvince: (value: any) => void;
    changeCity: (value: any) => void;
    changeDistrict: (value: any) => void;
} => {
    const { setIsLoading } = useLoading();

    const [list, setList] = useState({
        cities: [],
        city_id: 0,
        districts: [],
        district_id: 0,
        villages: [],
        village_id: 0,
    });

    const listProvince = useMemo(() => {
        return provinces?.map((province) => ({ ...province, value: province?.id, label: province?.name }));
    }, [provinces]);

    const changeProvince = useCallback(async (value: IProvinceSelect) => {
        const res = await fetchGeolocation({ type: "cities", id: value?.id });

        const listCities = res?.map((city: any) => ({
            ...city,
            value: city?.id,
            label: city?.name,
        }));

        setList((prev) => ({
            ...prev,
            cities: listCities,
            districts: [],
        }));
    }, []);

    const changeCity = useCallback(async (value: any) => {
        const data = await fetchGeolocation({
            type: "districts",
            id: value?.id,
        });
        const listDistricts = data?.map((district: any) => ({
            ...district,
            value: district?.id,
            label: district?.name,
        }));

        setList((prev) => ({
            ...prev,
            city_id: value?.id,
            districts: listDistricts,
        }));
    }, []);

    const changeDistrict = useCallback(async (value: any) => {
        const data = await fetchGeolocation({
            type: "villages",
            id: value?.id,
        });
        const listVillages = data?.map((village: any) => ({
            ...village,
            value: village?.id,
            label: village?.name,
        }));

        setList((prev) => ({
            ...prev,
            city_id: value?.id,
            villages: listVillages,
        }));
    }, []);

    useEffect(() => {
        async function initialFetch() {
            try {
                setIsLoading(true);
                if (defaultGeo?.province_id) {
                    let districts = [];

                    const cities = await fetchGeolocation({ type: "cities", id: defaultGeo?.province_id });
                    const listCities = cities?.map((city: IGeolocationCity) => ({
                        ...city,
                        value: city?.id,
                        label: city?.name,
                    }));

                    if (defaultGeo?.city_id) {
                        const resDistricts = await fetchGeolocation({ type: "districts", id: defaultGeo?.city_id });
                        const listDistricts = resDistricts?.map((district: IGeolocationDistrict) => ({
                            ...district,
                            value: district?.id,
                            label: district?.name,
                        }));

                        districts = listDistricts;
                    }

                    setList({ ...list, districts, cities: listCities });
                }
            } catch (error: any) {
                console.log("Failed get init geo", error);
            } finally {
                setIsLoading(false);
            }
        }

        if (defaultGeo?.province_id) {
            initialFetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        listProvince,
        listCities: list?.cities,
        listDistrict: list?.districts,
        listVillage: list?.villages,
        changeProvince,
        changeCity,
        changeDistrict,
    };
};

export default useGeolocation;
