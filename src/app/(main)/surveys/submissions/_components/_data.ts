import { EQuestionType, ESubmissionStatus, ETaskStatus } from "@/types/enums";

export type TSurveyTaskRow = {
    id: string;
    name: string;
    projectName: string;
    phaseName: string;
    assigneeName: string;
    due_date: string;
    weight: number;
    status: ETaskStatus;
    questionCount: number;
    lastSubmissionStatus?: ESubmissionStatus;
    lastSubmissionAt?: string;
    submissionCount: number;
};

export const dummySurveyTasks: TSurveyTaskRow[] = [
    {
        id: "t1",
        name: "1.1 Pembersihan Lahan Blok A",
        projectName: "Rehabilitasi DAS Borneo Prima",
        phaseName: "A. Persiapan",
        assigneeName: "Akbar Anugrah",
        due_date: "2026-05-15",
        weight: 10,
        status: ETaskStatus.PROCESS,
        questionCount: 8,
        lastSubmissionStatus: ESubmissionStatus.PENDING,
        lastSubmissionAt: "2026-04-28T09:30:00",
        submissionCount: 2,
    },
    {
        id: "t2",
        name: "1.2 Pengukuran Topografi",
        projectName: "Rehabilitasi DAS Borneo Prima",
        phaseName: "A. Persiapan",
        assigneeName: "Syuhada Asdini",
        due_date: "2026-05-10",
        weight: 8,
        status: ETaskStatus.FOLLOW_UP,
        questionCount: 6,
        submissionCount: 0,
    },
    {
        id: "t3",
        name: "2.1 Penanaman Bibit Mangrove",
        projectName: "Rehabilitasi Mangrove Sumsel",
        phaseName: "B. Pelaksanaan",
        assigneeName: "Iska Gushilman",
        due_date: "2026-05-20",
        weight: 15,
        status: ETaskStatus.PROCESS,
        questionCount: 10,
        lastSubmissionStatus: ESubmissionStatus.APPROVED,
        lastSubmissionAt: "2026-04-30T14:10:00",
        submissionCount: 5,
    },
    {
        id: "t4",
        name: "3.1 Monitoring Kualitas Air",
        projectName: "Rehabilitasi DAS Borneo Prima",
        phaseName: "C. Monitoring",
        assigneeName: "Akbar Anugrah",
        due_date: "2026-06-01",
        weight: 5,
        status: ETaskStatus.HOLD,
        questionCount: 4,
        lastSubmissionStatus: ESubmissionStatus.REJECTED,
        lastSubmissionAt: "2026-04-25T08:00:00",
        submissionCount: 1,
    },
    {
        id: "t5",
        name: "4.1 Serah Terima Pekerjaan",
        projectName: "Survei Investigasi Sawah Sumsel",
        phaseName: "D. Penutupan",
        assigneeName: "Syuhada Asdini",
        due_date: "2026-04-15",
        weight: 7,
        status: ETaskStatus.DONE,
        questionCount: 5,
        lastSubmissionStatus: ESubmissionStatus.APPROVED,
        lastSubmissionAt: "2026-04-15T16:00:00",
        submissionCount: 1,
    },
];

export type TSurveyQuestion = {
    id: string;
    label: string;
    description?: string;
    inputType: EQuestionType;
    isRequired: boolean;
    orderIndex: number;
    options?: string[];
};

export const dummyQuestions: Record<string, TSurveyQuestion[]> = {
    t1: [
        { id: "q1", label: "Luas Lahan Dibersihkan", description: "Dalam satuan hektar (Ha)", inputType: EQuestionType.NUMBER, isRequired: true, orderIndex: 1 },
        { id: "q2", label: "Catatan Lapangan", description: "Deskripsikan kondisi lapangan saat pembersihan", inputType: EQuestionType.TEXT, isRequired: true, orderIndex: 2 },
        { id: "q3", label: "Tanggal Pelaksanaan", inputType: EQuestionType.DATE, isRequired: true, orderIndex: 3 },
        { id: "q4", label: "Estimasi Tanggal Selesai", description: "Hanya tanggal mendatang", inputType: EQuestionType.DATE_FORWARD, isRequired: false, orderIndex: 4 },
        { id: "q5", label: "Tanggal Mulai Aktual", description: "Hanya tanggal lampau", inputType: EQuestionType.DATE_BACKWARD, isRequired: true, orderIndex: 5 },
        { id: "q6", label: "Koordinat Titik Pembersihan", description: "Format: latitude, longitude", inputType: EQuestionType.COORDINATE, isRequired: true, orderIndex: 6 },
        { id: "q7", label: "Track GPX", description: "Unggah file rekaman jalur (.gpx)", inputType: EQuestionType.GPX, isRequired: false, orderIndex: 7 },
        { id: "q8", label: "Geotag Foto", description: "Foto dengan koordinat lokasi", inputType: EQuestionType.GEOTAG, isRequired: true, orderIndex: 8 },
        { id: "q9", label: "Foto Dokumentasi", inputType: EQuestionType.PHOTO, isRequired: true, orderIndex: 9 },
        { id: "q10", label: "Lampiran Berita Acara", inputType: EQuestionType.FILE, isRequired: false, orderIndex: 10 },
        { id: "q11", label: "Realisasi Biaya", description: "Total pengeluaran (Rp)", inputType: EQuestionType.COST, isRequired: true, orderIndex: 11 },
        {
            id: "q12",
            label: "Metode Pembersihan",
            inputType: EQuestionType.RADIO_BUTTON,
            isRequired: true,
            orderIndex: 12,
            options: ["Manual", "Mekanis", "Kombinasi"],
        },
        {
            id: "q13",
            label: "Tipe Vegetasi Dominan",
            inputType: EQuestionType.OPTIONS,
            isRequired: true,
            orderIndex: 13,
            options: ["Semak", "Pohon Kecil", "Pohon Besar", "Rerumputan"],
        },
        {
            id: "q14",
            label: "Alat Berat Digunakan",
            inputType: EQuestionType.MULTI_SELECT,
            isRequired: false,
            orderIndex: 14,
            options: ["Excavator", "Bulldozer", "Chainsaw", "Parang"],
        },
        {
            id: "q15",
            label: "Persyaratan Keselamatan",
            inputType: EQuestionType.CHECKBOX,
            isRequired: true,
            orderIndex: 15,
            options: ["Helm Keselamatan", "Sepatu Boot", "Sarung Tangan", "Masker"],
        },
    ],
};

