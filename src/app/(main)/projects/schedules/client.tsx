"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ProjectSchedulesClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Jadwal & Fase"
            description="Kelola fase proyek (WBS), urutan pekerjaan, dan timeline pelaksanaan per fase."
        />
    );
}
