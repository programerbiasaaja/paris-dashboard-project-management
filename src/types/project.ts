import type { EProjectStatus, EProjectVisibility } from "./enums";
import type { IClient } from "./client";
import type { IUser } from "./user";

// =====================================
// PROJECT
// =====================================

export interface IProjectFile {
    name: string;
    url: string;
}

export interface IProject {
    id: string;
    clientId: string;
    picId: string;
    name: string;
    totalContractValue: number;
    totalBudget: number;
    totalCost: number;
    startDate: string;
    endDate: string;
    status: EProjectStatus;
    visibility: EProjectVisibility;
    access_code: string;
    files: IProjectFile[];

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface IProjectWithRelations extends IProject {
    client: IClient;
    pic: IUser;
}

// =====================================
// PHASE (WBS)
// =====================================

export interface IPhase {
    id: string;
    projectId: string;
    name: string;
    orderIndex: number;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}
