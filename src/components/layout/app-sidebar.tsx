"use client";

import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { BrandIcon, BrandIconTextHorizontal } from "@/components/brand";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarMenuItem as SidebarPrimaryMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { sidebarGroups } from "@/config/sidebar";
import { getSidebarOpenIds, isSidebarItemActive } from "@/lib/sidebar";
import { cn } from "@/lib/utils";
import type { ISession, SidebarMenuItem } from "@/types";

const nestedButtonClassName =
    "flex h-7 w-full min-w-0 items-center gap-2 rounded-md px-2 text-left text-sidebar-foreground outline-hidden transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring";

interface SidebarNavContextProps {
    pathname: string;
    depth: number;
    openItems: Record<string, boolean>;
    onToggle: (id: string) => void;
}

interface SidebarNavTreeProps extends SidebarNavContextProps {
    items: SidebarMenuItem[];
}

function SidebarNavTree({ items, pathname, depth, openItems, onToggle }: SidebarNavTreeProps) {
    if (depth === 0) {
        return (
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarNavItem key={item.id} item={item} pathname={pathname} depth={depth} openItems={openItems} onToggle={onToggle} />
                ))}
            </SidebarMenu>
        );
    }

    return (
        <SidebarMenuSub className={cn(depth > 1 && "ml-2")}>
            {items.map((item) => (
                <SidebarNavItem key={item.id} item={item} pathname={pathname} depth={depth} openItems={openItems} onToggle={onToggle} />
            ))}
        </SidebarMenuSub>
    );
}

interface SidebarNavItemProps extends SidebarNavContextProps {
    item: SidebarMenuItem;
}

function SidebarNavItem({ item, pathname, depth, openItems, onToggle }: SidebarNavItemProps) {
    const hasChildren = Boolean(item.children?.length);
    const isActive = isSidebarItemActive(item, pathname);
    const isOpen = hasChildren ? (openItems[item.id] ?? isActive) : false;

    if (depth === 0) {
        return (
            <SidebarPrimaryMenuItem>
                {hasChildren ? (
                    <>
                        <SidebarMenuButton type="button" isActive={isActive} tooltip={item.label} onClick={() => onToggle(item.id)}>
                            {item.icon ? <item.icon className="text-gray-500" /> : null}
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        <SidebarMenuAction
                            type="button"
                            aria-label={`Toggle ${item.label}`}
                            onClick={(event) => {
                                event.stopPropagation();
                                onToggle(item.id);
                            }}
                        >
                            <ChevronRightIcon className={cn("transition-transform duration-200", isOpen && "rotate-90")} />
                        </SidebarMenuAction>
                        {isOpen ? (
                            <SidebarNavTree
                                items={item.children ?? []}
                                pathname={pathname}
                                depth={depth + 1}
                                openItems={openItems}
                                onToggle={onToggle}
                            />
                        ) : null}
                    </>
                ) : (
                    <>
                        <SidebarMenuButton render={item.href ? <Link href={item.href} /> : undefined} isActive={isActive} tooltip={item.label}>
                            {item.icon ? <item.icon className="text-gray-500" /> : null}
                            <span>{item.label}</span>
                        </SidebarMenuButton>
                        {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                    </>
                )}
            </SidebarPrimaryMenuItem>
        );
    }

    return (
        <SidebarMenuSubItem>
            {hasChildren ? (
                <>
                    <button
                        type="button"
                        className={cn(nestedButtonClassName, depth > 1 && "pl-3", isActive && "bg-sidebar-accent text-sidebar-accent-foreground")}
                        onClick={() => onToggle(item.id)}
                    >
                        {item.icon ? <item.icon className="size-3.5 shrink-0" /> : null}
                        <span className="truncate">{item.label}</span>
                        <ChevronRightIcon className={cn("ml-auto size-3.5 shrink-0 transition-transform duration-200", isOpen && "rotate-90")} />
                    </button>
                    {isOpen ? (
                        <SidebarNavTree items={item.children ?? []} pathname={pathname} depth={depth + 1} openItems={openItems} onToggle={onToggle} />
                    ) : null}
                </>
            ) : item.href ? (
                <SidebarMenuSubButton render={<Link href={item.href} />} isActive={isActive} className={cn(depth > 1 && "pl-3")}>
                    {item.icon ? <item.icon className="size-3.5 shrink-0" /> : null}
                    <span>{item.label}</span>
                    {item.badge ? (
                        <span className="bg-sidebar-accent text-sidebar-accent-foreground ml-auto rounded px-1.5 py-0.5 text-[10px] font-medium">
                            {item.badge}
                        </span>
                    ) : null}
                </SidebarMenuSubButton>
            ) : (
                <div className={cn(nestedButtonClassName, "cursor-default", depth > 1 && "pl-3")}>
                    {item.icon ? <item.icon className="size-3.5 shrink-0" /> : null}
                    <span>{item.label}</span>
                </div>
            )}
        </SidebarMenuSubItem>
    );
}

export function AppSidebar({ session }: { session: ISession | null }) {
    const pathname = usePathname();

    // const accessContext = useMemo(() => getSidebarAccessContext(session), [session]);
    // const navigation = useMemo(() => filterSidebarGroups(sidebarGroups, accessContext), [accessContext]);
    const navigation = sidebarGroups;
    const activeOpenIds = useMemo(() => getSidebarOpenIds(navigation, pathname), [navigation, pathname]);
    const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
    const handleToggle = (id: string) => {
        setOpenItems((current) => ({
            ...current,
            [id]: !(current[id] ?? activeOpenIds.has(id)),
        }));
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="items-center gap-3 px-3 py-4">
                <BrandIconTextHorizontal width={130} height={55} className="h-auto w-[130px] max-w-full group-data-[collapsible=icon]:hidden" />
                <BrandIcon width={32} height={44} className="hidden h-auto w-8 shrink-0 group-data-[collapsible=icon]:block" />
            </SidebarHeader>

            <SidebarContent>
                {navigation.length === 0 ? (
                    <div className="text-sidebar-foreground/70 px-4 py-2 text-sm">Tidak ada menu yang dapat diakses.</div>
                ) : (
                    navigation.map((group) => (
                        <SidebarGroup key={group.id}>
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarNavTree items={group.items} pathname={pathname} depth={0} openItems={openItems} onToggle={handleToggle} />
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))
                )}
            </SidebarContent>

            <SidebarFooter className="justify-left w-full flex-row items-center p-3">
                <SidebarTrigger className="border-border/70 hover:bg-accent rounded-lg text-gray-600" />
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}
