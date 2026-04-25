"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { taskStatusData } from "./dummy-data";

export function TaskStatusChart() {
    const option = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c} tugas ({d}%)",
        },
        legend: {
            orient: "horizontal",
            bottom: 0,
            textStyle: { fontSize: 12 },
        },
        series: [
            {
                name: "Status Tugas",
                type: "pie",
                radius: ["45%", "70%"],
                center: ["50%", "45%"],
                label: { show: false },
                emphasis: {
                    label: { show: true, fontSize: 14, fontWeight: "bold" },
                },
                data: taskStatusData,
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Status Tugas</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 260 }} />
            </CardContent>
        </Card>
    );
}
