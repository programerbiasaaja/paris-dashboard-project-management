"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";
import {
    StatCards,
    ProjectStatusChart,
    TaskStatusChart,
    BudgetCostChart,
    MonthlyProgressChart,
    SubmissionTrendChart,
    UserRoleChart,
    TopProjectsTable,
} from "@/components/dashboard/overview";

export default function DashboardClient() {
    return (
        <div className="flex flex-1 flex-col gap-5">
            <AdminRouteScaffold
                eyebrow="Monitoring"
                title="Dashboard"
                description="Pantau statistik proyek, progres tugas, tren pengajuan survei, distribusi peran pengguna, dan perbandingan anggaran vs realisasi biaya per proyek."
            />

            <StatCards />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <MonthlyProgressChart />
                <BudgetCostChart />
                <SubmissionTrendChart />
                <ProjectStatusChart />
                <TaskStatusChart />
                <UserRoleChart />
            </div>

            <TopProjectsTable />
        </div>
    );
}
