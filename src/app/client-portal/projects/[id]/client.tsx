"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
    ArrowRightIcon,
    BuildingIcon,
    CalendarIcon,
    DownloadIcon,
    FileTextIcon,
    ImageIcon,
    LockKeyholeIcon,
    MapPinIcon,
    SproutIcon,
    ShieldCheckIcon,
    UserIcon,
} from "lucide-react";

import { BrandIconText } from "@/components/brand";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EProjectStatus, ETaskStatus, ProjectStatusLabels, TaskStatusLabels } from "@/types/enums";
import type { IProjectFile } from "@/types/project";
import type { IProjectPhase } from "@/app/(main)/projects/detail/_components/_data";
import type { TPlantingZone } from "./_components/PlantingAreaMap";
import type { TPlantingPhoto } from "./_components/_plantingData";

const PlantingAreaMap = dynamic(() => import("./_components/PlantingAreaMap"), {
    ssr: false,
    loading: () => (
        <div className="border-border/70 bg-muted/40 text-muted-foreground flex h-[420px] w-full items-center justify-center rounded-lg border text-sm">
            Memuat peta area penanaman…
        </div>
    ),
});

export type TPortalPlantingArea = {
    zones: TPlantingZone[];
    center: [number, number];
    photos: TPlantingPhoto[];
};

type TPortalProject = {
    id: string;
    name: string;
    clientName: string;
    picName: string;
    province: string;
    city: string;
    startDate: string;
    endDate: string;
    status: EProjectStatus;
    accessCode: string;
    files: IProjectFile[];
};

