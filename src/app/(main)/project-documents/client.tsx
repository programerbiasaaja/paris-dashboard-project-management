"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ProjectDocumentsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Dokumen Proyek"
            description="Kelola dokumen teknis, laporan progres, berita acara, data pendukung, dan riwayat revisi untuk setiap proyek."
        />
    );
}
