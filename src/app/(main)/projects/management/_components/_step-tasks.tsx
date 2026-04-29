"use client";

import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ChevronDown, ChevronRight, FileText, PlusIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { QuestionTypeOptions, TaskStatusOptions, ETaskStatus, EQuestionType } from "@/types/enums";

const MONTH_OPTIONS = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
];
import { userOptions, type TProjectForm } from "./_schema";
import { cn } from "@/lib/utils";

function QuestionList({ phaseIdx, taskIdx }: { phaseIdx: number; taskIdx: number }) {
    const form = useFormContext<TProjectForm>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `phases.${phaseIdx}.tasks.${taskIdx}.questions`,
    });

    function addQuestion() {
        append({
            id: `q-${Date.now()}`,
            label: "",
            description: "",
            inputType: EQuestionType.TEXT,
            isRequired: true,
        });
    }

    return (
        <div className="border-border/70 bg-muted/30 mt-4 space-y-3 rounded-md border p-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="text-muted-foreground h-4 w-4" />
                    <span className="text-sm font-medium">Form Survei / Jurnal Lapangan</span>
                </div>
                <Button type="button" size="sm" onClick={addQuestion}>
                    <PlusIcon className="h-4 w-4" /> Tambah Pertanyaan
                </Button>
            </div>

            {fields.length === 0 && <p className="text-muted-foreground py-3 text-center text-xs">Belum ada pertanyaan untuk kegiatan ini.</p>}

            {fields.map((q, qIdx) => (
                <div key={q.id} className="bg-background border-border space-y-3 rounded-md border p-3">
                    <div className="flex items-start gap-2">
                        <div className="grid flex-1 grid-cols-1 gap-3 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name={`phases.${phaseIdx}.tasks.${taskIdx}.questions.${qIdx}.label`}
                                render={({ field }) => (
                                    <FormItem className="col-span-2 w-full">
                                        <FormLabel>Pertanyaan #{qIdx + 1}</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Misal: Foto lokasi pembersihan lahan" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`phases.${phaseIdx}.tasks.${taskIdx}.questions.${qIdx}.description`}
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Keterangan</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Petunjuk untuk Surveior (opsional)" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name={`phases.${phaseIdx}.tasks.${taskIdx}.questions.${qIdx}.inputType`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Pertanyaan</FormLabel>
                                        <Select value={field.value} onValueChange={field.onChange} items={QuestionTypeOptions}>
                                            <FormControl>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {QuestionTypeOptions.map((o) => (
                                                    <SelectItem key={o.value} value={o.value}>
                                                        {o.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <div className="flex items-center">
                                <FormField
                                    control={form.control}
                                    name={`phases.${phaseIdx}.tasks.${taskIdx}.questions.${qIdx}.isRequired`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="gap- flex items-center gap-2">
                                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                <span className="text-sm">Wajib diisi</span>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={() => remove(qIdx)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function TaskItem({ phaseIdx, taskIdx, onRemove }: { phaseIdx: number; taskIdx: number; onRemove: () => void }) {
    const form = useFormContext<TProjectForm>();
    const [isOpen, setIsOpen] = useState(true);
    const taskName = form.watch(`phases.${phaseIdx}.tasks.${taskIdx}.name`);

    return (
        <div className="border-border bg-background rounded-md border">
            <div className="flex items-center gap-2 p-3">
                <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="flex flex-1 cursor-pointer items-center gap-2 text-left">
                    {isOpen ? (
                        <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0" />
                    ) : (
                        <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0" />
                    )}
                    <span className="text-sm font-medium">{taskName || `Kegiatan #${taskIdx + 1}`}</span>
                </button>
                <Button type="button" variant="ghost" size="icon" className="text-destructive hover:text-destructive shrink-0" onClick={onRemove}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className={cn("border-border/70 border-t px-3 pt-3 pb-3", !isOpen && "hidden")}>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.name`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Kegiatan</FormLabel>
                                <FormControl>
                                    <Input placeholder="Misal: 1.1 Pembersihan Lahan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.assigneeId`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Penanggung Jawab</FormLabel>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    items={userOptions.map((u) => ({ value: u.id, label: u.name }))}
                                >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih PIC" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {userOptions.map((u) => (
                                            <SelectItem key={u.id} value={u.id}>
                                                {u.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.startMonth`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bulan Mulai</FormLabel>
                                <Select value={field.value ? String(field.value) : ""} onValueChange={(v) => field.onChange(Number(v))}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih bulan">
                                                {MONTH_OPTIONS.find((m) => m.value === field.value)?.label ?? "Pilih bulan"}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {MONTH_OPTIONS.map((m) => (
                                            <SelectItem key={m.value} value={String(m.value)}>
                                                {m.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.endMonth`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bulan Selesai</FormLabel>
                                <Select value={field.value ? String(field.value) : ""} onValueChange={(v) => field.onChange(Number(v))}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Pilih bulan">
                                                {MONTH_OPTIONS.find((m) => m.value === field.value)?.label ?? "Pilih bulan"}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {MONTH_OPTIONS.map((m) => (
                                            <SelectItem key={m.value} value={String(m.value)}>
                                                {m.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.weight`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bobot (%)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={100}
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(/^0+(?=\d)/, "");
                                            field.onChange(raw === "" ? 0 : Number(raw));
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.budget`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Anggaran (Rp)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => {
                                            const raw = e.target.value.replace(/^0+(?=\d)/, "");
                                            field.onChange(raw === "" ? 0 : Number(raw));
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.due_date`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tenggat Waktu</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={`phases.${phaseIdx}.tasks.${taskIdx}.status`}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <Select value={field.value} onValueChange={field.onChange} items={TaskStatusOptions}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {TaskStatusOptions.map((o) => (
                                            <SelectItem key={o.value} value={o.value}>
                                                {o.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                </div>

                <QuestionList phaseIdx={phaseIdx} taskIdx={taskIdx} />
            </div>
        </div>
    );
}

function TaskList({ phaseIdx }: { phaseIdx: number }) {
    const form = useFormContext<TProjectForm>();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `phases.${phaseIdx}.tasks`,
    });

    function addTask() {
        append({
            id: `task-${Date.now()}`,
            name: "",
            assigneeId: "",
            startMonth: 1,
            endMonth: 1,
            weight: 0,
            budget: 0,
            due_date: "",
            status: ETaskStatus.PROCESS,
            questions: [],
        });
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs">{fields.length} kegiatan</span>
                <Button type="button" size="sm" onClick={addTask}>
                    <PlusIcon className="h-4 w-4" /> Tambah Kegiatan
                </Button>
            </div>

            {fields.length === 0 && (
                <p className="text-muted-foreground border-border/70 rounded-md border border-dashed py-4 text-center text-xs">
                    Belum ada kegiatan untuk fase ini.
                </p>
            )}

            {fields.map((task, taskIdx) => (
                <TaskItem key={task.id} phaseIdx={phaseIdx} taskIdx={taskIdx} onRemove={() => remove(taskIdx)} />
            ))}
        </div>
    );
}

export function StepTasks() {
    const form = useFormContext<TProjectForm>();
    const phases = form.watch("phases");
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    if (!phases || phases.length === 0) {
        return (
            <div className="border-border bg-muted/30 text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
                Belum ada fase. Kembali ke langkah sebelumnya untuk menambahkan fase.
            </div>
        );
    }

    return (
        <Form {...form}>
            <div className="space-y-3">
                <p className="text-muted-foreground text-sm">Tambahkan kegiatan dan formulir Survei/jurnal lapangan untuk setiap fase.</p>

                {phases.map((phase, phaseIdx) => {
                    const isOpen = openIdx === phaseIdx;
                    return (
                        <div key={phase.id} className="border-border bg-card rounded-lg border shadow-sm">
                            <button
                                type="button"
                                onClick={() => setOpenIdx(isOpen ? null : phaseIdx)}
                                className="hover:bg-primary-50 flex w-full cursor-pointer items-center justify-between gap-3 rounded-t-lg p-4 text-left transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                    <div>
                                        <div className="text-sm font-semibold">{phase.name || `Fase #${phaseIdx + 1}`}</div>
                                        <div className="text-muted-foreground text-xs">{phase.tasks?.length ?? 0} kegiatan</div>
                                    </div>
                                </div>
                            </button>
                            <div className={cn("border-border/70 border-t p-4", !isOpen && "hidden")}>
                                <TaskList phaseIdx={phaseIdx} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </Form>
    );
}
