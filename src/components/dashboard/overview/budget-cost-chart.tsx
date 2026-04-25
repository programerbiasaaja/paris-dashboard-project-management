"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { budgetVsCostByProject } from "./dummy-data";

export function BudgetCostChart() {
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            formatter: (params: { seriesName: string; value: number; name: string }[]) =>
                params
                    .map((p) => `${p.seriesName}: Rp ${(p.value * 1_000_000).toLocaleString("id-ID")}`)
                    .join("<br/>"),
        },
        legend: {
            data: ["Anggaran", "Realisasi Biaya"],
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        grid: { left: 16, right: 16, bottom: 48, top: 16, containLabel: true },
        xAxis: {
            type: "category",
            data: budgetVsCostByProject.projects,
            axisLabel: { fontSize: 10, interval: 0 },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                fontSize: 10,
                formatter: (v: number) => `${v / 1000}M`,
            },
        },
        series: [
            {
                name: "Anggaran",
                type: "bar",
                data: budgetVsCostByProject.budget,
                itemStyle: { color: "#2563eb", borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 28,
            },
            {
                name: "Realisasi Biaya",
                type: "bar",
                data: budgetVsCostByProject.cost,
                itemStyle: { color: "#0ea5e9", borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 28,
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Anggaran vs Realisasi per Proyek</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 300 }} />
            </CardContent>
        </Card>
    );
}
