"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function SurveiSubmissionsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Survei"
            title="Pengisian Survei"
            description="Lihat dan kelola pengisian survei lapangan oleh Surveior, termasuk jawaban dan status persetujuan."
        />
    );
}
