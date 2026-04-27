import type { EQuestionType, ESubmissionStatus } from "./enums";
import type { IUser } from "./user";

// =====================================
// Survei QUESTION
// =====================================

export interface ISurveiQuestion {
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
// Survei SUBMISSION
// =====================================

export interface ISurveiSubmission {
    id: string;
    taskId: string;
    reporterId: string;
    status: ESubmissionStatus;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ISurveiSubmissionWithReporter extends ISurveiSubmission {
    reporter: IUser;
}

// =====================================
// Survei ANSWER
// =====================================

export interface ISurveiAnswer {
    id: string;
    submissionId: string;
    questionId: string;
    answerValue: string;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ISurveiAnswerWithQuestion extends ISurveiAnswer {
    question: ISurveiQuestion;
}
