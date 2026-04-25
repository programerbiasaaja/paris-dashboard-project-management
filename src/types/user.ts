import type { IRole } from "./role";

// =====================================
// USER (MASTER DATA)
// =====================================

export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: number;
    google_token: string;
    roleId: string;
    password: string;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface IUserWithRole extends IUser {
    role: IRole;
}
