"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { GripVertical, PlusIcon, Trash2 } from "lucide-react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { TProjectForm } from "./_schema";

interface IPhaseRowProps {
    fieldId: string;
    index: number;
    onRemove: (index: number) => void;
}

function PhaseRow({ fieldId, index, onRemove }: IPhaseRowProps) {
    const form = useFormContext<TProjectForm>();
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: fieldId });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style} className="border-border bg-card rounded-lg border p-4 shadow-sm">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground flex h-9 w-9 shrink-0 cursor-grab items-center justify-center active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <GripVertical className="h-4 w-4" />
                </button>
                <div className="flex-1">
                    <FormField
                        control={form.control}
                        name={`phases.${index}.name`}
                        render={({ field: f }) => (
                            <FormItem>
                                <FormLabel>Fase #{index + 1}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Misal: A. Persiapan" {...f} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onRemove(index)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
            <p className="text-muted-foreground mt-2 ml-12 text-xs">
                {form.watch(`phases.${index}.tasks`)?.length ?? 0} kegiatan terdaftar
            </p>
        </div>
    );
}

export function StepPhases() {
    const form = useFormContext<TProjectForm>();
    const { fields, append, remove, move } = useFieldArray({ control: form.control, name: "phases" });

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    function addPhase() {
        append({ id: `phase-${Date.now()}`, name: "", tasks: [] });
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = fields.findIndex((f) => f.id === active.id);
        const newIndex = fields.findIndex((f) => f.id === over.id);
        if (oldIndex !== -1 && newIndex !== -1) move(oldIndex, newIndex);
    }

    return (
        <Form {...form}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <p className="text-muted-foreground text-sm">
                        Tambahkan fase atau kelompok kegiatan untuk membagi pekerjaan proyek (contoh: A. Persiapan, B. Pelaksanaan).
                    </p>
                    <Button type="button" size="sm" onClick={addPhase}>
                        <PlusIcon className="h-4 w-4" /> Tambah Fase
                    </Button>
                </div>

                {fields.length === 0 && (
                    <div className="border-border bg-muted/30 text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
                        Belum ada fase. Klik &quot;Tambah Fase&quot; untuk memulai.
                    </div>
                )}

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={fields.map((f) => f.id)} strategy={verticalListSortingStrategy}>
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <PhaseRow key={field.id} fieldId={field.id} index={index} onRemove={remove} />
                            ))}
                        </div>
                    </SortableContext>
                </DndContext>

                {form.formState.errors.phases?.message && (
                    <p className="text-destructive text-xs">{form.formState.errors.phases.message as string}</p>
                )}
            </div>
        </Form>
    );
}
