"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ExecutiveReportClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Monitoring"
            title="Laporan Eksekutif"
            description="Sajikan ringkasan eksekutif: status portofolio proyek, anggaran vs realisasi, progres survei, dan eskalasi."
        />
    );
}
