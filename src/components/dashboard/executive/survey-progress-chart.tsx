"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SurveiProgressByProject } from "./dummy-data";

export function SurveiProgressChart() {
    const projectNames = SurveiProgressByProject.map((d) => d.project);
    const approved = SurveiProgressByProject.map((d) => d.approved);
    const pending = SurveiProgressByProject.map((d) => d.pending);
    const rejected = SurveiProgressByProject.map((d) => d.rejected);

    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
        },
        legend: {
            data: ["Disetujui", "Menunggu", "Ditolak"],
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        grid: { left: 16, right: 16, bottom: 48, top: 16, containLabel: true },
        xAxis: {
            type: "value",
            axisLabel: { fontSize: 10 },
        },
        yAxis: {
            type: "category",
            data: projectNames,
            axisLabel: {
                fontSize: 10,
                width: 140,
                overflow: "truncate",
            },
        },
        series: [
            {
                name: "Disetujui",
                type: "bar",
                stack: "total",
                data: approved,
                itemStyle: { color: "#16a34a" },
            },
            {
                name: "Menunggu",
                type: "bar",
                stack: "total",
                data: pending,
                itemStyle: { color: "#f59e0b" },
            },
            {
                name: "Ditolak",
                type: "bar",
                stack: "total",
                data: rejected,
                itemStyle: { color: "#ef4444" },
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Progres Survei per Proyek</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 300 }} />
            </CardContent>
        </Card>
    );
}
