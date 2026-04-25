import type { EQuestionType, ESubmissionStatus } from "./enums";
import type { IUser } from "./user";

// =====================================
// SURVEY QUESTION
// =====================================

export interface ISurveyQuestion {
    id: string;
    taskId: string;
    label: string;
    description: string;
    inputType: EQuestionType;
    isRequired: boolean;
    orderIndex: number;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

// =====================================
// SURVEY SUBMISSION
// =====================================

export interface ISurveySubmission {
    id: string;
    taskId: string;
    reporterId: string;
    status: ESubmissionStatus;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ISurveySubmissionWithReporter extends ISurveySubmission {
    reporter: IUser;
}

// =====================================
// SURVEY ANSWER
// =====================================

export interface ISurveyAnswer {
    id: string;
    submissionId: string;
    questionId: string;
    answerValue: string;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ISurveyAnswerWithQuestion extends ISurveyAnswer {
    question: ISurveyQuestion;
}
