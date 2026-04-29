"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { toast } from "sonner";
import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { EProjectStatus, EProjectVisibility } from "@/types/enums";
import { projectFormSchema, type TProjectForm } from "./_components/_schema";
import { Stepper, projectSteps } from "./_components/_stepper";
import { StepDetail } from "./_components/_step-detail";
import { StepPhases } from "./_components/_step-phases";
import { StepTasks } from "./_components/_step-tasks";
import { StepReview } from "./_components/_step-review";

const stepFieldMap: Record<number, (keyof TProjectForm | string)[]> = {
    1: ["detail"],
    2: ["phases"],
    3: ["phases"],
    4: [],
};

export default function ProjectManagementClient() {
    const [step, setStep] = useState(1);

    const form = useForm<TProjectForm>({
        resolver: zodResolver(projectFormSchema),
        mode: "onChange",
        defaultValues: {
            detail: {
                name: "",
                clientId: "",
                picId: "",
                totalContractValue: 0,
                totalBudget: 0,
                startDate: "",
                endDate: "",
                status: EProjectStatus.PROCESS,
                visibility: EProjectVisibility.PRIVATE,
                access_code: "",
                description: "",
            },
            phases: [],
        },
    });

    async function handleNext() {
        const fields = stepFieldMap[step] as (keyof TProjectForm)[];
        const valid = fields.length === 0 ? true : await form.trigger(fields);
        if (!valid) {
            toast.error("Lengkapi data yang wajib diisi terlebih dahulu.");
            return;
        }
        setStep((s) => Math.min(4, s + 1));
    }

    function handleBack() {
        setStep((s) => Math.max(1, s - 1));
    }

    function handleSubmit(values: TProjectForm) {
        // API not ready — log payload for dev preview
        console.log("PROJECT_PAYLOAD", values);
        toast.success("Proyek berhasil disimpan (mock). Integrasi API akan menyusul.");
    }

    return (
        <div className="space-y-4 pb-8">
            <AdminRouteScaffold
                eyebrow="Manajemen Proyek"
                title="Tambah Proyek Baru"
                description="Buat proyek baru lengkap dengan fase, kegiatan, dan formulir survei lapangan."
            />

            <div className="border-border bg-card rounded-xl border p-5 shadow-sm">
                <Stepper steps={projectSteps} current={step} />
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div className="border-border bg-card rounded-xl border p-4 shadow-sm">
                        <div className="mb-4">
                            <h2 className="text-base font-semibold">
                                Langkah {step}. {projectSteps[step - 1].title}
                            </h2>
                            <p className="text-muted-foreground text-sm">{projectSteps[step - 1].description}</p>
                        </div>

                        {step === 1 && <StepDetail />}
                        {step === 2 && <StepPhases />}
                        {step === 3 && <StepTasks />}
                        {step === 4 && <StepReview />}
                    </div>

                    <div className="flex items-center justify-between">
                        <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1}>
                            <ArrowLeft className="h-4 w-4" /> Kembali
                        </Button>

                        {step < 4 ? (
                            <Button type="button" onClick={handleNext}>
                                Lanjut <ArrowRight className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button type="submit">
                                <Save className="h-4 w-4" /> Simpan Proyek
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}
