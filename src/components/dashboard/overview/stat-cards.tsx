"use client";

import { FolderKanban, CheckCircle2, Clock, PauseCircle, ListTodo, Users, Wallet, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { overviewStats } from "./dummy-data";

function formatRupiah(value: number) {
    if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)}M`;
    if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(0)}jt`;
    return `Rp ${value.toLocaleString("id-ID")}`;
}

const stats = [
    {
        label: "Total Proyek",
        value: overviewStats.totalProjects,
        sub: `${overviewStats.activeProjects} aktif`,
        icon: FolderKanban,
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        label: "Proyek Selesai",
        value: overviewStats.completedProjects,
        sub: `${overviewStats.onHoldProjects} ditunda`,
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
        label: "Total Tugas",
        value: overviewStats.totalTasks,
        sub: `${overviewStats.doneTasks} selesai`,
        icon: ListTodo,
        color: "text-sky-600",
        bg: "bg-sky-100 dark:bg-sky-900/20",
    },
    {
        label: "Tugas Tindak Lanjut",
        value: overviewStats.followUpTasks,
        sub: `${overviewStats.holdTasks} ditunda`,
        icon: Clock,
        color: "text-amber-600",
        bg: "bg-amber-100 dark:bg-amber-900/20",
    },
    {
        label: "Pengisian Survei",
        value: overviewStats.totalSurveySubmissions,
        sub: `${overviewStats.pendingSubmissions} menunggu`,
        icon: PauseCircle,
        color: "text-violet-600",
        bg: "bg-violet-100 dark:bg-violet-900/20",
    },
    {
        label: "Total Pengguna",
        value: overviewStats.totalUsers,
        sub: `${overviewStats.totalClients} klien`,
        icon: Users,
        color: "text-rose-600",
        bg: "bg-rose-100 dark:bg-rose-900/20",
    },
    {
        label: "Total Anggaran",
        value: formatRupiah(overviewStats.totalBudget),
        sub: `Kontrak ${formatRupiah(overviewStats.totalContractValue)}`,
        icon: Wallet,
        color: "text-primary",
        bg: "bg-primary/10",
    },
    {
        label: "Realisasi Biaya",
        value: formatRupiah(overviewStats.totalCost),
        sub: `${Math.round((overviewStats.totalCost / overviewStats.totalBudget) * 100)}% dari anggaran`,
        icon: TrendingUp,
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900/20",
    },
];

export function StatCards() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                    <Card key={stat.label} size="sm">
                        <CardContent className="flex items-start gap-3">
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${stat.bg}`}>
                                <Icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-muted-foreground truncate text-sm">{stat.label}</p>
                                <p className="text-base leading-tight font-semibold">{stat.value}</p>
                                <p className="text-xs">{stat.sub}</p>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
