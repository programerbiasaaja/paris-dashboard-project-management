"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";
import { ExecutiveKpiCards, PortfolioTable, BudgetRealizationChart, SurveiProgressChart, EscalationTable } from "@/components/dashboard/executive";

export default function ExecutiveReportClient() {
    return (
        <div className="flex flex-1 flex-col gap-5">
            <AdminRouteScaffold
                eyebrow="Monitoring"
                title="Laporan Eksekutif"
                description="Tinjauan strategis portofolio proyek: KPI anggaran dan penyerapan biaya per kuartal, tingkat persetujuan survei per proyek, status ketepatan waktu, dan log eskalasi aktif."
            />

            <ExecutiveKpiCards />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <BudgetRealizationChart />
                <SurveiProgressChart />
            </div>

            <PortfolioTable />

            <EscalationTable />
        </div>
    );
}
