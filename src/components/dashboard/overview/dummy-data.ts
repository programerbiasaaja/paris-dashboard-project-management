import { EProjectStatus, ETaskStatus, ESubmissionStatus } from "@/types/enums";
import { financialSummary, surveyTotals, projects } from "@/components/dashboard/data/shared";

// Dashboard-specific operational stats (tasks, users — not in Executive Report)
export const overviewStats = {
    totalProjects: 24,
    activeProjects: 14,
    completedProjects: 7,
    onHoldProjects: 3,
    totalTasks: 186,
    doneTasks: 94,
    processTasks: 61,
    holdTasks: 18,
    followUpTasks: 13,
    totalSurveySubmissions: surveyTotals.total,
    approvedSubmissions: surveyTotals.approved,
    pendingSubmissions: surveyTotals.pending,
    rejectedSubmissions: surveyTotals.rejected,
    totalBudget: financialSummary.totalBudget,
    totalCost: financialSummary.totalCost,
    totalContractValue: financialSummary.totalContractValue,
    totalClients: 9,
    totalUsers: 31,
};

export const projectStatusData = [
    { value: 14, name: "Proses", itemStyle: { color: "#2563eb" } },
    { value: 7, name: "Selesai", itemStyle: { color: "#16a34a" } },
    { value: 3, name: "Ditunda", itemStyle: { color: "#f59e0b" } },
];

export const taskStatusData = [
    { value: 61, name: "Proses", itemStyle: { color: "#2563eb" } },
    { value: 94, name: "Selesai", itemStyle: { color: "#16a34a" } },
    { value: 18, name: "Ditunda", itemStyle: { color: "#f59e0b" } },
    { value: 13, name: "Tindak Lanjut", itemStyle: { color: "#ef4444" } },
];

export const submissionStatusData = [
    { value: surveyTotals.approved, name: "Disetujui", itemStyle: { color: "#16a34a" } },
    { value: surveyTotals.pending, name: "Menunggu", itemStyle: { color: "#f59e0b" } },
    { value: surveyTotals.rejected, name: "Ditolak", itemStyle: { color: "#ef4444" } },
];

export const monthlyProjectProgress = {
    months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agt", "Sep", "Okt", "Nov", "Des"],
    budget: [1_200, 1_400, 1_350, 1_600, 1_800, 1_750, 2_100, 2_050, 1_950, 2_200, 2_350, 2_400],
    cost: [950, 1_100, 1_050, 1_280, 1_420, 1_390, 1_650, 1_720, 1_580, 1_870, 2_010, 1_960],
};

export const budgetVsCostByProject = {
    projects: [
        "Rehab DAS\nBorneo Prima",
        "Survei Topografi\nKalimantan",
        "Pemetaan\nLahan Sawit",
        "Konstruksi\nJalan Desa",
        "Pembuatan\nSaluran Irigasi",
        "Reklamasi\nTambang Batubara",
    ],
    budget: [4_500, 3_200, 2_800, 1_950, 2_100, 4_200],
    cost: [3_100, 2_650, 2_200, 1_420, 1_750, 3_310],
};

export const taskCompletionTrend = {
    weeks: ["Minggu 1", "Minggu 2", "Minggu 3", "Minggu 4", "Minggu 5", "Minggu 6", "Minggu 7", "Minggu 8"],
    completed: [5, 8, 11, 9, 14, 12, 17, 18],
    created: [9, 11, 13, 10, 16, 13, 19, 21],
};

export const surveySubmissionTrend = {
    months: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    approved: [28, 34, 31, 42, 39, 48],
    pending: [8, 6, 9, 5, 7, 4],
    rejected: [3, 4, 2, 5, 3, 2],
};

// Dashboard shows top 5 projects (sorted by budget desc)
export const topProjects = projects.slice(0, 5);

export const userRoleDistribution = [
    { value: 8, name: "Project Manager", itemStyle: { color: "#2563eb" } },
    { value: 16, name: "Surveyor", itemStyle: { color: "#0ea5e9" } },
    { value: 4, name: "Finance", itemStyle: { color: "#8b5cf6" } },
    { value: 3, name: "Super Admin", itemStyle: { color: "#f59e0b" } },
];
