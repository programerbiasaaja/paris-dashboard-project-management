import { EProjectStatus, EProjectVisibility, ETaskStatus, ESubmissionStatus } from "@/types/enums";

export type TPaymentTermType = "DOWN_PAYMENT" | "PROGRESS" | "RETENTION" | "FINAL";
export type TPaymentStatus = "PAID" | "PARTIAL" | "UNPAID" | "OVERDUE";

export const PaymentTermTypeLabels: Record<TPaymentTermType, string> = {
    DOWN_PAYMENT: "Uang Muka",
    PROGRESS: "Termin Progress",
    RETENTION: "Retensi",
    FINAL: "Pelunasan",
};

export const PaymentStatusLabels: Record<TPaymentStatus, string> = {
    PAID: "Lunas",
    PARTIAL: "Sebagian",
    UNPAID: "Belum Dibayar",
    OVERDUE: "Terlambat",
};

export interface IProjectPayment {
    id: string;
    termNo: number;
    termType: TPaymentTermType;
    description: string;
    percentage: number;
    amount: number;
    paidAmount: number;
    invoiceNo: string;
    invoiceDate: string;
    dueDate: string;
    paidDate: string | null;
    status: TPaymentStatus;
    notes?: string;
}

export type TTaskKind = "TASK" | "SURVEI" | "JOURNEY";

export const TaskKindLabels: Record<TTaskKind, string> = {
    TASK: "Task",
    SURVEI: "Survei",
    JOURNEY: "Journey",
};

export interface IProjectTask {
    id: string;
    code: string;
    name: string;
    kind: TTaskKind;
    assignee: string;
    phase: string;
    progress: number;
    status: ETaskStatus;
    submissionStatus: ESubmissionStatus | null;
    startDate: string;
    dueDate: string;
    submittedAt: string | null;
}

export interface IPhaseActivity {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    progress: number;
    assignee: string;
    status: ETaskStatus;
}

export interface IProjectPhase {
    id: string;
    name: string;
    orderIndex: number;
    startDate: string;
    endDate: string;
    progress: number;
    activities: IPhaseActivity[];
}

export interface IProjectDetail {
    id: string;
    name: string;
    client: string;
    pic: string;
    province: string;
    city: string;
    year: number;
    startDate: string;
    endDate: string;
    status: EProjectStatus;
    visibility: EProjectVisibility;
    totalContractValue: number;
    totalBudget: number;
    totalCost: number;
    accessCode: string;
    payments: IProjectPayment[];
    tasks: IProjectTask[];
    phases: IProjectPhase[];
}

