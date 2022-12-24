export interface PagingPayload {
    after: string;
    total: number;
}

export interface MetaService {
    id: string;
    name: string;
    type: string;
    fullyQualifiedName: string;
    description: string;
    deleted: boolean;
}
