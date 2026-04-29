"use client";

import { useMemo, useState } from "react";
import { Search, ListTodo, ClipboardCheck, MapPin, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ETaskStatus, ESubmissionStatus, TaskStatusLabels, SubmissionStatusLabels } from "@/types/enums";
import { dummyProjectDetail, TaskKindLabels, type IProjectTask, type TTaskKind } from "../_components/_data";

const taskStatusVariantMap: Record<ETaskStatus, string> = {
    [ETaskStatus.FOLLOW_UP]: "bg-amber-100 text-amber-700",
    [ETaskStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [ETaskStatus.HOLD]: "bg-slate-100 text-slate-600",
    [ETaskStatus.DONE]: "bg-green-100 text-green-700",
};

const submissionVariantMap: Record<ESubmissionStatus, string> = {
    [ESubmissionStatus.APPROVED]: "bg-green-100 text-green-700",
    [ESubmissionStatus.PENDING]: "bg-amber-100 text-amber-700",
    [ESubmissionStatus.REJECTED]: "bg-red-100 text-red-700",
};

const kindVariantMap: Record<TTaskKind, string> = {
    TASK: "bg-indigo-100 text-indigo-700",
    SURVEI: "bg-emerald-100 text-emerald-700",
    JOURNEY: "bg-fuchsia-100 text-fuchsia-700",
};

const kindIconMap: Record<TTaskKind, React.ReactNode> = {
    TASK: <ListTodo className="h-3.5 w-3.5" />,
    SURVEI: <ClipboardCheck className="h-3.5 w-3.5" />,
    JOURNEY: <MapPin className="h-3.5 w-3.5" />,
};

function formatDate(value: string | null) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

export default function ProjectTaskClient() {
    const { tasks } = dummyProjectDetail;
    const [search, setSearch] = useState("");
    const [kind, setKind] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const summary = useMemo(() => {
        const total = tasks.length;
        const done = tasks.filter((t) => t.status === ETaskStatus.DONE).length;
        const process = tasks.filter((t) => t.status === ETaskStatus.PROCESS).length;
        const overall = total > 0 ? Math.round(tasks.reduce((s, t) => s + t.progress, 0) / total) : 0;
        const submitted = tasks.filter((t) => t.submissionStatus !== null).length;
        return { total, done, process, overall, submitted };
    }, [tasks]);

    const filtered = useMemo(() => {
        return tasks.filter((t) => {
            const q = search.toLowerCase();
            const matchSearch = !q || t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q) || t.assignee.toLowerCase().includes(q);
            const matchKind = !kind || t.kind === kind;
            const matchStatus = !status || t.status === status;
            return matchSearch && matchKind && matchStatus;
        });
    }, [tasks, search, kind, status]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <SummaryStat label="Total Item" value={summary.total} />
                <SummaryStat label="Selesai" value={summary.done} accent="text-green-700" />
                <SummaryStat label="Sedang Berjalan" value={summary.process} accent="text-blue-700" />
                <SummaryStat label="Progres Keseluruhan" value={`${summary.overall}%`} accent="text-primary" />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-xs">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Cari kode, nama, atau penugasan…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-primary-300 bg-white pl-9 text-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                            aria-label="Hapus pencarian"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Select value={kind} onValueChange={(v) => setKind(!v || v === "ALL" ? "" : v)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Semua Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Jenis</SelectItem>
                            {(Object.keys(TaskKindLabels) as TTaskKind[]).map((k) => (
                                <SelectItem key={k} value={k}>
                                    {TaskKindLabels[k]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={status} onValueChange={(v) => setStatus(!v || v === "ALL" ? "" : v)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Semua Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">Semua Status</SelectItem>
                            {Object.values(ETaskStatus).map((s) => (
                                <SelectItem key={s} value={s}>
                                    {TaskStatusLabels[s]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card className="p-0">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-muted-foreground border-b bg-gray-50 text-left text-xs font-medium">
                                    <th className="px-4 py-3">Kode</th>
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">Jenis</th>
                                    <th className="px-4 py-3">Fase</th>
                                    <th className="px-4 py-3">Penugasan</th>
                                    <th className="px-4 py-3">Mulai</th>
                                    <th className="px-4 py-3">Tenggat</th>
                                    <th className="w-40 px-4 py-3">Progres</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Submission</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={10} className="text-muted-foreground px-4 py-8 text-center">
                                            Tidak ada item yang sesuai dengan pencarian atau filter.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((t, i) => <TaskRow key={t.id} task={t} alt={i % 2 === 0} />)
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SummaryStat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
    return (
        <Card className="p-0">
            <CardContent className="p-4">
                <div className="text-muted-foreground text-xs">{label}</div>
                <div className={`mt-1 text-lg font-semibold ${accent ?? "text-slate-700"}`}>{value}</div>
            </CardContent>
        </Card>
    );
}

function TaskRow({ task, alt }: { task: IProjectTask; alt: boolean }) {
    return (
        <tr className={alt ? "bg-gray-50/50" : "bg-white"}>
            <td className="px-4 py-3 font-mono text-xs whitespace-nowrap">{task.code}</td>
            <td className="px-4 py-3">
                <div className="max-w-sm text-sm font-medium">{task.name}</div>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${kindVariantMap[task.kind]}`}>
                    {kindIconMap[task.kind]}
                    {TaskKindLabels[task.kind]}
                </span>
            </td>
            <td className="px-4 py-3 text-xs whitespace-nowrap">{task.phase}</td>
            <td className="px-4 py-3 whitespace-nowrap">{task.assignee}</td>
            <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(task.startDate)}</td>
            <td className="px-4 py-3 text-xs whitespace-nowrap">{formatDate(task.dueDate)}</td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                        <div
                            className={`h-full rounded-full ${
                                task.progress === 100 ? "bg-green-500" : task.progress >= 50 ? "bg-blue-500" : "bg-amber-500"
                            }`}
                            style={{ width: `${task.progress}%` }}
                        />
                    </div>
                    <span className="w-9 text-right text-xs font-medium">{task.progress}%</span>
                </div>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${taskStatusVariantMap[task.status]}`}>
                    {TaskStatusLabels[task.status]}
                </span>
            </td>
            <td className="px-4 py-3">
                {task.submissionStatus ? (
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${submissionVariantMap[task.submissionStatus]}`}
                    >
                        {SubmissionStatusLabels[task.submissionStatus]}
                    </span>
                ) : (
                    <span className="text-muted-foreground text-xs">—</span>
                )}
            </td>
        </tr>
    );
}
