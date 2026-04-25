"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ProjectSchedulesClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Jadwal Proyek"
            description="Atur timeline proyek, jadwal kunjungan site, milestone laporan, rapat koordinasi, dan tenggat approval klien."
        />
    );
}
