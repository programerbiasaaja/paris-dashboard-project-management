import {
    Building2Icon,
    CalendarDaysIcon,
    ChartNoAxesCombinedIcon,
    ClipboardListIcon,
    FileTextIcon,
    FolderKanbanIcon,
    HardHatIcon,
    LayoutGridIcon,
    Settings2Icon,
    UsersRoundIcon,
} from "lucide-react";

import type { SidebarMenuGroup } from "@/types/sidebar";

export const sidebarGroups: SidebarMenuGroup[] = [
    {
        id: "monitoring",
        label: "Monitoring",
        items: [
            {
                id: "dashboard",
                label: "Dashboard",
                href: "/",
                exact: true,
                icon: LayoutGridIcon,
                access: {
                    roles: ["admin", "ops", "finance", "support", "management", "super-admin"],
                },
            },
            {
                id: "laporan-eksekutif",
                label: "Laporan Eksekutif",
                href: "/reports/executive",
                icon: ChartNoAxesCombinedIcon,
                access: {
                    roles: ["admin", "finance", "management", "super-admin"],
                },
            },
        ],
    },
    {
        id: "project-management",
        label: "Manajemen Proyek",
        items: [
            {
                id: "proyek",
                label: "Proyek",
                href: "/projects",
                icon: FolderKanbanIcon,
                access: {
                    roles: ["admin", "ops", "finance", "support", "management", "super-admin"],
                },
            },
            {
                id: "tugas-lapangan",
                label: "Tugas Lapangan",
                href: "/field-tasks",
                icon: ClipboardListIcon,
                access: {
                    roles: ["admin", "ops", "support", "management", "super-admin"],
                },
            },
            {
                id: "jadwal-proyek",
                label: "Jadwal Proyek",
                href: "/project-schedules",
                icon: CalendarDaysIcon,
                access: {
                    roles: ["admin", "ops", "support", "management", "super-admin"],
                },
            },
            {
                id: "dokumen-proyek",
                label: "Dokumen Proyek",
                href: "/project-documents",
                icon: FileTextIcon,
                access: {
                    roles: ["admin", "ops", "support", "management", "super-admin"],
                },
            },
        ],
    },
    {
        id: "administrasi",
        label: "Administrasi",
        items: [
            {
                id: "klien",
                label: "Klien",
                href: "/clients",
                icon: Building2Icon,
                access: {
                    roles: ["admin", "ops", "finance", "management", "super-admin"],
                },
            },
            {
                id: "site-tambang",
                label: "Site Tambang",
                href: "/mining-sites",
                icon: HardHatIcon,
                access: {
                    roles: ["admin", "ops", "support", "management", "super-admin"],
                },
            },
            {
                id: "tim-konsultan",
                label: "Konsultan",
                href: "/users/consultants",
                icon: UsersRoundIcon,
                access: {
                    roles: ["admin", "super-admin"],
                },
            },
            {
                id: "manajemen-akses",
                label: "Manajemen Akses",
                href: "/settings/access-control",
                icon: Settings2Icon,
                access: {
                    roles: ["admin", "super-admin"],
                },
            },
        ],
    },
];
