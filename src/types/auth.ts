export interface ILoginUserProfile {
    id: number;
    uid: string;
    name: string;
    email: string;
    phone: string;
    is_active: boolean;
    is_verified: boolean;
    internal_id: number | null;
    agency_id: number | null;
    agency_name: string | null;
    fininst_id: number | null;
    fininst_name: string | null;
    role: string;
    role_level: string;
    department: string | null;
    country_code: string;
}

export interface ILoginUser {
    user_fullname: string;
    user_id: number;
    user_uid: string;
    user: ILoginUserProfile;
}

export interface ILoginSession {
    auth_id: string;
    auth_role: string;
    auth_session: string;
    auth_expired_on: number;
}

export interface ILoginResponse {
    user: ILoginUser;
    session: ILoginSession;
}
