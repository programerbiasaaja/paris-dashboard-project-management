"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ProjectSchedulesClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Jadwal & Kegiatan"
            description="Kelola kegiatan proyek, urutan kegiatan, dan timeline pelaksanaan per kegiatan."
        />
    );
}
