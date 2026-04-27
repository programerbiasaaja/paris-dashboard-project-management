import { EProjectStatus } from "@/types/enums";

// Financial totals — single source of truth used by both Dashboard and Executive Report
export const financialSummary = {
    totalContractValue: 22_100_000_000,
    totalBudget: 18_750_000_000,
    totalCost: 12_430_000_000,
};

// Survei submission totals — used by both pages
export const SurveiTotals = {
    total: 312,
    approved: 248,
    pending: 42,
    rejected: 22,
};

// Master project list — Dashboard shows top 5, Executive Report shows all 6
export const projects = [
    {
        name: "Rehab DAS Borneo Prima",
        client: "PT. Borneo Prima",
        status: EProjectStatus.PROCESS,
        progress: 68,
        budget: 4_500_000_000,
        cost: 3_060_000_000,
        totalTasks: 24,
        doneTasks: 16,
        onTime: true,
        slaBreached: false,
        escalations: 0,
    },
    {
        name: "Reklamasi Tambang Batubara",
        client: "PT. Bara Jaya",
        status: EProjectStatus.PROCESS,
        progress: 79,
        budget: 4_200_000_000,
        cost: 3_318_000_000,
        totalTasks: 19,
        doneTasks: 15,
        onTime: true,
        slaBreached: false,
        escalations: 1,
    },
    {
        name: "Survei Topografi Kalimantan",
        client: "Dinas PU Kalimantan",
        status: EProjectStatus.PROCESS,
        progress: 83,
        budget: 3_200_000_000,
        cost: 2_656_000_000,
        totalTasks: 18,
        doneTasks: 15,
        onTime: true,
        slaBreached: false,
        escalations: 0,
    },
    {
        name: "Pemetaan Lahan Sawit",
        client: "PT. Sawit Makmur",
        status: EProjectStatus.DONE,
        progress: 100,
        budget: 2_800_000_000,
        cost: 2_310_000_000,
        totalTasks: 15,
        doneTasks: 15,
        onTime: true,
        slaBreached: false,
        escalations: 0,
    },
    {
        name: "Pembuatan Saluran Irigasi",
        client: "Dinas Pertanian",
        status: EProjectStatus.HOLD,
        progress: 45,
        budget: 2_100_000_000,
        cost: 945_000_000,
        totalTasks: 20,
        doneTasks: 9,
        onTime: false,
        slaBreached: true,
        escalations: 2,
    },
    {
        name: "Konstruksi Jalan Desa",
        client: "Pemkab Kutai Barat",
        status: EProjectStatus.PROCESS,
        progress: 31,
        budget: 1_950_000_000,
        cost: 604_500_000,
        totalTasks: 12,
        doneTasks: 4,
        onTime: false,
        slaBreached: true,
        escalations: 2,
    },
];
