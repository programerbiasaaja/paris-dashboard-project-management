"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EProjectStatus, ProjectStatusLabels } from "@/types/enums";
import { topProjects } from "./dummy-data";

function formatRupiah(value: number) {
    return `Rp ${(value / 1_000_000_000).toFixed(2)}M`;
}

function statusVariant(status: EProjectStatus) {
    if (status === EProjectStatus.DONE) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (status === EProjectStatus.HOLD) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
}

export function TopProjectsTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Proyek Terbaru</CardTitle>
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
                            </tr>
                        </thead>
                        <tbody>
                            {topProjects.map((project) => (
                                <tr key={project.name} className="hover:bg-muted/40 border-b transition-colors last:border-0">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{project.name}</div>
                                        <div className="text-muted-foreground text-xs">
                                            {project.doneTasks}/{project.totalTasks} tugas
                                        </div>
                                    </td>
                                    <td className="text-muted-foreground px-4 py-3">{project.client}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusVariant(project.status)}`}
                                        >
                                            {ProjectStatusLabels[project.status]}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <div className="bg-muted h-1.5 w-16 overflow-hidden rounded-full">
                                                <div className="bg-primary h-full rounded-full" style={{ width: `${project.progress}%` }} />
                                            </div>
                                            <span className="text-xs tabular-nums">{project.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-right tabular-nums">{formatRupiah(project.budget)}</td>
                                    <td className="px-4 py-3 text-right tabular-nums">{formatRupiah(project.cost)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
