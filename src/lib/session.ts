import { CONFIG } from "@/config";
import { ISession } from "@/types";
import { sealData, unsealData } from "iron-session";
import { cookies } from "next/headers";

type CookieGetter = {
    get: (name: string) => { value: string } | undefined;
};

export const unsealSession = async (source?: string | CookieGetter): Promise<ISession | null> => {
    const sessionValue =
        typeof source === "string"
            ? source
            : source?.get(CONFIG.session.session_name)?.value || (await cookies()).get(CONFIG.session.session_name)?.value;

    return sessionValue
        ? await unsealData(sessionValue, {
              password: CONFIG?.session?.secret,
          })
        : null;
};

export const sealSession = async (sessionData: any) => {
    const cookieStore = await cookies();
    const normalizedSession = sessionData === null ? null : sessionData;

    const encryptedSession = await sealData(normalizedSession, {
        password: CONFIG?.session?.secret,
    });
    cookieStore.set(CONFIG.session.session_name, encryptedSession, {
        secure: false,
        maxAge: 60 * 60 * 30 * 24, // 30 Days
    });
    return encryptedSession;
};

export const SessionInvalid = (error: any): boolean => {
    const error_message = error?.error_message?.toLowerCase?.();
    if (error_message?.includes("session invalid") || error_message?.includes("unauthorized")) {
        return true;
    }
    return false;
};
