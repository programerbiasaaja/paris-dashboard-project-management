"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type TStep = {
    id: number;
    title: string;
    description: string;
};

export const projectSteps: TStep[] = [
    { id: 1, title: "Detail Proyek", description: "Informasi umum proyek" },
    { id: 2, title: "Fase", description: "Kelompok kegiatan" },
    { id: 3, title: "Tugas & Survei", description: "Tugas dan formulir lapangan" },
    { id: 4, title: "Tinjau & Submit", description: "Verifikasi sebelum simpan" },
];

export function Stepper({ steps, current }: { steps: TStep[]; current: number }) {
    return (
        <ol className="flex w-full items-start gap-2">
            {steps.map((step, idx) => {
                const isDone = step.id < current;
                const isActive = step.id === current;
                return (
                    <li key={step.id} className="flex flex-1 items-start gap-3">
                        <div className="flex flex-col items-center">
                            <div
                                className={cn(
                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                                    isDone && "border-primary bg-primary text-primary-foreground",
                                    isActive && "border-primary bg-primary/10 text-primary",
                                    !isDone && !isActive && "border-border bg-background text-muted-foreground",
                                )}
                            >
                                {isDone ? <Check className="h-4 w-4" /> : step.id}
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col pt-1">
                            <div className="flex items-center gap-2">
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        isActive ? "text-foreground" : isDone ? "text-foreground" : "text-muted-foreground",
                                    )}
                                >
                                    {step.title}
                                </span>
                            </div>
                            <span className="text-muted-foreground text-xs">{step.description}</span>
                            {idx < steps.length - 1 && <div className={cn("mt-3 h-px w-full", isDone ? "bg-primary" : "bg-border")} />}
                        </div>
                    </li>
                );
            })}
        </ol>
    );
}