export const dummyProjectDetail: IProjectDetail = {
    id: "1",
    name: "Survei Investigasi dan Desain Percetakan Sawah Sumatera Selatan",
    client: "Universitas Padjadjaran",
    pic: "Akbar Anugrah",
    province: "Sumatera Selatan",
    city: "Palembang",
    year: 2025,
    startDate: "2025-01-15",
    endDate: "2025-12-31",
    status: EProjectStatus.PROCESS,
    visibility: EProjectVisibility.PUBLIC,
    totalContractValue: 1_850_000_000,
    totalBudget: 1_600_000_000,
    totalCost: 820_000_000,
    accessCode: "UNPAD-01",
    payments: [
        {
            id: "p1",
            termNo: 1,
            termType: "DOWN_PAYMENT",
            description: "Uang muka 20% setelah kontrak ditandatangani",
            percentage: 20,
            amount: 370_000_000,
            paidAmount: 370_000_000,
            invoiceNo: "INV/2025/01/001",
            invoiceDate: "2025-01-20",
            dueDate: "2025-02-05",
            paidDate: "2025-02-03",
            status: "PAID",
            notes: "Transfer dari rekening BNI klien",
        },
        {
            id: "p2",
            termNo: 2,
            termType: "PROGRESS",
            description: "Termin II — Penyelesaian survei lapangan & laporan pendahuluan",
            percentage: 30,
            amount: 555_000_000,
            paidAmount: 555_000_000,
            invoiceNo: "INV/2025/04/014",
            invoiceDate: "2025-04-08",
            dueDate: "2025-04-30",
            paidDate: "2025-04-28",
            status: "PAID",
        },
        {
            id: "p3",
            termNo: 3,
            termType: "PROGRESS",
            description: "Termin III — Penyerahan draft desain & laporan antara",
            percentage: 25,
            amount: 462_500_000,
            paidAmount: 200_000_000,
            invoiceNo: "INV/2025/07/032",
            invoiceDate: "2025-07-15",
            dueDate: "2025-08-05",
            paidDate: "2025-08-10",
            status: "PARTIAL",
            notes: "Pembayaran bertahap; sisa menunggu verifikasi BAST",
        },
        {
            id: "p4",
            termNo: 4,
            termType: "PROGRESS",
            description: "Termin IV — Laporan akhir & dokumen serah terima",
            percentage: 20,
            amount: 370_000_000,
            paidAmount: 0,
            invoiceNo: "INV/2025/10/058",
            invoiceDate: "2025-10-12",
            dueDate: "2025-11-01",
            paidDate: null,
            status: "UNPAID",
        },
        {
            id: "p5",
            termNo: 5,
            termType: "RETENTION",
            description: "Retensi 5% — Ditahan hingga masa pemeliharaan selesai",
            percentage: 5,
            amount: 92_500_000,
            paidAmount: 0,
            invoiceNo: "—",
            invoiceDate: "2025-12-31",
            dueDate: "2026-03-31",
            paidDate: null,
            status: "UNPAID",
        },
    ],
    tasks: [
        {
            id: "t1",
            code: "T-001",
            name: "Kick-off meeting & penyusunan rencana mobilisasi",
            kind: "TASK",
            assignee: "Akbar Anugrah",
            phase: "Persiapan",
            progress: 100,
            status: ETaskStatus.DONE,
            submissionStatus: ESubmissionStatus.APPROVED,
            startDate: "2025-01-16",
            dueDate: "2025-01-25",
            submittedAt: "2025-01-24",
        },
        {
            id: "t2",
            code: "T-002",
            name: "Pengumpulan data sekunder & peta dasar",
            kind: "TASK",
            assignee: "Syuhada Asdini",
            phase: "Persiapan",
            progress: 100,
            status: ETaskStatus.DONE,
            submissionStatus: ESubmissionStatus.APPROVED,
            startDate: "2025-01-20",
            dueDate: "2025-02-10",
            submittedAt: "2025-02-09",
        },
        {
            id: "s1",
            code: "S-001",
            name: "Survei topografi blok A — 250 ha",
            kind: "SURVEI",
            assignee: "Iska Gushilman",
            phase: "Survei Lapangan",
            progress: 100,
            status: ETaskStatus.DONE,
            submissionStatus: ESubmissionStatus.APPROVED,
            startDate: "2025-02-15",
            dueDate: "2025-03-20",
            submittedAt: "2025-03-19",
        },
        {
            id: "s2",
            code: "S-002",
            name: "Survei hidrologi & saluran irigasi",
            kind: "SURVEI",
            assignee: "Iska Gushilman",
            phase: "Survei Lapangan",
            progress: 80,
            status: ETaskStatus.PROCESS,
            submissionStatus: ESubmissionStatus.PENDING,
            startDate: "2025-03-01",
            dueDate: "2025-04-15",
            submittedAt: "2025-04-12",
        },
        {
            id: "j1",
            code: "J-001",
            name: "Journey kunjungan kelompok tani — Desa Sukamaju",
            kind: "JOURNEY",
            assignee: "Akbar Anugrah",
            phase: "Survei Lapangan",
            progress: 100,
            status: ETaskStatus.DONE,
            submissionStatus: ESubmissionStatus.APPROVED,
            startDate: "2025-03-10",
            dueDate: "2025-03-12",
            submittedAt: "2025-03-12",
        },
        {
            id: "j2",
            code: "J-002",
            name: "Journey verifikasi batas lahan — Desa Bumi Agung",
            kind: "JOURNEY",
            assignee: "Syuhada Asdini",
            phase: "Survei Lapangan",
            progress: 60,
            status: ETaskStatus.PROCESS,
            submissionStatus: ESubmissionStatus.REJECTED,
            startDate: "2025-04-01",
            dueDate: "2025-04-20",
            submittedAt: "2025-04-18",
        },
        {
            id: "t3",
            code: "T-003",
            name: "Penyusunan laporan pendahuluan",
            kind: "TASK",
            assignee: "Akbar Anugrah",
            phase: "Pelaporan",
            progress: 100,
            status: ETaskStatus.DONE,
            submissionStatus: ESubmissionStatus.APPROVED,
            startDate: "2025-03-25",
            dueDate: "2025-04-15",
            submittedAt: "2025-04-14",
        },
        {
            id: "t4",
            code: "T-004",
            name: "Desain skematik jaringan irigasi",
            kind: "TASK",
            assignee: "Syuhada Asdini",
            phase: "Desain",
            progress: 45,
            status: ETaskStatus.PROCESS,
            submissionStatus: null,
            startDate: "2025-05-01",
            dueDate: "2025-07-15",
            submittedAt: null,
        },
        {
            id: "s3",
            code: "S-003",
            name: "Survei sosial-ekonomi blok B",
            kind: "SURVEI",
            assignee: "Iska Gushilman",
            phase: "Survei Lapangan",
            progress: 0,
            status: ETaskStatus.HOLD,
            submissionStatus: null,
            startDate: "2025-05-15",
            dueDate: "2025-06-30",
            submittedAt: null,
        },
        {
            id: "t5",
            code: "T-005",
            name: "Penyusunan laporan akhir & rekomendasi",
            kind: "TASK",
            assignee: "Akbar Anugrah",
            phase: "Pelaporan",
            progress: 0,
            status: ETaskStatus.FOLLOW_UP,
            submissionStatus: null,
            startDate: "2025-09-01",
            dueDate: "2025-11-30",
            submittedAt: null,
        },
    ],
    phases: [
        {
            id: "ph1",
            name: "Persiapan",
            orderIndex: 1,
            startDate: "2025-01-15",
            endDate: "2025-02-15",
            progress: 100,
            activities: [
                {
                    id: "a1",
                    name: "Kick-off meeting",
                    startDate: "2025-01-16",
                    endDate: "2025-01-25",
                    progress: 100,
                    assignee: "Akbar Anugrah",
                    status: ETaskStatus.DONE,
                },
                {
                    id: "a2",
                    name: "Pengumpulan data sekunder",
                    startDate: "2025-01-20",
                    endDate: "2025-02-10",
                    progress: 100,
                    assignee: "Syuhada Asdini",
                    status: ETaskStatus.DONE,
                },
            ],
        },
        {
            id: "ph2",
            name: "Survei Lapangan",
            orderIndex: 2,
            startDate: "2025-02-15",
            endDate: "2025-05-15",
            progress: 75,
            activities: [
                {
                    id: "a3",
                    name: "Survei topografi blok A",
                    startDate: "2025-02-15",
                    endDate: "2025-03-20",
                    progress: 100,
                    assignee: "Iska Gushilman",
                    status: ETaskStatus.DONE,
                },
                {
                    id: "a4",
                    name: "Survei hidrologi",
                    startDate: "2025-03-01",
                    endDate: "2025-04-15",
                    progress: 80,
                    assignee: "Iska Gushilman",
                    status: ETaskStatus.PROCESS,
                },
                {
                    id: "a5",
                    name: "Journey desa & verifikasi lahan",
                    startDate: "2025-03-10",
                    endDate: "2025-04-20",
                    progress: 80,
                    assignee: "Akbar Anugrah",
                    status: ETaskStatus.PROCESS,
                },
                {
                    id: "a6",
                    name: "Survei sosial-ekonomi blok B",
                    startDate: "2025-05-15",
                    endDate: "2025-06-30",
                    progress: 0,
                    assignee: "Iska Gushilman",
                    status: ETaskStatus.HOLD,
                },
            ],
        },
        {
            id: "ph3",
            name: "Desain",
            orderIndex: 3,
            startDate: "2025-05-01",
            endDate: "2025-08-31",
            progress: 30,
            activities: [
                {
                    id: "a7",
                    name: "Desain skematik jaringan irigasi",
                    startDate: "2025-05-01",
                    endDate: "2025-07-15",
                    progress: 45,
                    assignee: "Syuhada Asdini",
                    status: ETaskStatus.PROCESS,
                },
                {
                    id: "a8",
                    name: "Desain detail saluran & bangunan air",
                    startDate: "2025-07-01",
                    endDate: "2025-08-31",
                    progress: 0,
                    assignee: "Syuhada Asdini",
                    status: ETaskStatus.FOLLOW_UP,
                },
            ],
        },
        {
            id: "ph4",
            name: "Pelaporan",
            orderIndex: 4,
            startDate: "2025-03-25",
            endDate: "2025-11-30",
            progress: 50,
            activities: [
                {
                    id: "a9",
                    name: "Laporan pendahuluan",
                    startDate: "2025-03-25",
                    endDate: "2025-04-15",
                    progress: 100,
                    assignee: "Akbar Anugrah",
                    status: ETaskStatus.DONE,
                },
                {
                    id: "a10",
                    name: "Laporan antara",
                    startDate: "2025-06-01",
                    endDate: "2025-07-31",
                    progress: 50,
                    assignee: "Akbar Anugrah",
                    status: ETaskStatus.PROCESS,
                },
                {
                    id: "a11",
                    name: "Laporan akhir & rekomendasi",
                    startDate: "2025-09-01",
                    endDate: "2025-11-30",
                    progress: 0,
                    assignee: "Akbar Anugrah",
                    status: ETaskStatus.FOLLOW_UP,
                },
            ],
        },
        {
            id: "ph5",
            name: "Serah Terima",
            orderIndex: 5,
            startDate: "2025-12-01",
            endDate: "2025-12-31",
            progress: 0,
            activities: [
                {
                    id: "a12",
                    name: "Penyerahan dokumen final & BAST",
                    startDate: "2025-12-01",
                    endDate: "2025-12-31",
                    progress: 0,
                    assignee: "Akbar Anugrah",
                    status: ETaskStatus.FOLLOW_UP,
                },
            ],
        },
    ],
};
