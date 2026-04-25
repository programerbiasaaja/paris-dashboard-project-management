"use server";

import { CONFIG } from "@/config";
import { API } from "@/lib/api";
import { DecryptQuery } from "@/lib/encryption";
import { createSessionPayload } from "@/lib/session-payload";
import { sealSession, unsealSession } from "@/lib/session";
import { ErrorMessage } from "@/lib/utils";
import type { ILoginResponse } from "@/types";
import { revalidateTag } from "next/cache";

export const ServerAPI = async (request: string) => {
    try {
        const session = await unsealSession();
        const { method, url, data, revalidateTagName } = DecryptQuery(request);
        if (!url.host) {
            return {
                status: "error",
                error_message: "host tidak terdeteksi " + JSON.stringify(url),
            };
        }
        const result = await API.FETCH({
            session: session,
            method: method,
            url: CONFIG.base_url[url.host as keyof typeof CONFIG.base_url] + url.path,
            body: data,
            headers: {
                ...(url.host === "geolocation" ? { Authorization: `Bearer ${CONFIG?.geolocation?.token}` } : {}),
            },
        });

        if (result.status != "error") {
            if (url.path.endsWith("/auth/login")) {
                try {
                    await sealSession(createSessionPayload(result.data as ILoginResponse));
                } catch (error) {
                    console.error(error);
                    return {
                        status: "error",
                        error_message: ErrorMessage(error) || "Gagal Login",
                    };
                }
            }
            if (revalidateTagName) {
                revalidateTag(revalidateTagName, "default");
            }
        }
        return result;
    } catch (error: unknown) {
        console.error(error);
        return {
            status: "error",
            error_message: ErrorMessage(error),
        };
    }
};
