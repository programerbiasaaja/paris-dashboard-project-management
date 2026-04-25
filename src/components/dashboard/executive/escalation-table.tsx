"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ESubmissionStatus } from "@/types/enums";
import { escalations } from "./dummy-data";

function statusClass(status: ESubmissionStatus) {
    if (status === ESubmissionStatus.APPROVED) return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    if (status === ESubmissionStatus.REJECTED) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
}

function statusLabel(status: ESubmissionStatus) {
    if (status === ESubmissionStatus.APPROVED) return "Selesai";
    if (status === ESubmissionStatus.REJECTED) return "Ditolak";
    return "Terbuka";
}

function priorityClass(priority: string) {
    if (priority === "Tinggi") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (priority === "Sedang") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
}

export function EscalationTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daftar Eskalasi</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-muted-foreground border-b text-left text-xs">
                                <th className="px-4 py-2 font-medium">ID</th>
                                <th className="px-4 py-2 font-medium">Proyek</th>
                                <th className="px-4 py-2 font-medium">Isu</th>
                                <th className="px-4 py-2 font-medium">Dilaporkan Oleh</th>
                                <th className="px-4 py-2 font-medium">Tanggal</th>
                                <th className="px-4 py-2 text-center font-medium">Prioritas</th>
                                <th className="px-4 py-2 text-center font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {escalations.map((esc) => (
                                <tr key={esc.id} className="hover:bg-muted/40 border-b transition-colors last:border-0">
                                    <td className="text-muted-foreground px-4 py-3 font-mono text-xs">{esc.id}</td>
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{esc.project}</div>
                                        <div className="text-muted-foreground text-xs">{esc.client}</div>
                                    </td>
                                    <td className="px-4 py-3 text-xs">{esc.issue}</td>
                                    <td className="text-muted-foreground px-4 py-3 text-xs">{esc.raisedBy}</td>
                                    <td className="text-muted-foreground px-4 py-3 text-xs tabular-nums">{esc.raisedAt}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityClass(esc.priority)}`}>
                                            {esc.priority}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(esc.status)}`}>
                                            {statusLabel(esc.status)}
                                        </span>
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
