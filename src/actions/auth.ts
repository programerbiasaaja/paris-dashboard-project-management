"use server";

import { sealSession, unsealSession } from "@/lib/session";

export const LogoutAction = async () => {
    try {
        await sealSession(null);
        return { status: "ok" };
    } catch (error: unknown) {
        return error;
    }
};

export const UpdateSessionAction = async (data: unknown) => {
    try {
        await sealSession(data);
        return data;
    } catch (error: unknown) {
        return error;
    }
};

export const getSession = async () => {
    try {
        const res = await unsealSession();

        if (!res || Object.keys(res).length === 0 || !res.session?.auth_session) {
            return null;
        }
        return res;
    } catch {
        return null;
    }
};
