"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EProjectStatus, ProjectStatusLabels } from "@/types/enums";
import { portfolioProjects } from "./dummy-data";

function formatRupiah(value: number) {
    return `Rp ${(value / 1_000_000_000).toFixed(2)}M`;
}

function statusClass(status: EProjectStatus) {
    if (status === EProjectStatus.DONE) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (status === EProjectStatus.HOLD) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
}

export function PortfolioTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Portofolio Proyek</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-muted-foreground border-b text-left text-xs">
                                <th className="px-4 py-2 font-medium">Nama Proyek</th>
                                <th className="px-4 py-2 font-medium">Klien</th>
                                <th className="px-4 py-2 font-medium">Status</th>
                                <th className="px-4 py-2 text-right font-medium">Progres</th>
                                <th className="px-4 py-2 text-right font-medium">Anggaran</th>
                                <th className="px-4 py-2 text-right font-medium">Realisasi</th>
                                <th className="px-4 py-2 text-center font-medium">SLA</th>
                                <th className="px-4 py-2 text-center font-medium">Eskalasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioProjects.map((p) => (
                                <tr key={p.name} className="hover:bg-muted/40 border-b transition-colors last:border-0">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{p.name}</div>
                                    </td>
                                    <td className="text-muted-foreground px-4 py-3 text-xs">{p.client}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(p.status)}`}>
                                            {ProjectStatusLabels[p.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="bg-muted h-1.5 w-16 overflow-hidden rounded-full">
                                                <div className="bg-primary h-full rounded-full" style={{ width: `${p.progress}%` }} />
                                            </div>
                                            <span className="text-xs tabular-nums">{p.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right tabular-nums text-xs">{formatRupiah(p.budget)}</td>
                                    <td className="px-4 py-3 text-right tabular-nums text-xs">{formatRupiah(p.cost)}</td>
                                    <td className="px-4 py-3 text-center">
                                        {p.slaBreached ? (
                                            <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                                Terlampaui
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                                On Track
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        {p.escalations > 0 ? (
                                            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-xs font-semibold text-rose-700 dark:bg-rose-900/30 dark:text-rose-400">
                                                {p.escalations}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground text-xs">—</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
