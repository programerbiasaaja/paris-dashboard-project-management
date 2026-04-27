import { ESubmissionStatus } from "@/types/enums";
import { financialSummary, SurveiTotals, projects } from "@/components/dashboard/data/shared";

// Executive-specific KPIs: financial, portfolio health, SLA, escalations
export const executiveKpis = {
    totalContractValue: financialSummary.totalContractValue,
    totalBudget: financialSummary.totalBudget,
    totalCost: financialSummary.totalCost,
    budgetAbsorptionRate: 66.3,
    totalProjects: 24,
    activeProjects: 14,
    completedProjects: 7,
    onHoldProjects: 3,
    onTimeProjects: 11,
    delayedProjects: 3,
    totalSurveiSubmissions: SurveiTotals.total,
    approvedSubmissions: SurveiTotals.approved,
    pendingSubmissions: SurveiTotals.pending,
    rejectedSubmissions: SurveiTotals.rejected,
    SurveiApprovalRate: 79.5,
    totalEscalations: 5,
    resolvedEscalations: 2,
    openEscalations: 3,
    slaBreached: 2,
    slaOnTrack: 12,
};

// Full portfolio — all projects with SLA and escalation fields from shared master list
export const portfolioProjects = projects;

// Executive Report shows quarterly budget realization (higher-level than dashboard's monthly view)
export const budgetRealizationByQuarter = {
    quarters: ["Q1", "Q2", "Q3", "Q4"],
    budget: [4_200, 4_800, 5_100, 4_650],
    cost: [3_100, 3_720, 3_890, 1_720],
};

// Survei breakdown per project — executive view, not shown on dashboard
export const SurveiProgressByProject = [
    { project: "Rehab DAS Borneo Prima", approved: 48, pending: 6, rejected: 3 },
    { project: "Reklamasi Tambang Batubara", approved: 62, pending: 8, rejected: 4 },
    { project: "Survei Topografi Kalimantan", approved: 71, pending: 12, rejected: 5 },
    { project: "Pemetaan Lahan Sawit", approved: 45, pending: 5, rejected: 6 },
    { project: "Pembuatan Saluran Irigasi", approved: 22, pending: 11, rejected: 4 },
];

// Escalation log — executive only
export const escalations = [
    {
        id: "ESC-001",
        project: "Pembuatan Saluran Irigasi",
        client: "Dinas Pertanian",
        issue: "Keterlambatan mobilisasi alat berat",
        raisedBy: "Ahmad Fauzi",
        raisedAt: "2026-04-10",
        status: ESubmissionStatus.PENDING,
        priority: "Tinggi",
    },
    {
        id: "ESC-002",
        project: "Pembuatan Saluran Irigasi",
        client: "Dinas Pertanian",
        issue: "Pembayaran termin ke-2 belum cair",
        raisedBy: "Siti Rahayu",
        raisedAt: "2026-04-14",
        status: ESubmissionStatus.PENDING,
        priority: "Tinggi",
    },
    {
        id: "ESC-003",
        project: "Konstruksi Jalan Desa",
        client: "Pemkab Kutai Barat",
        issue: "Perubahan desain oleh klien tanpa adendum",
        raisedBy: "Budi Santoso",
        raisedAt: "2026-04-17",
        status: ESubmissionStatus.PENDING,
        priority: "Sedang",
    },
    {
        id: "ESC-004",
        project: "Reklamasi Tambang Batubara",
        client: "PT. Bara Jaya",
        issue: "Dokumen lingkungan ditolak BPLHD",
        raisedBy: "Dewi Kusuma",
        raisedAt: "2026-04-05",
        status: ESubmissionStatus.APPROVED,
        priority: "Tinggi",
    },
    {
        id: "ESC-005",
        project: "Survei Topografi Kalimantan",
        client: "Dinas PU Kalimantan",
        issue: "Cuaca ekstrem menghambat survei lapangan",
        raisedBy: "Rizky Pratama",
        raisedAt: "2026-04-08",
        status: ESubmissionStatus.APPROVED,
        priority: "Rendah",
    },
];
