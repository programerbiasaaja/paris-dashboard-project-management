"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { budgetRealizationByQuarter } from "./dummy-data";

export function BudgetRealizationChart() {
    const option = {
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            formatter: (params: { seriesName: string; value: number }[]) =>
                params.map((p) => `${p.seriesName}: Rp ${(p.value * 1_000_000).toLocaleString("id-ID")}`).join("<br/>"),
        },
        legend: {
            data: ["Anggaran", "Realisasi"],
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        grid: { left: 16, right: 16, bottom: 48, top: 16, containLabel: true },
        xAxis: {
            type: "category",
            data: budgetRealizationByQuarter.quarters,
            axisLabel: { fontSize: 12 },
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
                data: budgetRealizationByQuarter.budget,
                itemStyle: { color: "#2563eb", borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 40,
            },
            {
                name: "Realisasi",
                type: "bar",
                data: budgetRealizationByQuarter.cost,
                itemStyle: { color: "#16a34a", borderRadius: [4, 4, 0, 0] },
                barMaxWidth: 40,
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Realisasi Anggaran per Kuartal</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 280 }} />
            </CardContent>
        </Card>
    );
}
