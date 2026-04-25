"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function AccessControlClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Administrasi"
            title="Manajemen Akses"
            description="Kelola role, permission, dan akses pengguna untuk menjaga kontrol operasional serta audit aktivitas dashboard."
        />
    );
}
