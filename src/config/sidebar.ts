import {
    Building2Icon,
    CalendarDaysIcon,
    ChartNoAxesCombinedIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    FileTextIcon,
    FolderKanbanIcon,
    LayoutGridIcon,
    ListChecksIcon,
    Settings2Icon,
    ShieldCheckIcon,
    UsersRoundIcon,
} from "lucide-react";

import { EUserRole } from "@/types/enums";
import type { SidebarMenuGroup } from "@/types/sidebar";

const ALL_ROLES = [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER, EUserRole.SURVEYOR, EUserRole.FINANCE];
const MANAGEMENT_ROLES = [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER, EUserRole.FINANCE];
const ADMIN_ONLY = [EUserRole.SUPER_ADMIN];

export const sidebarGroups: SidebarMenuGroup[] = [
    // =========================================
    // MONITORING
    // =========================================
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
                access: { roles: ALL_ROLES },
            },
            {
                id: "laporan-eksekutif",
                label: "Laporan Eksekutif",
                href: "/reports/executive",
                icon: ChartNoAxesCombinedIcon,
                access: { roles: MANAGEMENT_ROLES },
            },
        ],
    },

    // =========================================
    // MANAJEMEN PROYEK (Project, Phase, Task)
    // =========================================
    {
        id: "project-management",
        label: "Manajemen Proyek",
        items: [
            {
                id: "proyek",
                label: "Proyek",
                href: "/projects",
                icon: FolderKanbanIcon,
                access: { roles: ALL_ROLES },
            },
            {
                id: "jadwal-proyek",
                label: "Jadwal & Fase",
                href: "/projects/schedules",
                icon: CalendarDaysIcon,
                access: { roles: [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER] },
            },
            {
                id: "tugas",
                label: "Tugas",
                href: "/tasks",
                icon: ClipboardListIcon,
                access: { roles: [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER, EUserRole.SURVEYOR] },
            },
        ],
    },

    // =========================================
    // SURVEI (SurveyQuestion, Submission, Answer, Template)
    // =========================================
    {
        id: "survey",
        label: "Survei",
        items: [
            {
                id: "pengisian-survei",
                label: "Pengisian Survei",
                href: "/surveys/submissions",
                icon: ClipboardCheckIcon,
                access: { roles: [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER, EUserRole.SURVEYOR] },
            },
            {
                id: "template-survei",
                label: "Template Survei",
                href: "/surveys/templates",
                icon: FileTextIcon,
                access: { roles: [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER] },
            },
            {
                id: "review-survei",
                label: "Review Survei",
                href: "/surveys/reviews",
                icon: ListChecksIcon,
                access: { roles: [EUserRole.SUPER_ADMIN, EUserRole.PROJECT_MANAGER] },
            },
        ],
    },

    // =========================================
    // MASTER DATA (Client, User, Role)
    // =========================================
    {
        id: "master-data",
        label: "Master Data",
        items: [
            {
                id: "klien",
                label: "Klien",
                href: "/clients",
                icon: Building2Icon,
                access: { roles: MANAGEMENT_ROLES },
            },
            {
                id: "pengguna",
                label: "Pengguna",
                href: "/users",
                icon: UsersRoundIcon,
                access: { roles: ADMIN_ONLY },
            },
            {
                id: "role-akses",
                label: "Role & Akses",
                href: "/roles",
                icon: ShieldCheckIcon,
                access: { roles: ADMIN_ONLY },
            },
            {
                id: "pengaturan",
                label: "Pengaturan",
                href: "/settings",
                icon: Settings2Icon,
                access: { roles: ADMIN_ONLY },
            },
        ],
    },
];
