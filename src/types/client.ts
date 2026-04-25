// =====================================
// CLIENT (MASTER DATA)
// =====================================

export interface IClient {
    id: string;
    name: string;
    phone: number;
    address: string;

    createdAt: string;
    updatedAt: string;
    deleted: boolean;
}

export interface IClientDetail extends IClient {
    pic_name: string;
    pic_phone: number;
}
