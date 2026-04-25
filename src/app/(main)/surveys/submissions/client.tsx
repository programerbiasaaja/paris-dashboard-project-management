"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function SurveySubmissionsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Survei"
            title="Pengisian Survei"
            description="Lihat dan kelola pengisian survei lapangan oleh surveyor, termasuk jawaban dan status persetujuan."
        />
    );
}
