"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function RolesClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Master Data"
            title="Role & Akses"
            description="Kelola role pengguna, konfigurasi hak akses modul (CRUD), dan atur tingkat otorisasi per role."
        />
    );
}
