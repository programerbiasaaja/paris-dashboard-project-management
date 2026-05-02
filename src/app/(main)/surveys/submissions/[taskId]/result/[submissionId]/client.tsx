"use client";

import Link from "next/link";
import {
    ArrowLeftIcon,
    CalendarIcon,
    CheckCircle2Icon,
    ClockIcon,
    DownloadIcon,
    FileIcon,
    FolderKanbanIcon,
    ImageIcon,
    MapPinIcon,
    PrinterIcon,
    UserIcon,
    XCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ESubmissionStatus, EQuestionType, QuestionTypeLabels, SubmissionStatusLabels } from "@/types/enums";
import { dummyQuestions, dummySubmissionResult, type TSurveyQuestion } from "../../../_components/_data";

const submissionStatusVariant: Record<ESubmissionStatus, string> = {
    [ESubmissionStatus.PENDING]: "bg-amber-100 text-amber-700 border-amber-200",
    [ESubmissionStatus.APPROVED]: "bg-green-100 text-green-700 border-green-200",
    [ESubmissionStatus.REJECTED]: "bg-red-100 text-red-700 border-red-200",
};

const submissionStatusIcon: Record<ESubmissionStatus, React.ComponentType<{ className?: string }>> = {
    [ESubmissionStatus.PENDING]: ClockIcon,
    [ESubmissionStatus.APPROVED]: CheckCircle2Icon,
    [ESubmissionStatus.REJECTED]: XCircleIcon,
};

