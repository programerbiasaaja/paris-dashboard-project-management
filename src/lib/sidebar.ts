import type { ISession, SidebarAccessContext, SidebarAccessMatchMode, SidebarAccessRule, SidebarMenuGroup, SidebarMenuItem, SidebarSearchItem } from "@/types";

const normalizeAccessToken = (value: string) => value.trim().toLowerCase();

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null;

const toStringArray = (value: unknown): string[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    return value
        .filter((entry): entry is string => typeof entry === "string" && entry.trim().length > 0)
        .map(normalizeAccessToken);
};

const toOptionalString = (value: unknown) =>
    typeof value === "string" && value.trim().length > 0 ? normalizeAccessToken(value) : null;

const unique = (values: string[]) => [...new Set(values)];

const matchesRequirement = (
    required: string[] | undefined,
    current: string[],
    mode: SidebarAccessMatchMode = "some",
) => {
    if (!required?.length) {
        return true;
    }

    const normalizedRequired = required.map(normalizeAccessToken);

    return mode === "every"
        ? normalizedRequired.every((value) => current.includes(value))
        : normalizedRequired.some((value) => current.includes(value));
};

const normalizePath = (pathname: string) => {
    if (pathname.length > 1 && pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }

    return pathname;
};

export const getSidebarAccessContext = (session: ISession | null): SidebarAccessContext => {
    const root = isRecord(session) ? session : null;
    const user = isRecord(root?.user) ? root.user : null;
    const nestedUser = isRecord(user?.user) ? user.user : null;
    const sessionMeta = isRecord(root?.session) ? root.session : null;

    return {
        roles: unique(
            [
                ...toStringArray(root?.roles),
                ...toStringArray(user?.roles),
                ...toStringArray(nestedUser?.roles),
                ...toStringArray(sessionMeta?.roles),
                toOptionalString(user?.role),
                toOptionalString(nestedUser?.role),
                toOptionalString(sessionMeta?.auth_role),
            ].filter((value): value is string => Boolean(value)),
        ),
        permissions: unique(
            [
                ...toStringArray(root?.permissions),
                ...toStringArray(user?.permissions),
                ...toStringArray(nestedUser?.permissions),
                ...toStringArray(sessionMeta?.permissions),
            ],
        ),
        capabilities: unique(
            [
                ...toStringArray(root?.capabilities),
                ...toStringArray(user?.capabilities),
                ...toStringArray(nestedUser?.capabilities),
                ...toStringArray(sessionMeta?.capabilities),
            ],
        ),
    };
};

export const canAccessSidebarItem = (
    access: SidebarAccessRule | undefined,
    context: SidebarAccessContext,
) => {
    if (!access) {
        return true;
    }

    return (
        matchesRequirement(access.roles, context.roles, access.roleMode) &&
        matchesRequirement(access.permissions, context.permissions, access.permissionMode) &&
        matchesRequirement(access.capabilities, context.capabilities, access.capabilityMode)
    );
};

export const filterSidebarItems = (
    items: SidebarMenuItem[],
    context: SidebarAccessContext,
): SidebarMenuItem[] => {
    return items.reduce<SidebarMenuItem[]>((result, item) => {
        if (!canAccessSidebarItem(item.access, context)) {
            return result;
        }

        const filteredChildren = item.children ? filterSidebarItems(item.children, context) : undefined;

        if (item.children && (!filteredChildren || filteredChildren.length === 0)) {
            return result;
        }

        result.push({
            ...item,
            ...(filteredChildren ? { children: filteredChildren } : {}),
        });

        return result;
    }, []);
};

export const filterSidebarGroups = (
    groups: SidebarMenuGroup[],
    context: SidebarAccessContext,
): SidebarMenuGroup[] => {
    return groups.reduce<SidebarMenuGroup[]>((result, group) => {
        const items = filterSidebarItems(group.items, context);

        if (items.length === 0) {
            return result;
        }

        result.push({
            ...group,
            items,
        });

        return result;
    }, []);
};

const isPathMatch = (href: string, pathname: string, exact = false) => {
    const normalizedHref = normalizePath(href);
    const normalizedPathname = normalizePath(pathname);

    if (exact || normalizedHref === "/") {
        return normalizedPathname === normalizedHref;
    }

    return (
        normalizedPathname === normalizedHref ||
        normalizedPathname.startsWith(`${normalizedHref}/`)
    );
};

export const isSidebarItemActive = (item: SidebarMenuItem, pathname: string): boolean => {
    if (item.href && isPathMatch(item.href, pathname, item.exact)) {
        return true;
    }

    return item.children?.some((child) => isSidebarItemActive(child, pathname)) ?? false;
};

export const getSidebarOpenIds = (
    groups: SidebarMenuGroup[],
    pathname: string,
) => {
    const openIds = new Set<string>();

    const visitItem = (item: SidebarMenuItem): boolean => {
        const hasActiveChild = item.children?.some((child) => visitItem(child)) ?? false;
        const isActive = item.href ? isPathMatch(item.href, pathname, item.exact) : false;

        if (hasActiveChild) {
            openIds.add(item.id);
        }

        return isActive || hasActiveChild;
    };

    for (const group of groups) {
        for (const item of group.items) {
            visitItem(item);
        }
    }

    return openIds;
};

export const flattenSidebarGroups = (
    groups: SidebarMenuGroup[],
): SidebarSearchItem[] => {
    const result: SidebarSearchItem[] = [];

    const visitItem = (
        item: SidebarMenuItem,
        groupLabel: string,
        trail: string[],
    ) => {
        const nextTrail = [...trail, item.label];

        if (item.href) {
            result.push({
                id: item.id,
                label: item.label,
                href: item.href,
                icon: item.icon,
                groupLabel,
                trail: nextTrail,
                badge: item.badge,
            });
        }

        for (const child of item.children ?? []) {
            visitItem(child, groupLabel, nextTrail);
        }
    };

    for (const group of groups) {
        for (const item of group.items) {
            visitItem(item, group.label, []);
        }
    }

    return result;
};
