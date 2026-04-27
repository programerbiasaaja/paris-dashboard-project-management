import { z } from "zod";
import { EProjectStatus, EProjectVisibility, ETaskStatus, EQuestionType } from "@/types/enums";

export const projectDetailSchema = z
    .object({
        name: z.string().min(3, "Nama proyek minimal 3 karakter"),
        clientId: z.string().min(1, "Klien wajib dipilih"),
        picId: z.string().min(1, "PIC wajib dipilih"),
        totalContractValue: z.number().min(0, "Nilai kontrak tidak valid"),
        totalBudget: z.number().min(0, "Anggaran tidak valid"),
        startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
        endDate: z.string().min(1, "Tanggal selesai wajib diisi"),
        status: z.nativeEnum(EProjectStatus),
        visibility: z.nativeEnum(EProjectVisibility),
        access_code: z.string(),
        description: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.visibility === EProjectVisibility.PRIVATE && !data.access_code.trim()) {
            ctx.addIssue({
                code: "custom",
                message: "Kode akses wajib diisi jika visibilitas Privat",
                path: ["access_code"],
            });
        }
    });

export const SurveiQuestionSchema = z.object({
    id: z.string(),
    label: z.string().min(1, "Label pertanyaan wajib diisi"),
    description: z.string(),
    inputType: z.nativeEnum(EQuestionType),
    isRequired: z.boolean(),
});

export const taskSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Nama kegiatan wajib diisi"),
    assigneeId: z.string().min(1, "PIC lapangan wajib dipilih"),
    startMonth: z.number().min(1).max(36),
    endMonth: z.number().min(1).max(36),
    weight: z.number().min(0).max(100),
    budget: z.number().min(0),
    due_date: z.string(),
    status: z.nativeEnum(ETaskStatus),
    questions: z.array(SurveiQuestionSchema),
});

export const phaseSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Nama fase wajib diisi"),
    tasks: z.array(taskSchema),
});

export const projectFormSchema = z.object({
    detail: projectDetailSchema,
    phases: z.array(phaseSchema).min(1, "Minimal 1 fase"),
});

export type TProjectDetail = z.infer<typeof projectDetailSchema>;
export type TSurveiQuestionForm = z.infer<typeof SurveiQuestionSchema>;
export type TTaskForm = z.infer<typeof taskSchema>;
export type TPhaseForm = z.infer<typeof phaseSchema>;
export type TProjectForm = z.infer<typeof projectFormSchema>;

export const clientOptions = [
    { id: "c1", name: "Universitas Padjadjaran" },
    { id: "c2", name: "PT Citra Silika Mallawa" },
    { id: "c3", name: "PT Mulia Andhika Jaya" },
    { id: "c4", name: "PT Prima Utama Lestari" },
    { id: "c5", name: "PT Tanur Jaya" },
    { id: "c7", name: "PT Hutama Karya (Persero)" },
];

export const userOptions = [
    { id: "u1", name: "Akbar Anugrah" },
    { id: "u2", name: "Syuhada Asdini" },
    { id: "u3", name: "Iska Gushilman" },
    { id: "u4", name: "Rizky Pratama" },
    { id: "u5", name: "Dewi Kartika" },
];
