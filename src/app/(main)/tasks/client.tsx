"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function TasksClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Manajemen Proyek"
            title="Tugas"
            description="Kelola tugas dan kegiatan lapangan, penugasan surveyor, bobot pekerjaan, anggaran, dan status progres."
        />
    );
}
