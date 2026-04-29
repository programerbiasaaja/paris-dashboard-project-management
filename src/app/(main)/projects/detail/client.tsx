"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Building2, Calendar, ExternalLink, MapPin, User, Wallet, Receipt, ListChecks, GanttChartSquare, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EProjectStatus, EProjectVisibility, ProjectStatusLabels, ProjectVisibilityLabels } from "@/types/enums";
import { dummyProjectDetail } from "./_components/_data";
import ProjectPaymentClient from "./payment/client";
import ProjectTaskClient from "./task/client";
import ProjectTimelineClient from "./timeline/client";

const statusVariantMap: Record<EProjectStatus, string> = {
    [EProjectStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [EProjectStatus.HOLD]: "bg-amber-100 text-amber-700",
    [EProjectStatus.DONE]: "bg-green-100 text-green-700",
};

const visibilityVariantMap: Record<EProjectVisibility, string> = {
    [EProjectVisibility.PUBLIC]: "bg-emerald-100 text-emerald-700",
    [EProjectVisibility.PRIVATE]: "bg-slate-100 text-slate-600",
};

function formatIDR(value: number) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

type TTabValue = "payment" | "task" | "timeline";

export default function ProjectDetailClient({ defaultTab = "payment" }: { defaultTab?: TTabValue }) {
    const router = useRouter();
    const project = dummyProjectDetail;
    const [tab, setTab] = useState<TTabValue>(defaultTab);

    return (
        <div className="space-y-4 pb-8">
            <section className="border-border/70 rounded-xl border bg-[linear-gradient(135deg,var(--color-primary-50),var(--background)_48%,var(--color-secondary-50))] p-5 shadow-sm dark:bg-[linear-gradient(135deg,var(--card),var(--background)_52%,var(--card))]">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                        <Button variant="ghost" size="sm" onClick={() => router.push("/projects")} className="-ml-2 gap-1">
                            <ArrowLeft className="h-4 w-4" />
                            Kembali ke Daftar Proyek
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => router.push(`/client/projects/${project.id}`)} className="gap-1.5">
                            <ExternalLink className="h-4 w-4" />
                            Portal Klien
                        </Button>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Detail Proyek</div>
                            <Badge className={`${statusVariantMap[project.status]} hover:${statusVariantMap[project.status]}`}>
                                {ProjectStatusLabels[project.status]}
                            </Badge>
                            <Badge className={`${visibilityVariantMap[project.visibility]} hover:${visibilityVariantMap[project.visibility]}`}>
                                {ProjectVisibilityLabels[project.visibility]}
                            </Badge>
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight text-balance">{project.name}</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
                        <InfoTile icon={<Building2 className="h-4 w-4" />} label="Klien" value={project.client} />
                        <InfoTile icon={<User className="h-4 w-4" />} label="PIC" value={project.pic} />
                        <InfoTile icon={<MapPin className="h-4 w-4" />} label="Lokasi" value={`${project.city}, ${project.province}`} />
                        <InfoTile
                            icon={<Calendar className="h-4 w-4" />}
                            label="Periode"
                            value={`${formatDate(project.startDate)} – ${formatDate(project.endDate)}`}
                        />
                        <InfoTile icon={<KeyRound className="h-4 w-4" />} label="Kode Akses" value={project.accessCode} />
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <ValueTile label="Nilai Kontrak" value={formatIDR(project.totalContractValue)} accent="text-slate-700" />
                        <ValueTile label="Anggaran" value={formatIDR(project.totalBudget)} accent="text-blue-700" />
                        <ValueTile label="Realisasi Biaya" value={formatIDR(project.totalCost)} accent="text-amber-700" />
                    </div>
                </div>
            </section>

            <Tabs value={tab} onValueChange={(v) => v && setTab(v as TTabValue)}>
                <TabsList className="gap-x-4">
                    <TabsTrigger value="payment" className="cursor-pointer">
                        <Wallet />
                        Pembayaran
                    </TabsTrigger>
                    <TabsTrigger value="task" className="cursor-pointer">
                        <ListChecks />
                        Tugas
                    </TabsTrigger>
                    <TabsTrigger value="timeline" className="cursor-pointer">
                        <GanttChartSquare />
                        Jadwal
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="payment" className="pt-2">
                    <ProjectPaymentClient />
                </TabsContent>
                <TabsContent value="task" className="pt-2">
                    <ProjectTaskClient />
                </TabsContent>
                <TabsContent value="timeline" className="pt-2">
                    <ProjectTimelineClient />
                </TabsContent>
            </Tabs>
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

function ValueTile({ label, value, accent }: { label: string; value: string; accent: string }) {
    return (
        <Card className="dark:bg-card/60 bg-white/60 p-0">
            <CardContent className="p-3">
                <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                    <Receipt className="h-3.5 w-3.5" />
                    {label}
                </div>
                <div className={`mt-1 text-base font-semibold ${accent}`}>{value}</div>
            </CardContent>
        </Card>
    );
}
