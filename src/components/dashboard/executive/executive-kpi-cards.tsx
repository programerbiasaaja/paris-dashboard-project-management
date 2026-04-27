"use client";

import { DollarSign, FolderKanban, ClipboardCheck, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { executiveKpis } from "./dummy-data";

function formatRupiah(value: number) {
    if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)}M`;
    if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(0)}jt`;
    return `Rp ${value.toLocaleString("id-ID")}`;
}

const kpis = [
    {
        label: "Nilai Kontrak Total",
        value: formatRupiah(executiveKpis.totalContractValue),
        sub: `Anggaran ${formatRupiah(executiveKpis.totalBudget)}`,
        icon: DollarSign,
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        label: "Realisasi Biaya",
        value: formatRupiah(executiveKpis.totalCost),
        sub: `${executiveKpis.budgetAbsorptionRate}% penyerapan anggaran`,
        icon: TrendingUp,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
        label: "Portofolio Proyek",
        value: executiveKpis.totalProjects,
        sub: `${executiveKpis.activeProjects} aktif · ${executiveKpis.completedProjects} selesai · ${executiveKpis.onHoldProjects} ditunda`,
        icon: FolderKanban,
        color: "text-sky-600",
        bg: "bg-sky-100 dark:bg-sky-900/20",
    },
    {
        label: "Proyek Tepat Waktu",
        value: executiveKpis.onTimeProjects,
        sub: `${executiveKpis.delayedProjects} proyek terlambat`,
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-100 dark:bg-emerald-900/20",
    },
    {
        label: "Pengisian Survei",
        value: executiveKpis.totalSurveiSubmissions,
        sub: `${executiveKpis.SurveiApprovalRate}% tingkat persetujuan`,
        icon: ClipboardCheck,
        color: "text-violet-600",
        bg: "bg-violet-100 dark:bg-violet-900/20",
    },
    {
        label: "Eskalasi Terbuka",
        value: executiveKpis.openEscalations,
        sub: `${executiveKpis.slaBreached} SLA terlampaui`,
        icon: AlertTriangle,
        color: "text-rose-600",
        bg: "bg-rose-100 dark:bg-rose-900/20",
    },
];

export function ExecutiveKpiCards() {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {kpis.map((kpi) => {
                const Icon = kpi.icon;
                return (
                    <Card key={kpi.label} size="sm">
                        <CardContent className="flex items-start gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${kpi.bg}`}>
                                <Icon className={`h-4 w-4 ${kpi.color}`} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-muted-foreground truncate text-sm">{kpi.label}</p>
                                <p className="text-base leading-tight font-semibold">{kpi.value}</p>
                                <p className="text-muted-foreground text-xs">{kpi.sub}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
