import type { ILoginResponse, ISession } from "@/types";

export const createSessionPayload = (source: ILoginResponse): ISession => {
    const { user, session } = source;
    const userProfile = user.user;

    return {
        user: {
            user_fullname: user.user_fullname,
            user_id: user.user_id,
            user_uid: user.user_uid,
            user: {
                id: userProfile.id,
                uid: userProfile.uid,
                name: userProfile.name,
                email: userProfile.email,
                phone: userProfile.phone,
                is_active: userProfile.is_active,
                is_verified: userProfile.is_verified,
                internal_id: userProfile.internal_id,
                agency_id: userProfile.agency_id,
                agency_name: userProfile.agency_name,
                fininst_id: userProfile.fininst_id,
                fininst_name: userProfile.fininst_name,
                role: userProfile.role,
                role_level: userProfile.role_level,
                department: userProfile.department,
                country_code: userProfile.country_code,
            },
        },
        session: {
            auth_id: session.auth_id,
            auth_role: session.auth_role,
            auth_session: session.auth_session,
            auth_expired_on: session.auth_expired_on,
        },
    };
};
