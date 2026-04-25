import type { EQuestionType } from "./enums";

// =====================================
// SURVEY TEMPLATE (BANK DATA)
// =====================================

export interface ISurveyTemplate {
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

export interface ISurveyTemplateWithQuestions extends ISurveyTemplate {
    questions: ITemplateQuestion[];
}