export type TTaskSubmissionSummary = {
    id: string;
    taskId: string;
    reporterName: string;
    status: ESubmissionStatus;
    createdAt: string;
    updatedAt: string;
};

export const dummyTaskSubmissions: Record<string, TTaskSubmissionSummary[]> = {
    t1: [
        {
            id: "s1",
            taskId: "t1",
            reporterName: "Akbar Anugrah",
            status: ESubmissionStatus.PENDING,
            createdAt: "2026-04-28T09:30:00",
            updatedAt: "2026-04-28T09:30:00",
        },
        {
            id: "s0",
            taskId: "t1",
            reporterName: "Akbar Anugrah",
            status: ESubmissionStatus.REJECTED,
            createdAt: "2026-04-20T11:15:00",
            updatedAt: "2026-04-21T08:00:00",
        },
    ],
    t3: [
        {
            id: "s3-5",
            taskId: "t3",
            reporterName: "Iska Gushilman",
            status: ESubmissionStatus.APPROVED,
            createdAt: "2026-04-30T14:10:00",
            updatedAt: "2026-04-30T16:00:00",
        },
        {
            id: "s3-4",
            taskId: "t3",
            reporterName: "Iska Gushilman",
            status: ESubmissionStatus.APPROVED,
            createdAt: "2026-04-26T10:00:00",
            updatedAt: "2026-04-26T13:00:00",
        },
        {
            id: "s3-3",
            taskId: "t3",
            reporterName: "Iska Gushilman",
            status: ESubmissionStatus.APPROVED,
            createdAt: "2026-04-22T08:30:00",
            updatedAt: "2026-04-22T11:00:00",
        },
        {
            id: "s3-2",
            taskId: "t3",
            reporterName: "Iska Gushilman",
            status: ESubmissionStatus.PENDING,
            createdAt: "2026-04-18T09:00:00",
            updatedAt: "2026-04-18T09:00:00",
        },
        {
            id: "s3-1",
            taskId: "t3",
            reporterName: "Iska Gushilman",
            status: ESubmissionStatus.REJECTED,
            createdAt: "2026-04-14T07:45:00",
            updatedAt: "2026-04-15T09:00:00",
        },
    ],
    t4: [
        {
            id: "s4-1",
            taskId: "t4",
            reporterName: "Akbar Anugrah",
            status: ESubmissionStatus.REJECTED,
            createdAt: "2026-04-25T08:00:00",
            updatedAt: "2026-04-26T10:00:00",
        },
    ],
    t5: [
        {
            id: "s5-1",
            taskId: "t5",
            reporterName: "Syuhada Asdini",
            status: ESubmissionStatus.APPROVED,
            createdAt: "2026-04-15T16:00:00",
            updatedAt: "2026-04-15T18:00:00",
        },
    ],
};

export type TSubmissionResult = {
    id: string;
    taskId: string;
    taskName: string;
    projectName: string;
    phaseName: string;
    reporterName: string;
    status: ESubmissionStatus;
    createdAt: string;
    updatedAt: string;
    answers: { questionId: string; answerValue: string }[];
};

export const dummySubmissionResult: TSubmissionResult = {
    id: "s1",
    taskId: "t1",
    taskName: "1.1 Pembersihan Lahan Blok A",
    projectName: "Rehabilitasi DAS Borneo Prima",
    phaseName: "A. Persiapan",
    reporterName: "Akbar Anugrah",
    status: ESubmissionStatus.PENDING,
    createdAt: "2026-04-28T09:30:00",
    updatedAt: "2026-04-28T09:30:00",
    answers: [
        { questionId: "q1", answerValue: "12.5" },
        { questionId: "q2", answerValue: "Kondisi lahan basah pasca hujan, beberapa titik tergenang. Pembersihan difokuskan di area kering terlebih dahulu." },
        { questionId: "q3", answerValue: "2026-04-28" },
        { questionId: "q4", answerValue: "2026-05-12" },
        { questionId: "q5", answerValue: "2026-04-20" },
        { questionId: "q6", answerValue: "-2.548926, 115.234572" },
        { questionId: "q7", answerValue: "track-pembersihan-blok-a.gpx" },
        { questionId: "q8", answerValue: "geotag-pembersihan-01.jpg|-2.548926,115.234572" },
        { questionId: "q9", answerValue: "foto-dokumentasi-01.jpg,foto-dokumentasi-02.jpg,foto-dokumentasi-03.jpg" },
        { questionId: "q10", answerValue: "berita-acara-pembersihan.pdf" },
        { questionId: "q11", answerValue: "8500000" },
        { questionId: "q12", answerValue: "Kombinasi" },
        { questionId: "q13", answerValue: "Semak" },
        { questionId: "q14", answerValue: "Excavator,Chainsaw" },
        { questionId: "q15", answerValue: "Helm Keselamatan,Sepatu Boot,Sarung Tangan" },
    ],
};