const statusVariantMap: Record<EProjectStatus, string> = {
    [EProjectStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [EProjectStatus.HOLD]: "bg-amber-100 text-amber-700",
    [EProjectStatus.DONE]: "bg-green-100 text-green-700",
};

const taskStatusVariantMap: Record<ETaskStatus, string> = {
    [ETaskStatus.FOLLOW_UP]: "bg-slate-100 text-slate-700",
    [ETaskStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [ETaskStatus.HOLD]: "bg-amber-100 text-amber-700",
    [ETaskStatus.DONE]: "bg-green-100 text-green-700",
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

const accessCodeSchema = z.object({
    code: z.string().min(1, "Kode akses wajib diisi."),
});
type TAccessCodeForm = z.infer<typeof accessCodeSchema>;

export default function ClientPortalClient({
    project,
    phases,
    plantingArea,
}: {
    project: TPortalProject;
    phases: IProjectPhase[];
    plantingArea?: TPortalPlantingArea;
}) {
    const [unlocked, setUnlocked] = useState(false);

    const overallProgress = useMemo(() => {
        if (phases.length === 0) return 0;
        return Math.round(phases.reduce((sum, ph) => sum + ph.progress, 0) / phases.length);
    }, [phases]);

    if (!unlocked) {
        return <AccessCodeGate project={project} onUnlock={() => setUnlocked(true)} />;
    }

    return (
        <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-8 sm:py-10">
            <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <BrandIconText />
                <div className="flex items-center gap-2 text-xs">
                    <ShieldCheckIcon className="text-secondary-700 h-4 w-4" />
                    <span className="text-muted-foreground">Portal Klien · Tampilan hanya-baca</span>
                </div>
            </header>

            <section className="border-border/70 rounded-xl border bg-[linear-gradient(135deg,var(--color-primary-50),var(--background)_48%,var(--color-secondary-50))] p-5 shadow-sm dark:bg-[linear-gradient(135deg,var(--card),var(--background)_52%,var(--card))]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Ringkasan Proyek</div>
                        <Badge className={`${statusVariantMap[project.status]} hover:${statusVariantMap[project.status]}`}>
                            {ProjectStatusLabels[project.status]}
                        </Badge>
                    </div>
                    <h1 className="text-xl font-semibold tracking-tight text-balance">{project.name}</h1>
                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        <InfoTile icon={<BuildingIcon className="h-4 w-4" />} label="Klien" value={project.clientName} />
                        <InfoTile icon={<UserIcon className="h-4 w-4" />} label="PIC" value={project.picName} />
                        <InfoTile icon={<MapPinIcon className="h-4 w-4" />} label="Lokasi" value={`${project.city}, ${project.province}`} />
                        <InfoTile
                            icon={<CalendarIcon className="h-4 w-4" />}
                            label="Periode"
                            value={`${formatDate(project.startDate)} – ${formatDate(project.endDate)}`}
                        />
                    </div>
                </div>
            </section>

            <Card className="p-0">
                <CardContent className="p-5">
                    <div className="mb-4 flex items-end justify-between gap-3">
                        <div>
                            <h2 className="text-base font-semibold">Progres Pekerjaan</h2>
                            <p className="text-muted-foreground text-xs">Ringkasan capaian pada setiap fase pekerjaan.</p>
                        </div>
                        <div className="text-right">
                            <div className="text-muted-foreground text-xs">Progres Keseluruhan</div>
                            <div className="text-primary text-2xl font-semibold">{overallProgress}%</div>
                        </div>
                    </div>
                    <ProgressBar value={overallProgress} />

                    <div className="mt-6 space-y-4">
                        {phases.map((phase) => (
                            <div key={phase.id} className="border-border/70 rounded-lg border p-4">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                    <div>
                                        <div className="text-sm font-medium">
                                            {phase.orderIndex}. {phase.name}
                                        </div>
                                        <div className="text-muted-foreground text-xs">
                                            {formatDate(phase.startDate)} – {formatDate(phase.endDate)}
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold">{phase.progress}%</div>
                                </div>
                                <div className="mt-2">
                                    <ProgressBar value={phase.progress} />
                                </div>
                                <ul className="mt-3 space-y-1.5">
                                    {phase.activities.map((act) => (
                                        <li key={act.id} className="flex items-center justify-between gap-3 text-xs">
                                            <span className="text-muted-foreground line-clamp-1">{act.name}</span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-foreground/80 font-medium tabular-nums">{act.progress}%</span>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${taskStatusVariantMap[act.status]}`}
                                                >
                                                    {TaskStatusLabels[act.status]}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {plantingArea && (
                <Card className="p-0">
                    <CardContent className="p-5">
                        <div className="mb-3 flex items-start justify-between gap-3">
                            <div>
                                <div className="flex items-center gap-2">
                                    <SproutIcon className="h-4 w-4 text-green-700" />
                                    <h2 className="text-base font-semibold">Peta Area Penanaman</h2>
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    Sebaran zona reklamasi & revegetasi beserta progres penanaman per zona.
                                </p>
                            </div>
                            <div className="hidden gap-3 text-xs sm:flex">
                                <LegendDot color="#16a34a" label="≥ 80%" />
                                <LegendDot color="#65a30d" label="50–79%" />
                                <LegendDot color="#ca8a04" label="20–49%" />
                                <LegendDot color="#dc2626" label="< 20%" />
                            </div>
                        </div>
                        <PlantingAreaMap zones={plantingArea.zones} center={plantingArea.center} />
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {plantingArea.zones.map((zone) => (
                                <div key={zone.id} className="border-border/70 rounded-lg border p-3">
                                    <div className="text-xs font-medium">{zone.name}</div>
                                    <div className="text-primary mt-1 text-lg font-semibold tabular-nums">{zone.progress}%</div>
                                    <div className="text-muted-foreground text-[11px]">
                                        {zone.plantedTrees.toLocaleString("id-ID")} / {zone.targetTrees.toLocaleString("id-ID")} bibit
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {plantingArea && plantingArea.photos.length > 0 && (
                <Card className="p-0">
                    <CardContent className="p-5">
                        <div className="mb-3">
                            <div className="flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-secondary-700" />
                                <h2 className="text-base font-semibold">Dokumentasi Kegiatan Penanaman</h2>
                            </div>
                            <p className="text-muted-foreground text-xs">Foto lapangan dari kegiatan reklamasi dan revegetasi.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {plantingArea.photos.map((photo) => (
                                <figure
                                    key={photo.id}
                                    className="border-border/70 group overflow-hidden rounded-lg border bg-muted/40"
                                >
                                    <div className="aspect-[4/3] w-full overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={photo.url}
                                            alt={photo.caption}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                            loading="lazy"
                                        />
                                    </div>
                                    <figcaption className="space-y-0.5 p-2.5">
                                        <div className="text-muted-foreground text-[11px]">{formatDate(photo.takenAt)}</div>
                                        <div className="line-clamp-2 text-xs">{photo.caption}</div>
                                    </figcaption>
                                </figure>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            <Card className="p-0">
                <CardContent className="p-5">
                    <div className="mb-3">
                        <h2 className="text-base font-semibold">Dokumen Progres</h2>
                        <p className="text-muted-foreground text-xs">Unduh laporan dan dokumen pendukung yang telah diunggah oleh tim PARIS.</p>
                    </div>
                    {project.files.length === 0 ? (
                        <div className="border-border/70 text-muted-foreground rounded-lg border border-dashed p-6 text-center text-sm">
                            Belum ada dokumen progres yang diunggah.
                        </div>
                    ) : (
                        <ul className="divide-border/70 divide-y">
                            {project.files.map((file) => (
                                <li key={file.url} className="flex items-center justify-between gap-3 py-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                        <div className="bg-primary-50 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
                                            <FileTextIcon className="h-4 w-4" />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="line-clamp-1 text-sm font-medium">{file.name}</div>
                                            <div className="text-muted-foreground line-clamp-1 text-xs">{file.url}</div>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" nativeButton={false} render={<a href={file.url} download />}>
                                        <DownloadIcon className="h-4 w-4" />
                                        Unduh
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function AccessCodeGate({ project, onUnlock }: { project: TPortalProject; onUnlock: () => void }) {
    const form = useForm<TAccessCodeForm>({
        resolver: zodResolver(accessCodeSchema),
        defaultValues: { code: "" },
        mode: "onSubmit",
    });

    const onSubmit = (values: TAccessCodeForm) => {
        if (values.code.trim().toUpperCase() === project.accessCode.toUpperCase()) {
            toast.success("Akses diterima", { description: "Anda akan diarahkan ke ringkasan progres." });
            onUnlock();
            return;
        }
        form.setError("code", { message: "Kode akses tidak sesuai." });
        toast.error("Akses ditolak", { description: "Periksa kembali kode akses dari PIC proyek Anda." });
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-10">
            <Card className="w-full max-w-md p-0 shadow-lg">
                <CardContent className="space-y-5 p-6 sm:p-8">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <BrandIconText />
                        <div>
                            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Portal Klien</div>
                            <h1 className="mt-1 text-lg font-semibold tracking-tight text-balance">{project.name}</h1>
                        </div>
                    </div>

                    <div className="border-border/70 bg-muted/40 rounded-lg border p-3 text-xs">
                        <div className="text-muted-foreground">Klien</div>
                        <div className="font-medium">{project.clientName}</div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Kode Akses</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <LockKeyholeIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                                                <Input
                                                    autoFocus
                                                    autoComplete="off"
                                                    placeholder="Masukkan kode akses dari PIC proyek"
                                                    className="pl-9 tracking-wider uppercase"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Buka Ringkasan Progres
                                <ArrowRightIcon className="h-4 w-4" />
                            </Button>
                            <p className="text-muted-foreground text-center text-xs">Hubungi PIC proyek Anda jika belum menerima kode akses.</p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <Card className="dark:bg-card/60 bg-white/60 p-0">
            <CardContent className="p-3">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    {icon}
                    <span>{label}</span>
                </div>
                <div className="mt-1 line-clamp-2 text-sm font-medium">{value}</div>
            </CardContent>
        </Card>
    );
}

function LegendDot({ color, label }: { color: string; label: string }) {
    return (
        <div className="text-muted-foreground flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span>{label}</span>
        </div>
    );
}

function ProgressBar({ value }: { value: number }) {
    const clamped = Math.max(0, Math.min(100, value));
    return (
        <div className="bg-muted h-2 w-full overflow-hidden rounded-full">
            <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${clamped}%` }} />
        </div>
    );
}
