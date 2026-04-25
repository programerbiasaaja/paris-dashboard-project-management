"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ProjectsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Proyek"
            description="Kelola daftar proyek konsultasi tambang, ruang lingkup pekerjaan, status kontrak, PIC, dan progres deliverable."
        />
    );
}
