"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function DashboardClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Monitoring"
            title="Dashboard"
            description="Pantau ringkasan proyek konsultasi tambang, progres deliverable, isu lapangan, dan status eskalasi manajemen."
        />
    );
}
