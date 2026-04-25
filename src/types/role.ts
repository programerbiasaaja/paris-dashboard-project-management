// =====================================
// ROLE (MASTER DATA)
// =====================================

export interface IRoleModule {
    name: string;
    create: number;
    read: number;
    update: number;
    delete: number;
}

export interface IRole {
    id: string;
    name: string;
    modules: IRoleModule[];

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}
