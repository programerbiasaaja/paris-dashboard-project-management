"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { surveySubmissionTrend } from "./dummy-data";

export function SubmissionTrendChart() {
    const option = {
        tooltip: { trigger: "axis" },
        legend: {
            data: ["Disetujui", "Menunggu", "Ditolak"],
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        grid: { left: 16, right: 16, bottom: 48, top: 16, containLabel: true },
        xAxis: {
            type: "category",
            data: surveySubmissionTrend.months,
            axisLabel: { fontSize: 11 },
        },
        yAxis: {
            type: "value",
            axisLabel: { fontSize: 10 },
        },
        series: [
            {
                name: "Disetujui",
                type: "bar",
                stack: "total",
                data: surveySubmissionTrend.approved,
                itemStyle: { color: "#16a34a" },
            },
            {
                name: "Menunggu",
                type: "bar",
                stack: "total",
                data: surveySubmissionTrend.pending,
                itemStyle: { color: "#f59e0b" },
            },
            {
                name: "Ditolak",
                type: "bar",
                stack: "total",
                data: surveySubmissionTrend.rejected,
                itemStyle: { color: "#ef4444", borderRadius: [4, 4, 0, 0] },
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tren Pengisian Survei</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 260 }} />
            </CardContent>
        </Card>
    );
}
