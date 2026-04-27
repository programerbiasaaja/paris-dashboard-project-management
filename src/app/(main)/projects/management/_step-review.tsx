"use client";

import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { ProjectStatusLabels, ProjectVisibilityLabels, TaskStatusLabels, QuestionTypeLabels } from "@/types/enums";
import { clientOptions, userOptions, type TProjectForm } from "./_schema";

function formatRupiah(n: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n || 0);
}

function getName(list: { id: string; name: string }[], id: string) {
    return list.find((x) => x.id === id)?.name ?? "-";
}

export function StepReview() {
    const form = useFormContext<TProjectForm>();
    const data = form.getValues();
    const totalQuestions = data.phases.reduce(
        (acc, p) => acc + (p.tasks?.reduce((a, t) => a + (t.questions?.length ?? 0), 0) ?? 0),
        0,
    );
    const totalTasks = data.phases.reduce((acc, p) => acc + (p.tasks?.length ?? 0), 0);

    return (
        <div className="space-y-5">
            <div className="border-border bg-card rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Detail Proyek</h3>
                    <Badge variant="outline">{ProjectStatusLabels[data.detail.status]}</Badge>
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                    <Row label="Nama Proyek" value={data.detail.name} />
                    <Row label="Klien" value={getName(clientOptions, data.detail.clientId)} />
                    <Row label="PIC Proyek" value={getName(userOptions, data.detail.picId)} />
                    <Row label="Visibilitas" value={ProjectVisibilityLabels[data.detail.visibility]} />
                    <Row label="Nilai Kontrak" value={formatRupiah(data.detail.totalContractValue)} />
                    <Row label="Anggaran" value={formatRupiah(data.detail.totalBudget)} />
                    <Row label="Tanggal Mulai" value={data.detail.startDate || "-"} />
                    <Row label="Tanggal Selesai" value={data.detail.endDate || "-"} />
                    <Row label="Kode Akses" value={data.detail.access_code || "-"} />
                    {data.detail.description && (
                        <div className="md:col-span-2">
                            <span className="text-muted-foreground text-xs">Deskripsi</span>
                            <p className="text-sm">{data.detail.description}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="border-border bg-card rounded-lg border p-4">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Ringkasan Pekerjaan</h3>
                    <div className="flex gap-2">
                        <Badge variant="outline">{data.phases.length} Fase</Badge>
                        <Badge variant="outline">{totalTasks} Kegiatan</Badge>
                        <Badge variant="outline">{totalQuestions} Pertanyaan</Badge>
                    </div>
                </div>

                <div className="space-y-3">
                    {data.phases.map((phase, pi) => (
                        <div key={phase.id} className="border-border/70 rounded-md border p-3">
                            <div className="text-sm font-medium">
                                {pi + 1}. {phase.name || `Fase #${pi + 1}`}
                            </div>
                            {phase.tasks && phase.tasks.length > 0 ? (
                                <ul className="mt-2 space-y-2">
                                    {phase.tasks.map((task, ti) => (
                                        <li key={task.id} className="bg-muted/40 rounded-md p-2 text-xs">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="font-medium">
                                                    {pi + 1}.{ti + 1} {task.name || "(tanpa nama)"}
                                                </span>
                                                <Badge variant="outline" className="text-[10px]">
                                                    {TaskStatusLabels[task.status]}
                                                </Badge>
                                            </div>
                                            <div className="text-muted-foreground mt-1 flex flex-wrap gap-3">
                                                <span>PIC: {getName(userOptions, task.assigneeId)}</span>
                                                <span>Bulan: {task.startMonth}–{task.endMonth}</span>
                                                <span>Bobot: {task.weight}%</span>
                                                <span>Anggaran: {formatRupiah(task.budget)}</span>
                                            </div>
                                            {task.questions && task.questions.length > 0 && (
                                                <ul className="mt-2 space-y-1 border-l-2 pl-3">
                                                    {task.questions.map((q, qi) => (
                                                        <li key={q.id} className="flex items-center gap-2 text-[11px]">
                                                            <span className="text-muted-foreground">Q{qi + 1}.</span>
                                                            <span>{q.label || "(tanpa label)"}</span>
                                                            <Badge variant="outline" className="text-[9px]">
                                                                {QuestionTypeLabels[q.inputType]}
                                                            </Badge>
                                                            {q.isRequired && (
                                                                <Badge className="bg-amber-100 text-[9px] text-amber-700">
                                                                    Wajib
                                                                </Badge>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted-foreground mt-1 text-xs">Tidak ada kegiatan.</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Row({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <div className="text-muted-foreground text-xs">{label}</div>
            <div className="font-medium">{value}</div>
        </div>
    );
}
