import { ServerAPI } from "@/actions/api";
import { UpdateSessionAction } from "@/actions/auth";
import { BaseURLKey } from "@/config";
import { EncryptQuery } from "@/lib/encryption";
import { ISession } from "@/types";
import { toast } from "sonner";

export const generateHeader: any = (session: ISession) => ({
    "Content-Type": "application/json",
    "x-auth-token": session?.session?.auth_session || "",
    "x-user-uid": session?.user?.user_uid || "",
});

interface IApi {
    session: any;
    method: "POST" | "PATCH" | "DELETE" | "GET";
    body?: any;
    url: string;
    headers?: any;
    next?: NextFetchRequestConfig;
}

export const API = {
    FETCH: async ({ session, method, url, headers, next, body }: IApi) => {
        const res = await fetch(url, {
            method: method || "GET",
            ...(body && {
                body: JSON.stringify(body),
            }),
            headers: {
                ...generateHeader(session),
                ...headers,
            },
            cache: "no-store",
            ...(next && {
                next: next,
            }),
        });

        const data = await res.json();

        if (data?.status == "error") throw data;

        return data;
    },
};

type EMethod = "GET" | "POST" | "PATCH" | "DELETE";

export const APIProvider = (userSession: any) => {
    const session = userSession;
    let url: {
        host: string;
        path: string;
    };
    let body: any;
    let method: EMethod = "GET";
    let response: any;
    let tag: string;
    const actions = {
        Endpoint: (actionMethod: EMethod, host: BaseURLKey, endpoint: string) => {
            url = {
                host,
                path: endpoint,
            };
            method = actionMethod;

            return actions;
        },
        Data: (data: any) => {
            body = data;
            return actions;
        },
        Result: async () => {
            response = await ServerAPI(
                EncryptQuery({
                    method,
                    data: body,
                    url,
                    revalidateTagName: tag,
                    session,
                }),
            );

            if (response?.status === "error" && typeof window !== "undefined") {
                const errorMessage = response?.error_message?.toLowerCase() || "";
                if (errorMessage.includes("unauthorized") || errorMessage.includes("not authorized")) {
                    toast.error("Sesi Habis", {
                        description: "Sesi Anda telah habis. Silakan login kembali.",
                    });
                    await UpdateSessionAction(null);
                    window.location.href = `/login?path=${EncryptQuery({ session_invalid: "true", from: window.location.pathname })}`;
                }
            }

            return response;
        },
        Revalidate: (tagName: string) => {
            tag = tagName;
            return actions;
        },
    };
    return actions;
};
