"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projectStatusData } from "./dummy-data";

export function ProjectStatusChart() {
    const option = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c} proyek ({d}%)",
        },
        legend: {
            orient: "horizontal",
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        series: [
            {
                name: "Status Proyek",
                type: "pie",
                radius: ["45%", "70%"],
                center: ["50%", "45%"],
                avoidLabelOverlap: false,
                label: { show: false },
                emphasis: {
                    label: { show: true, fontSize: 14, fontWeight: "bold" },
                },
                data: projectStatusData,
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Proyek</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 260 }} />
            </CardContent>
        </Card>
    );
}
