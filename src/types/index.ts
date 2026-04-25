export * from "./auth";
export * from "./geolocation";
export * from "./sidebar";
export * from "./content";

import type { ILoginSession, ILoginUser } from "./auth";

export interface ISession {
    user: ILoginUser;
    session: ILoginSession;
}

export interface ISelect {
    value: string | number;
    label: string;
}

export interface FileItemGCP {
    name: string;
    url: string;
}
export interface ITable<T> {
    items: T[];
    total_items: number;
    total_pages: number;
    current_page: number;
    filters: Record<string, string>;
    size: number;
    page: number;
}
