"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ExecutiveReportClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Monitoring"
            title="Laporan Eksekutif"
            description="Sajikan status portofolio proyek, progres pekerjaan, risiko utama, dan keputusan yang membutuhkan perhatian direksi."
        />
    );
}
