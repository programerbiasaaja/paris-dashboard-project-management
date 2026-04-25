"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function UsersClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Master Data"
            title="Pengguna"
            description="Kelola data pengguna sistem, role akses, informasi kontak, dan status akun."
        />
    );
}
