import type { ETaskStatus } from "./enums";
import type { IUser } from "./user";
import type { IProjectFile } from "./project";

// =====================================
// TASK / ACTIVITY
// =====================================

export interface ITask {
    id: string;
    phaseId: string;
    assigneeId: string;
    name: string;
    startMonth: number;
    endMonth: number;
    due_date: string;
    weight: number;
    budget: number;
    cost: number;
    status: ETaskStatus;
    orderIndex: number;
    files: IProjectFile[];

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface ITaskWithAssignee extends ITask {
    assignee: IUser;
}
