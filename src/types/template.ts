import type { EQuestionType } from "./enums";

// =====================================
// Survei TEMPLATE (BANK DATA)
// =====================================

export interface ISurveiTemplate {
    id: string;
    name: string;
    category: string;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

// =====================================
// TEMPLATE QUESTION
// =====================================

export interface ITemplateQuestion {
    id: string;
    templateId: string;
    label: string;
    inputType: EQuestionType;
    isRequired: boolean;
    orderIndex: number;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ISurveiTemplateWithQuestions extends ISurveiTemplate {
    questions: ITemplateQuestion[];
}
