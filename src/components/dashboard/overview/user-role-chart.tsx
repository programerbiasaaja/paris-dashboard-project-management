"use client";

import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userRoleDistribution } from "./dummy-data";

export function UserRoleChart() {
    const option = {
        tooltip: {
            trigger: "item",
            formatter: "{b}: {c} pengguna ({d}%)",
        },
        legend: {
            orient: "vertical",
            right: 0,
            top: "center",
            textStyle: { fontSize: 11 },
        },
        series: [
            {
                name: "Role Pengguna",
                type: "pie",
                radius: ["40%", "65%"],
                center: ["38%", "50%"],
                label: { show: false },
                emphasis: {
                    label: { show: true, fontSize: 13, fontWeight: "bold" },
                },
                data: userRoleDistribution,
            },
        ],
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Distribusi Role Pengguna</CardTitle>
            </CardHeader>
            <CardContent>
                <ReactECharts option={option} style={{ height: 220 }} />
            </CardContent>
        </Card>
    );
}
