import type { ILoginResponse, ISession } from "@/types";

export const createSessionPayload = (source: ILoginResponse): ISession => {
    const { user, session } = source;

    return {
        user: {
            user_fullname: user.user_fullname,
            user_id: user.user_id,
            user_uid: user.user_uid,
            user: user.user,
        },
        session: {
            auth_id: session.auth_id,
            auth_role: session.auth_role,
            auth_session: session.auth_session,
            auth_expired_on: session.auth_expired_on,
        },
    };
};
