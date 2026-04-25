"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function MiningSitesClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Administrasi"
            title="Site Tambang"
            description="Kelola data lokasi tambang, komoditas, status izin, area kerja, akses lapangan, dan catatan operasional site."
        />
    );
}
