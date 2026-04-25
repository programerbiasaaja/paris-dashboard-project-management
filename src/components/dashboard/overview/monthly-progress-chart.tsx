"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { monthlyProjectProgress } from "./dummy-data";

export function MonthlyProgressChart() {
    const option = {
        tooltip: {
            trigger: "axis",
            formatter: (params: { seriesName: string; value: number }[]) =>
                params
                    .map((p) => `${p.seriesName}: Rp ${(p.value * 1_000_000).toLocaleString("id-ID")}`)
                    .join("<br/>"),
        },
        legend: {
            data: ["Anggaran", "Realisasi"],
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        grid: { left: 16, right: 16, bottom: 48, top: 16, containLabel: true },
        xAxis: {
            type: "category",
            boundaryGap: false,
            data: monthlyProjectProgress.months,
            axisLabel: { fontSize: 11 },
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
                type: "line",
                data: monthlyProjectProgress.budget,
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                lineStyle: { color: "#2563eb", width: 2 },
                itemStyle: { color: "#2563eb" },
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: "rgba(37,99,235,0.2)" },
                            { offset: 1, color: "rgba(37,99,235,0)" },
                        ],
                    },
                },
            },
            {
                name: "Realisasi",
                type: "line",
                data: monthlyProjectProgress.cost,
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                lineStyle: { color: "#16a34a", width: 2 },
                itemStyle: { color: "#16a34a" },
                areaStyle: {
                    color: {
                        type: "linear",
                        x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: "rgba(22,163,74,0.15)" },
                            { offset: 1, color: "rgba(22,163,74,0)" },
                        ],
                    },
                },
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tren Anggaran & Realisasi Bulanan</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 280 }} />
            </CardContent>
        </Card>
    );
}
