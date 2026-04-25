import type { LucideIcon } from "lucide-react";

export type SidebarAccessMatchMode = "some" | "every";

export interface SidebarAccessRule {
    roles?: string[];
    permissions?: string[];
    capabilities?: string[];
    roleMode?: SidebarAccessMatchMode;
    permissionMode?: SidebarAccessMatchMode;
    capabilityMode?: SidebarAccessMatchMode;
}

export interface SidebarMenuItem {
    id: string;
    label: string;
    icon?: LucideIcon;
    href?: string;
    badge?: string;
    exact?: boolean;
    access?: SidebarAccessRule;
    children?: SidebarMenuItem[];
    meta?: Record<string, string | number | boolean>;
}

export interface SidebarMenuGroup {
    id: string;
    label: string;
    items: SidebarMenuItem[];
}

export interface SidebarAccessContext {
    roles: string[];
    permissions: string[];
    capabilities: string[];
}

export interface SidebarSearchItem {
    id: string;
    label: string;
    href: string;
    icon?: LucideIcon;
    groupLabel: string;
    trail: string[];
    badge?: string;
}
