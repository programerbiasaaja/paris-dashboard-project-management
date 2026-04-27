"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function SurveiTemplatesClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Survei"
            title="Template Survei"
            description="Kelola bank template survei, konfigurasi pertanyaan, tipe input, dan urutan tampilan formulir."
        />
    );
}
