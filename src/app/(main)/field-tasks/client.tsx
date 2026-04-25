"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function FieldTasksClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Tugas Lapangan"
            description="Pantau aktivitas survei, pengambilan data, inspeksi site, temuan lapangan, dan tindak lanjut tim konsultan."
        />
    );
}
