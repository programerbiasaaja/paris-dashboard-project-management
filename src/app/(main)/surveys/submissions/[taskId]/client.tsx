"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArrowLeftIcon,
    CalendarIcon,
    CameraIcon,
    ChevronRightIcon,
    FileIcon,
    FolderKanbanIcon,
    MapPinIcon,
    SaveIcon,
    SendIcon,
    UploadIcon,
    UserIcon,
    XIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { EQuestionType, ESubmissionStatus, SubmissionStatusLabels } from "@/types/enums";
import { dummyQuestions, dummySurveyTasks, dummyTaskSubmissions, type TSurveyQuestion } from "../_components/_data";

const submissionStatusVariant: Record<ESubmissionStatus, string> = {
    [ESubmissionStatus.PENDING]: "bg-amber-100 text-amber-700",
    [ESubmissionStatus.APPROVED]: "bg-green-100 text-green-700",
    [ESubmissionStatus.REJECTED]: "bg-red-100 text-red-700",
};

function formatSubmissionDateTime(d: string) {
    try {
        return new Date(d).toLocaleString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch {
        return d;
    }
}

type TAnswers = Record<string, string | string[]>;

function formatRupiah(v: string) {
    if (!v) return "";
    const n = Number(v.replace(/[^\d]/g, ""));
    if (Number.isNaN(n)) return "";
    return n.toLocaleString("id-ID");
}

function QuestionField({
    question,
    value,
    onChange,
}: {
    question: TSurveyQuestion;
    value: string | string[] | undefined;
    onChange: (v: string | string[]) => void;
}) {
    const baseInputClass = "bg-white";

    switch (question.inputType) {
        case EQuestionType.TEXT:
            return (
                <Textarea
                    value={(value as string) ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Tulis jawaban di sini…"
                    rows={3}
                    className={baseInputClass}
                />
            );

        case EQuestionType.NUMBER:
            return (
                <Input
                    type="number"
                    inputMode="decimal"
                    value={(value as string) ?? ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0"
                    className={baseInputClass}
                />
            );

        case EQuestionType.COST:
            return (
                <div className="relative">
                    <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm">Rp</span>
                    <Input
                        inputMode="numeric"
                        value={formatRupiah((value as string) ?? "")}
                        onChange={(e) => onChange(e.target.value.replace(/[^\d]/g, ""))}
                        placeholder="0"
                        className={`${baseInputClass} pl-9`}
                    />
                </div>
            );

        case EQuestionType.DATE:
        case EQuestionType.DATE_FORWARD:
        case EQuestionType.DATE_BACKWARD: {
            const today = new Date().toISOString().split("T")[0];
            const min = question.inputType === EQuestionType.DATE_FORWARD ? today : undefined;
            const max = question.inputType === EQuestionType.DATE_BACKWARD ? today : undefined;
            return (
                <div className="relative">
                    <CalendarIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        type="date"
                        value={(value as string) ?? ""}
                        onChange={(e) => onChange(e.target.value)}
                        min={min}
                        max={max}
                        className={`${baseInputClass} pl-9`}
                    />
                </div>
            );
        }

        case EQuestionType.COORDINATE: {
            const [lat = "", lng = ""] = ((value as string) ?? "").split(",").map((s) => s.trim());
            return (
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <Input
                            value={lat}
                            onChange={(e) => onChange(`${e.target.value}, ${lng}`)}
                            placeholder="Latitude"
                            className={baseInputClass}
                        />
                        <Input
                            value={lng}
                            onChange={(e) => onChange(`${lat}, ${e.target.value}`)}
                            placeholder="Longitude"
                            className={baseInputClass}
                        />
                    </div>
                    <Button type="button" variant="outline" size="sm" className="w-full sm:w-auto">
                        <MapPinIcon className="h-4 w-4" />
                        Ambil Lokasi Saat Ini
                    </Button>
                </div>
            );
        }

        case EQuestionType.GPX:
        case EQuestionType.FILE: {
            const accept = question.inputType === EQuestionType.GPX ? ".gpx" : undefined;
            const filename = value as string | undefined;
            return (
                <label className="border-border/70 hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed bg-white p-6 transition">
                    <UploadIcon className="text-muted-foreground h-6 w-6" />
                    <span className="text-sm font-medium">{filename || "Klik untuk unggah file"}</span>
                    <span className="text-muted-foreground text-xs">
                        {question.inputType === EQuestionType.GPX ? "Hanya file .gpx" : "PDF, DOC, XLS, gambar — maks 10 MB"}
                    </span>
                    <input
                        type="file"
                        className="hidden"
                        accept={accept}
                        onChange={(e) => onChange(e.target.files?.[0]?.name ?? "")}
                    />
                </label>
            );
        }

        case EQuestionType.PHOTO:
        case EQuestionType.GEOTAG: {
            const photos = ((value as string) ?? "").split(",").filter(Boolean);
            return (
                <div className="space-y-2">
                    <label className="border-border/70 hover:border-primary flex cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed bg-white p-6 transition">
                        <CameraIcon className="text-muted-foreground h-6 w-6" />
                        <span className="text-sm font-medium">
                            {question.inputType === EQuestionType.GEOTAG ? "Ambil foto dengan geotag" : "Ambil atau pilih foto"}
                        </span>
                        <span className="text-muted-foreground text-xs">JPG/PNG — maks 5 MB per foto</span>
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            multiple={question.inputType === EQuestionType.PHOTO}
                            className="hidden"
                            onChange={(e) => {
                                const files = Array.from(e.target.files ?? []).map((f) => f.name);
                                if (question.inputType === EQuestionType.GEOTAG) {
                                    onChange(files[0] ? `${files[0]}|0,0` : "");
                                } else {
                                    onChange([...photos, ...files].join(","));
                                }
                            }}
                        />
                    </label>
                    {photos.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {photos.map((p, i) => (
                                <div key={`${p}-${i}`} className="border-border/70 flex items-center gap-2 rounded-md border bg-white px-2 py-1 text-xs">
                                    <FileIcon className="h-3.5 w-3.5" />
                                    <span className="max-w-[160px] truncate">{p}</span>
                                    <button
                                        type="button"
                                        onClick={() => onChange(photos.filter((_, idx) => idx !== i).join(","))}
                                        className="text-muted-foreground hover:text-destructive"
                                    >
                                        <XIcon className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        case EQuestionType.RADIO_BUTTON:
            return (
                <div className="grid gap-2 sm:grid-cols-2">
                    {(question.options ?? []).map((opt) => {
                        const checked = value === opt;
                        return (
                            <label
                                key={opt}
                                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition ${
                                    checked ? "border-primary bg-primary/5" : "border-border/70 bg-white hover:border-primary/40"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name={question.id}
                                    checked={checked}
                                    onChange={() => onChange(opt)}
                                    className="text-primary"
                                />
                                {opt}
                            </label>
                        );
                    })}
                </div>
            );

        case EQuestionType.OPTIONS:
            return (
                <Select value={(value as string) ?? ""} onValueChange={(v) => onChange(v ?? "")}>
                    <SelectTrigger className={baseInputClass}>
                        <SelectValue placeholder="Pilih salah satu…" />
                    </SelectTrigger>
                    <SelectContent>
                        {(question.options ?? []).map((opt) => (
                            <SelectItem key={opt} value={opt}>
                                {opt}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            );

        case EQuestionType.MULTI_SELECT:
        case EQuestionType.CHECKBOX: {
            const selected = ((value as string) ?? "").split(",").filter(Boolean);
            const toggle = (opt: string) => {
                const next = selected.includes(opt) ? selected.filter((s) => s !== opt) : [...selected, opt];
                onChange(next.join(","));
            };
            return (
                <div className="grid gap-2 sm:grid-cols-2">
                    {(question.options ?? []).map((opt) => {
                        const checked = selected.includes(opt);
                        return (
                            <label
                                key={opt}
                                className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm transition ${
                                    checked ? "border-primary bg-primary/5" : "border-border/70 bg-white hover:border-primary/40"
                                }`}
                            >
                                <Checkbox checked={checked} onCheckedChange={() => toggle(opt)} />
                                {opt}
                            </label>
                        );
                    })}
                </div>
            );
        }

        default:
            return null;
    }
}

export default function SubmissionFormClient({ taskId }: { taskId: string }) {
    const router = useRouter();
    const task = dummySurveyTasks.find((t) => t.id === taskId);
    const questions = dummyQuestions[taskId] ?? dummyQuestions.t1;
    const pastSubmissions = dummyTaskSubmissions[taskId] ?? [];
    const [answers, setAnswers] = useState<TAnswers>({});
    const [submitting, setSubmitting] = useState(false);

    const setAnswer = (qid: string, v: string | string[]) => setAnswers((prev) => ({ ...prev, [qid]: v }));

    const filledCount = questions.filter((q) => {
        const v = answers[q.id];
        return Array.isArray(v) ? v.length > 0 : Boolean(v);
    }).length;
    const progress = questions.length > 0 ? Math.round((filledCount / questions.length) * 100) : 0;

    const handleSubmit = (asDraft: boolean) => {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            if (!asDraft) router.push("/surveys/submissions");
        }, 600);
    };

    if (!task) {
        return (
            <div className="border-border/70 rounded-xl border bg-white p-10 text-center">
                <p className="text-muted-foreground text-sm">Tugas tidak ditemukan.</p>
                <Button variant="outline" className="mt-4" nativeButton={false} render={<Link href="/surveys/submissions" />}>
                    Kembali ke Daftar
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="border-border/70 rounded-xl border bg-[linear-gradient(135deg,var(--color-primary-50),var(--background)_48%,var(--color-secondary-50))] p-4 shadow-sm sm:p-5 dark:bg-[linear-gradient(135deg,var(--card),var(--background)_52%,var(--card))]">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <Button variant="ghost" size="sm" className="-ml-2" nativeButton={false} render={<Link href="/surveys/submissions" />}>
                            <ArrowLeftIcon className="h-4 w-4" />
                            Kembali
                        </Button>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Pengisian Survei</Badge>
                    </div>

                    <div className="space-y-1">
                        <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs">
                            <FolderKanbanIcon className="h-3.5 w-3.5" />
                            <span>{task.projectName}</span>
                            <span>·</span>
                            <span>{task.phaseName}</span>
                        </div>
                        <h1 className="text-lg font-semibold leading-snug sm:text-xl">{task.name}</h1>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                            <span className="flex items-center gap-1.5">
                                <UserIcon className="h-3.5 w-3.5" />
                                {task.assigneeName}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                Jatuh Tempo {task.due_date}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Progres pengisian</span>
                            <span className="font-medium">
                                {filledCount}/{questions.length} ({progress}%)
                            </span>
                        </div>
                        <div className="bg-border/60 h-1.5 w-full overflow-hidden rounded-full">
                            <div className="bg-primary h-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="pengisian">
                <TabsList>
                    <TabsTrigger value="pengisian">Pengisian</TabsTrigger>
                    <TabsTrigger value="riwayat">
                        Riwayat Pengisian
                        {pastSubmissions.length > 0 && (
                            <Badge variant="outline" className="ml-1.5 h-4 px-1.5 text-[10px]">
                                {pastSubmissions.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="pengisian" className="space-y-3">
                    {questions.map((q, idx) => (
                        <div key={q.id} className="border-border/70 rounded-xl border bg-white p-4 shadow-sm dark:bg-card">
                            <div className="space-y-1">
                                <Label className="text-sm font-medium leading-snug">
                                    <span className="text-muted-foreground mr-1.5">{idx + 1}.</span>
                                    {q.label}
                                    {q.isRequired && <span className="text-destructive ml-1">*</span>}
                                </Label>
                                {q.description && <p className="text-muted-foreground text-xs">{q.description}</p>}
                            </div>
                            <div className="mt-3">
                                <QuestionField question={q} value={answers[q.id]} onChange={(v) => setAnswer(q.id, v)} />
                            </div>
                        </div>
                    ))}

                    {/* Sticky Footer Actions */}
                    <div className="sticky bottom-0 -mx-4 border-t border-border/70 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:shadow-sm dark:bg-card/95">
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                            <Button variant="outline" disabled={submitting} onClick={() => handleSubmit(true)}>
                                <SaveIcon className="h-4 w-4" />
                                Simpan Draft
                            </Button>
                            <Button disabled={submitting} onClick={() => handleSubmit(false)}>
                                <SendIcon className="h-4 w-4" />
                                Kirim Pengisian
                            </Button>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="riwayat">
                    {pastSubmissions.length === 0 ? (
                        <div className="border-border/70 rounded-xl border border-dashed bg-white p-10 text-center dark:bg-card">
                            <p className="text-muted-foreground text-sm">Belum ada pengisian untuk tugas ini.</p>
                        </div>
                    ) : (
                        <div className="border-border/70 rounded-xl border bg-white shadow-sm dark:bg-card">
                            <div className="border-border/60 flex items-center justify-between border-b px-4 py-3">
                                <div>
                                    <h2 className="text-sm font-semibold">Riwayat Pengisian</h2>
                                    <p className="text-muted-foreground text-xs">Pengisian sebelumnya untuk tugas ini</p>
                                </div>
                                <Badge variant="outline">{pastSubmissions.length} pengisian</Badge>
                            </div>
                            <ul className="divide-border/60 divide-y">
                                {pastSubmissions.map((s) => (
                                    <li key={s.id}>
                                        <Link
                                            href={`/surveys/submissions/${taskId}/result/${s.id}`}
                                            className="hover:bg-muted/40 group flex items-center justify-between gap-3 px-4 py-3 transition"
                                        >
                                            <div className="min-w-0 space-y-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-sm font-medium group-hover:text-primary">{s.id}</span>
                                                    <span
                                                        className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${submissionStatusVariant[s.status]}`}
                                                    >
                                                        {SubmissionStatusLabels[s.status]}
                                                    </span>
                                                </div>
                                                <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                                                    <span className="flex items-center gap-1.5">
                                                        <UserIcon className="h-3.5 w-3.5" />
                                                        {s.reporterName}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <CalendarIcon className="h-3.5 w-3.5" />
                                                        {formatSubmissionDateTime(s.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            <ChevronRightIcon className="text-muted-foreground group-hover:text-primary h-4 w-4 shrink-0" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
