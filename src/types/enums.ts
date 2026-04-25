import { createSelectFromType } from "@/lib/utils";

// =====================================
// ENUMS
// =====================================

export enum EUserRole {
    SUPER_ADMIN = "super_admin",
    PROJECT_MANAGER = "project_manager",
    SURVEYOR = "surveyor",
    FINANCE = "finance",
}

export const UserRoleLabels: Record<EUserRole, string> = {
    [EUserRole.SUPER_ADMIN]: "Super Admin",
    [EUserRole.PROJECT_MANAGER]: "Project Manager",
    [EUserRole.SURVEYOR]: "Surveyor",
    [EUserRole.FINANCE]: "Finance",
};

export const UserRoleOptions = createSelectFromType(UserRoleLabels);

// =====================================

export enum ETaskStatus {
    FOLLOW_UP = "FOLLOW_UP",
    PROCESS = "PROCESS",
    HOLD = "HOLD",
    DONE = "DONE",
}

export const TaskStatusLabels: Record<ETaskStatus, string> = {
    [ETaskStatus.FOLLOW_UP]: "Tindak Lanjut",
    [ETaskStatus.PROCESS]: "Proses",
    [ETaskStatus.HOLD]: "Ditunda",
    [ETaskStatus.DONE]: "Selesai",
};

export const TaskStatusOptions = createSelectFromType(TaskStatusLabels);

// =====================================

export enum EProjectVisibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
}

export const ProjectVisibilityLabels: Record<EProjectVisibility, string> = {
    [EProjectVisibility.PUBLIC]: "Publik",
    [EProjectVisibility.PRIVATE]: "Privat",
};

export const ProjectVisibilityOptions = createSelectFromType(ProjectVisibilityLabels);

// =====================================

export enum EProjectStatus {
    PROCESS = "PROCESS",
    HOLD = "HOLD",
    DONE = "DONE",
}

export const ProjectStatusLabels: Record<EProjectStatus, string> = {
    [EProjectStatus.PROCESS]: "Proses",
    [EProjectStatus.HOLD]: "Ditunda",
    [EProjectStatus.DONE]: "Selesai",
};

export const ProjectStatusOptions = createSelectFromType(ProjectStatusLabels);

// =====================================

export enum EQuestionType {
    NUMBER = "NUMBER",
    TEXT = "TEXT",
    DATE = "DATE",
    DATE_FORWARD = "DATE_FORWARD",
    DATE_BACKWARD = "DATE_BACKWARD",
    COORDINATE = "COORDINATE",
    GPX = "GPX",
    GEOTAG = "GEOTAG",
    PHOTO = "PHOTO",
    FILE = "FILE",
    COST = "COST",
    RADIO_BUTTON = "RADIO_BUTTON",
    OPTIONS = "OPTIONS",
    MULTI_SELECT = "MULTI_SELECT",
    CHECKBOX = "CHECKBOX",
}

export const QuestionTypeLabels: Record<EQuestionType, string> = {
    [EQuestionType.NUMBER]: "Angka",
    [EQuestionType.TEXT]: "Teks",
    [EQuestionType.DATE]: "Tanggal",
    [EQuestionType.DATE_FORWARD]: "Tanggal Maju",
    [EQuestionType.DATE_BACKWARD]: "Tanggal Mundur",
    [EQuestionType.COORDINATE]: "Koordinat",
    [EQuestionType.GPX]: "GPX",
    [EQuestionType.GEOTAG]: "Geotag",
    [EQuestionType.PHOTO]: "Foto",
    [EQuestionType.FILE]: "File",
    [EQuestionType.COST]: "Biaya",
    [EQuestionType.RADIO_BUTTON]: "Radio Button",
    [EQuestionType.OPTIONS]: "Pilihan",
    [EQuestionType.MULTI_SELECT]: "Multi Pilihan",
    [EQuestionType.CHECKBOX]: "Checkbox",
};

export const QuestionTypeOptions = createSelectFromType(QuestionTypeLabels);

// =====================================

export enum ESubmissionStatus {
    APPROVED = "APPROVED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
}

export const SubmissionStatusLabels: Record<ESubmissionStatus, string> = {
    [ESubmissionStatus.APPROVED]: "Disetujui",
    [ESubmissionStatus.PENDING]: "Menunggu",
    [ESubmissionStatus.REJECTED]: "Ditolak",
};

export const SubmissionStatusOptions = createSelectFromType(SubmissionStatusLabels);
