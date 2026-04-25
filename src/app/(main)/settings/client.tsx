"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function SettingsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Master Data"
            title="Pengaturan"
            description="Konfigurasi pengaturan umum sistem, preferensi aplikasi, dan parameter operasional."
        />
    );
}
