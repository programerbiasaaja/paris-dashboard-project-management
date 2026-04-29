"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ETaskStatus, TaskStatusLabels } from "@/types/enums";
import { dummyProjectDetail, type IPhaseActivity, type IProjectPhase } from "../_components/_data";

const statusBarMap: Record<ETaskStatus, string> = {
    [ETaskStatus.DONE]: "bg-green-500",
    [ETaskStatus.PROCESS]: "bg-blue-500",
    [ETaskStatus.HOLD]: "bg-slate-400",
    [ETaskStatus.FOLLOW_UP]: "bg-amber-500",
};

const statusBgSoftMap: Record<ETaskStatus, string> = {
    [ETaskStatus.DONE]: "bg-green-100 text-green-700",
    [ETaskStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [ETaskStatus.HOLD]: "bg-slate-100 text-slate-600",
    [ETaskStatus.FOLLOW_UP]: "bg-amber-100 text-amber-700",
};

function formatDate(value: string) {
    return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}

function startOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d: Date) {
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function monthsBetween(start: Date, end: Date) {
    const months: Date[] = [];
    let cur = startOfMonth(start);
    const last = startOfMonth(end);
    while (cur <= last) {
        months.push(new Date(cur));
        cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
    }
    return months;
}

export default function ProjectTimelineClient() {
    const { phases, startDate, endDate } = dummyProjectDetail;

    const { rangeStart, totalMs, months } = useMemo(() => {
        const allDates = [
            new Date(startDate),
            new Date(endDate),
            ...phases.flatMap((p) => [new Date(p.startDate), new Date(p.endDate)]),
            ...phases.flatMap((p) => p.activities.flatMap((a) => [new Date(a.startDate), new Date(a.endDate)])),
        ];
        const min = startOfMonth(new Date(Math.min(...allDates.map((d) => d.getTime()))));
        const max = endOfMonth(new Date(Math.max(...allDates.map((d) => d.getTime()))));
        return {
            rangeStart: min,
            totalMs: max.getTime() - min.getTime(),
            months: monthsBetween(min, max),
        };
    }, [phases, startDate, endDate]);

    function barStyle(start: string, end: string) {
        const s = new Date(start).getTime();
        const e = new Date(end).getTime();
        const left = ((s - rangeStart.getTime()) / totalMs) * 100;
        const width = ((e - s) / totalMs) * 100;
        return { left: `${left}%`, width: `${Math.max(width, 1.5)}%` };
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                <SummaryStat label="Mulai Proyek" value={formatDate(startDate)} />
                <SummaryStat label="Selesai Proyek" value={formatDate(endDate)} />
                <SummaryStat label="Jumlah Fase" value={phases.length} />
                <SummaryStat
                    label="Progres Rata-rata"
                    value={`${Math.round(phases.reduce((s, p) => s + p.progress, 0) / phases.length)}%`}
                    accent="text-primary"
                />
            </div>

            <Card className="p-0">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <div className="min-w-[900px]">
                            <div className="flex border-b bg-gray-50">
                                <div className="text-muted-foreground w-72 shrink-0 border-r px-4 py-3 text-xs font-medium">Fase / Aktivitas</div>
                                <div className="relative flex-1">
                                    <div className="flex h-full">
                                        {months.map((m, i) => (
                                            <div
                                                key={i}
                                                className="text-muted-foreground flex-1 border-r px-2 py-3 text-center text-[11px] font-medium last:border-r-0"
                                            >
                                                {m.toLocaleDateString("id-ID", { month: "short", year: "2-digit" })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {phases.map((phase) => (
                                <PhaseBlock key={phase.id} phase={phase} months={months} barStyle={barStyle} />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                <span className="font-medium">Legenda:</span>
                {(Object.keys(statusBarMap) as ETaskStatus[]).map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5">
                        <span className={`h-2.5 w-3 rounded-sm ${statusBarMap[s]}`} />
                        {TaskStatusLabels[s]}
                    </span>
                ))}
            </div>
        </div>
    );
}

function PhaseBlock({
    phase,
    months,
    barStyle,
}: {
    phase: IProjectPhase;
    months: Date[];
    barStyle: (start: string, end: string) => { left: string; width: string };
}) {
    return (
        <div className="border-b last:border-b-0">
            <div className="bg-primary-50/40 flex">
                <div className="w-72 shrink-0 border-r px-4 py-3">
                    <div className="text-sm font-semibold">
                        {phase.orderIndex}. {phase.name}
                    </div>
                    <div className="text-muted-foreground text-[11px]">
                        {formatDate(phase.startDate)} – {formatDate(phase.endDate)}
                    </div>
                </div>
                <div className="relative flex-1">
                    <GridLines count={months.length} />
                    <div className="relative h-full min-h-12 py-3">
                        <div className="absolute inset-y-0 flex items-center" style={barStyle(phase.startDate, phase.endDate)}>
                            <div className="bg-primary/15 relative h-6 w-full overflow-hidden rounded-md">
                                <div className="bg-primary absolute inset-y-0 left-0" style={{ width: `${phase.progress}%` }} />
                                <div className="relative flex h-full items-center justify-center px-2 text-[11px] font-semibold text-slate-800">
                                    {phase.progress}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {phase.activities.map((activity) => (
                <ActivityRow key={activity.id} activity={activity} monthsCount={months.length} barStyle={barStyle} />
            ))}
        </div>
    );
}

function ActivityRow({
    activity,
    monthsCount,
    barStyle,
}: {
    activity: IPhaseActivity;
    monthsCount: number;
    barStyle: (start: string, end: string) => { left: string; width: string };
}) {
    return (
        <div className="flex border-t bg-white">
            <div className="w-72 shrink-0 border-r px-4 py-2.5 pl-8">
                <div className="text-sm">{activity.name}</div>
                <div className="mt-0.5 flex items-center gap-2">
                    <span className="text-muted-foreground text-[11px]">{activity.assignee}</span>
                    <span
                        className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium ${statusBgSoftMap[activity.status]}`}
                    >
                        {TaskStatusLabels[activity.status]}
                    </span>
                </div>
            </div>
            <div className="relative flex-1">
                <GridLines count={monthsCount} />
                <div className="relative h-full min-h-11 py-2.5">
                    <div className="absolute inset-y-0 flex items-center" style={barStyle(activity.startDate, activity.endDate)}>
                        <div className="relative h-5 w-full overflow-hidden rounded bg-gray-200">
                            <div
                                className={`absolute inset-y-0 left-0 ${statusBarMap[activity.status]}`}
                                style={{ width: `${activity.progress}%` }}
                            />
                            <div className="relative flex h-full items-center px-2 text-[10px] font-medium text-slate-700">{activity.progress}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function GridLines({ count }: { count: number }) {
    return (
        <div className="pointer-events-none absolute inset-0 flex">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex-1 border-r last:border-r-0" />
            ))}
        </div>
    );
}

function SummaryStat({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
    return (
        <Card className="p-0">
            <CardContent className="p-4">
                <div className="text-muted-foreground text-xs">{label}</div>
                <div className={`mt-1 text-sm font-semibold ${accent ?? "text-slate-700"}`}>{value}</div>
            </CardContent>
        </Card>
    );
}
