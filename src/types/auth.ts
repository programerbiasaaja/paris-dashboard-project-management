import type { IUserWithRole } from "./user";

// =====================================
// AUTH / LOGIN
// =====================================

export interface ILoginUser {
    user_fullname: string;
    user_id: string;
    user_uid: string;
    user: IUserWithRole;
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
