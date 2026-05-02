"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarIcon, ClipboardListIcon, FileTextIcon, FolderKanbanIcon, Search, UserIcon, X } from "lucide-react";
import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ESubmissionStatus, ETaskStatus, SubmissionStatusLabels, TaskStatusLabels, TaskStatusOptions } from "@/types/enums";
import { dummySurveyTasks, type TSurveyTaskRow } from "./_components/_data";

const taskStatusVariant: Record<ETaskStatus, string> = {
    [ETaskStatus.FOLLOW_UP]: "bg-orange-100 text-orange-700",
    [ETaskStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [ETaskStatus.HOLD]: "bg-amber-100 text-amber-700",
    [ETaskStatus.DONE]: "bg-green-100 text-green-700",
};

const submissionStatusVariant: Record<ESubmissionStatus, string> = {
    [ESubmissionStatus.PENDING]: "bg-amber-100 text-amber-700",
    [ESubmissionStatus.APPROVED]: "bg-green-100 text-green-700",
    [ESubmissionStatus.REJECTED]: "bg-red-100 text-red-700",
};

function formatDate(d?: string) {
    if (!d) return "-";
    try {
        return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    } catch {
        return d;
    }
}

function TaskCard({ task }: { task: TSurveyTaskRow }) {
    return (
        <Link
            href={`/surveys/submissions/${task.id}`}
            className="border-border/70 hover:border-primary/60 hover:shadow-primary/5 group block rounded-xl border bg-white p-4 shadow-sm transition hover:shadow-md dark:bg-card"
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                    <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs">
                        <FolderKanbanIcon className="h-3.5 w-3.5" />
                        <span className="line-clamp-1">{task.projectName}</span>
                        <span>·</span>
                        <span className="line-clamp-1">{task.phaseName}</span>
                    </div>
                    <h3 className="text-sm font-semibold leading-snug group-hover:text-primary">{task.name}</h3>
                </div>
                <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-medium ${taskStatusVariant[task.status]}`}>
                    {TaskStatusLabels[task.status]}
                </span>
            </div>

            <div className="text-muted-foreground mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                <div className="flex items-center gap-1.5">
                    <UserIcon className="h-3.5 w-3.5" />
                    <span className="line-clamp-1">{task.assigneeName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>{formatDate(task.due_date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <ClipboardListIcon className="h-3.5 w-3.5" />
                    <span>{task.questionCount} pertanyaan</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <FileTextIcon className="h-3.5 w-3.5" />
                    <span>{task.submissionCount} pengisian</span>
                </div>
            </div>

            {task.lastSubmissionStatus && (
                <div className="border-border/60 mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3 text-xs">
                    <span className="text-muted-foreground">Pengisian terakhir: {formatDate(task.lastSubmissionAt)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${submissionStatusVariant[task.lastSubmissionStatus]}`}>
                        {SubmissionStatusLabels[task.lastSubmissionStatus]}
                    </span>
                </div>
            )}
        </Link>
    );
}

export default function SurveiSubmissionsClient() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        return dummySurveyTasks.filter((t) => {
            const matchSearch =
                !q ||
                t.name.toLowerCase().includes(q) ||
                t.projectName.toLowerCase().includes(q) ||
                t.assigneeName.toLowerCase().includes(q);
            const matchStatus = statusFilter === "ALL" || t.status === statusFilter;
            return matchSearch && matchStatus;
        });
    }, [search, statusFilter]);

    return (
        <div className="space-y-4">
            <AdminRouteScaffold
                eyebrow="Survei"
                title="Pengisian Survei"
                description="Daftar tugas survei lapangan. Pilih tugas untuk mengisi atau melihat pengisian survei."
            />

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Cari tugas, proyek, atau PIC…"
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
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "ALL")}>
                    <SelectTrigger className="w-full bg-white sm:w-44">
                        <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Semua Status</SelectItem>
                        {TaskStatusOptions.map((o) => (
                            <SelectItem key={o.value} value={o.value}>
                                {o.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {filtered.length === 0 ? (
                <div className="border-border/70 rounded-xl border border-dashed bg-white p-10 text-center dark:bg-card">
                    <p className="text-muted-foreground text-sm">Tidak ada tugas survei yang sesuai.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    {filtered.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}

            <div className="text-muted-foreground flex items-center justify-between text-xs">
                <span>
                    Menampilkan <Badge variant="outline">{filtered.length}</Badge> dari {dummySurveyTasks.length} tugas
                </span>
            </div>
        </div>
    );
}
