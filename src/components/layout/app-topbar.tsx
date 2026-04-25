"use client";

import { ChevronDownIcon, ChevronRightIcon, LogOutIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { sidebarGroups } from "@/config/sidebar";
import { filterSidebarGroups, flattenSidebarGroups, getSidebarAccessContext } from "@/lib/sidebar";
import type { ISession } from "@/types";

const getDisplayName = (session: ISession | null) => session?.user?.user?.name || session?.user?.user_fullname || "Admin UmrohQU";

const getRoleLabel = (session: ISession | null) => {
    const role = session?.session?.auth_role || session?.user?.user?.role || "admin";

    return role
        .split("-")
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(" ");
};

const getInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("");

export function AppTopbar({ session }: { session: ISession | null }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isMobile, state } = useSidebar();
    const displayName = getDisplayName(session);
    const roleLabel = getRoleLabel(session);
    const [open, setOpen] = useState(false);
    const accessContext = useMemo(() => getSidebarAccessContext(session), [session]);
    const searchItems = useMemo(() => {
        const navigation = filterSidebarGroups(sidebarGroups, accessContext);
        return flattenSidebarGroups(navigation);
    }, [accessContext]);
    const itemsByGroup = useMemo(() => {
        return searchItems.reduce<Record<string, typeof searchItems>>((result, item) => {
            result[item.groupLabel] = [...(result[item.groupLabel] ?? []), item];
            return result;
        }, {});
    }, [searchItems]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                setOpen((current) => !current);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const topbarStyle = useMemo<CSSProperties>(() => {
        if (isMobile) {
            return {
                top: 0,
                left: 0,
                right: 0,
            };
        }

        return {
            top: "0",
            right: "0",
            left: state === "collapsed" ? "calc(var(--sidebar-width-icon) + 1.5rem)" : "var(--sidebar-width)",
        };
    }, [isMobile, state]);

    return (
        <>
            <header className="border-border/60 bg-topbar fixed z-30 border-b backdrop-blur" style={topbarStyle}>
                <div className="px-4 py-2.5">
                    <div className="flex min-w-0 items-center justify-between gap-3">
                        <div className="flex min-w-0 flex-1 items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="border-input hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-8 max-w-sm min-w-0 flex-1 items-center rounded-lg border bg-transparent px-3 text-left text-xs transition-colors outline-none focus-visible:ring-3"
                            >
                                <SearchIcon className="text-muted-foreground mr-2 size-3.5 shrink-0" />
                                <span className="text-muted-foreground truncate text-xs">Cari menu dashboard...</span>
                                <kbd className="border-input bg-muted/60 text-muted-foreground ml-auto hidden rounded-md border px-1.5 py-0.5 text-[10px] font-medium lg:inline-flex">
                                    Ctrl K
                                </kbd>
                            </button>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <button
                                        type="button"
                                        className="focus-visible:border-ring focus-visible:ring-ring/50 flex shrink-0 items-center gap-3 px-1.5 py-1 transition-colors outline-none focus-visible:ring-3"
                                    />
                                }
                            >
                                <div className="hidden min-w-0 text-right md:block">
                                    <p className="text-foreground truncate text-sm font-semibold">{displayName}</p>
                                    <p className="text-muted-foreground truncate text-xs">{roleLabel}</p>
                                </div>
                                <Avatar size="lg" className="ring-background ring-2">
                                    <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
                                </Avatar>
                                <ChevronDownIcon className="text-muted-foreground hidden size-4 md:block" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <div className="min-w-0">
                                            <p className="text-foreground truncate text-sm font-semibold">{displayName}</p>
                                            <p className="text-muted-foreground truncate text-xs">{roleLabel}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem render={<Link href="/logout" />}>
                                    <LogOutIcon />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <CommandDialog
                open={open}
                onOpenChange={setOpen}
                title="Cari Menu"
                description="Cari dan buka menu admin UmrohQU"
                className="sm:max-w-2xl"
            >
                <Command className="border-border/70 bg-background rounded-none border">
                    <CommandInput placeholder="Cari menu berdasarkan nama, grup, atau jalur menu..." />
                    <CommandList>
                        <CommandEmpty>Tidak ada menu yang cocok.</CommandEmpty>
                        {Object.entries(itemsByGroup).map(([groupLabel, items]) => (
                            <CommandGroup key={groupLabel} heading={groupLabel}>
                                {items.map((item) => {
                                    const isActive = pathname === item.href;

                                    return (
                                        <CommandItem
                                            key={item.id}
                                            value={`${item.label} ${item.groupLabel} ${item.trail.join(" ")}`}
                                            onSelect={() => {
                                                setOpen(false);
                                                router.push(item.href);
                                            }}
                                            className="rounded-none"
                                        >
                                            {item.icon ? <item.icon className="text-muted-foreground size-4" /> : null}
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <span className="truncate font-medium">{item.label}</span>
                                                    {item.badge ? (
                                                        <span className="border-border bg-muted text-muted-foreground border px-1.5 py-0.5 text-[10px]">
                                                            {item.badge}
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                                    <span>{item.groupLabel}</span>
                                                    {item.trail.length > 1 ? (
                                                        <>
                                                            <ChevronRightIcon className="size-3" />
                                                            <span className="truncate">{item.trail.slice(0, -1).join(" / ")}</span>
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                            <CommandShortcut>{isActive ? "Aktif" : "Buka"}</CommandShortcut>
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        ))}
                    </CommandList>
                </Command>
            </CommandDialog>
        </>
    );
}