function formatDateTime(d: string) {
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

function AnswerView({ question, value }: { question: TSurveyQuestion; value: string }) {
    if (!value) {
        return <span className="text-muted-foreground text-sm italic">Belum diisi</span>;
    }

    switch (question.inputType) {
        case EQuestionType.TEXT:
            return <p className="text-sm whitespace-pre-wrap">{value}</p>;

        case EQuestionType.NUMBER:
            return <p className="text-sm font-medium">{Number(value).toLocaleString("id-ID")}</p>;

        case EQuestionType.COST:
            return <p className="text-sm font-medium">Rp {Number(value).toLocaleString("id-ID")}</p>;

        case EQuestionType.DATE:
        case EQuestionType.DATE_FORWARD:
        case EQuestionType.DATE_BACKWARD:
            return (
                <p className="flex items-center gap-1.5 text-sm font-medium">
                    <CalendarIcon className="text-muted-foreground h-3.5 w-3.5" />
                    {formatDateTime(value).split(",")[0]}
                </p>
            );

        case EQuestionType.COORDINATE: {
            const [lat, lng] = value.split(",").map((s) => s.trim());
            return (
                <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                        <MapPinIcon className="h-3.5 w-3.5 text-primary" />
                        {lat}, {lng}
                    </div>
                    <a
                        href={`https://maps.google.com/?q=${lat},${lng}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary text-xs hover:underline"
                    >
                        Buka di Google Maps →
                    </a>
                </div>
            );
        }

        case EQuestionType.GPX:
        case EQuestionType.FILE:
            return (
                <a
                    href="#"
                    className="border-border/70 hover:border-primary inline-flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-sm transition"
                >
                    <FileIcon className="h-4 w-4 text-primary" />
                    <span className="font-medium">{value}</span>
                    <DownloadIcon className="text-muted-foreground ml-2 h-3.5 w-3.5" />
                </a>
            );

        case EQuestionType.GEOTAG: {
            const [filename, coords] = value.split("|");
            return (
                <div className="space-y-2">
                    <div className="border-border/70 bg-muted flex aspect-video items-center justify-center overflow-hidden rounded-lg border">
                        <ImageIcon className="text-muted-foreground h-10 w-10" />
                    </div>
                    <div className="text-muted-foreground flex items-center justify-between text-xs">
                        <span className="truncate">{filename}</span>
                        {coords && (
                            <span className="flex items-center gap-1">
                                <MapPinIcon className="h-3 w-3" />
                                {coords}
                            </span>
                        )}
                    </div>
                </div>
            );
        }

        case EQuestionType.PHOTO: {
            const photos = value.split(",").filter(Boolean);
            return (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {photos.map((p, i) => (
                        <div key={`${p}-${i}`} className="space-y-1">
                            <div className="border-border/70 bg-muted flex aspect-square items-center justify-center overflow-hidden rounded-lg border">
                                <ImageIcon className="text-muted-foreground h-8 w-8" />
                            </div>
                            <p className="text-muted-foreground truncate text-xs">{p}</p>
                        </div>
                    ))}
                </div>
            );
        }

        case EQuestionType.RADIO_BUTTON:
        case EQuestionType.OPTIONS:
            return (
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/30">
                    {value}
                </Badge>
            );

        case EQuestionType.MULTI_SELECT:
        case EQuestionType.CHECKBOX: {
            const items = value.split(",").filter(Boolean);
            return (
                <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                        <Badge key={item} variant="outline" className="bg-primary/5 text-primary border-primary/30">
                            {item}
                        </Badge>
                    ))}
                </div>
            );
        }

        default:
            return <p className="text-sm">{value}</p>;
    }
}

export default function SubmissionResultClient({ taskId, submissionId }: { taskId: string; submissionId: string }) {
    const submission = dummySubmissionResult;
    const questions = dummyQuestions[taskId] ?? dummyQuestions.t1;
    const answersMap = new Map(submission.answers.map((a) => [a.questionId, a.answerValue]));
    const StatusIcon = submissionStatusIcon[submission.status];

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="border-border/70 rounded-xl border bg-[linear-gradient(135deg,var(--color-primary-50),var(--background)_48%,var(--color-secondary-50))] p-4 shadow-sm sm:p-5 dark:bg-[linear-gradient(135deg,var(--card),var(--background)_52%,var(--card))]">
                <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between gap-2">
                        <Button variant="ghost" size="sm" className="-ml-2" nativeButton={false} render={<Link href={`/surveys/submissions/${taskId}`} />}>
                            <ArrowLeftIcon className="h-4 w-4" />
                            Kembali
                        </Button>
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Hasil Pengisian</Badge>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="space-y-1">
                            <div className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-xs">
                                <FolderKanbanIcon className="h-3.5 w-3.5" />
                                <span>{submission.projectName}</span>
                                <span>·</span>
                                <span>{submission.phaseName}</span>
                            </div>
                            <h1 className="text-lg font-semibold leading-snug sm:text-xl">{submission.taskName}</h1>
                            <p className="text-muted-foreground text-xs">ID Pengisian: {submissionId}</p>
                        </div>
                        <span
                            className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${submissionStatusVariant[submission.status]}`}
                        >
                            <StatusIcon className="h-3.5 w-3.5" />
                            {SubmissionStatusLabels[submission.status]}
                        </span>
                    </div>

                    <div className="text-muted-foreground grid grid-cols-1 gap-2 text-xs sm:grid-cols-3">
                        <span className="flex items-center gap-1.5">
                            <UserIcon className="h-3.5 w-3.5" />
                            Pelapor: <span className="text-foreground font-medium">{submission.reporterName}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            Dibuat: <span className="text-foreground">{formatDateTime(submission.createdAt)}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <ClockIcon className="h-3.5 w-3.5" />
                            Diperbarui: <span className="text-foreground">{formatDateTime(submission.updatedAt)}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Action bar */}
            <div className="flex flex-wrap items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                    <PrinterIcon className="h-4 w-4" />
                    Cetak
                </Button>
                <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4" />
                    Unduh PDF
                </Button>
            </div>

            {/* Answers */}
            <div className="space-y-3">
                {questions.map((q, idx) => (
                    <div key={q.id} className="border-border/70 rounded-xl border bg-white p-4 shadow-sm dark:bg-card">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                            <div className="min-w-0 flex-1 space-y-1">
                                <div className="text-sm font-medium leading-snug">
                                    <span className="text-muted-foreground mr-1.5">{idx + 1}.</span>
                                    {q.label}
                                </div>
                                {q.description && <p className="text-muted-foreground text-xs">{q.description}</p>}
                            </div>
                            <Badge variant="outline" className="text-[10px]">
                                {QuestionTypeLabels[q.inputType]}
                            </Badge>
                        </div>
                        <div className="border-border/60 mt-3 border-t pt-3">
                            <AnswerView question={q} value={answersMap.get(q.id) ?? ""} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Review actions for pending */}
            {submission.status === ESubmissionStatus.PENDING && (
                <div className="sticky bottom-0 -mx-4 border-t border-border/70 bg-white/95 px-4 py-3 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:shadow-sm dark:bg-card/95">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                        <Button variant="destructive">
                            <XCircleIcon className="h-4 w-4" />
                            Tolak
                        </Button>
                        <Button>
                            <CheckCircle2Icon className="h-4 w-4" />
                            Setujui
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
