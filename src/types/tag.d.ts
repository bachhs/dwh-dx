import type { PagingPayload } from '.';

export interface TagCategory {
    id: string;
    name: string;
    description: string;
    categoryType: string;
    usageCount: number;
    deleted: boolean;
    children: Tag[];
}

export interface Tag {
    id: string;
    name: string;
    fullyQualifiedName: string;
    description: string;
    categoryType: string;
    usageCount: number;
    deprecated: boolean;
    deleted: boolean;
}

export interface ListTagResponse {
    data: TagCategory[];
    paging: PagingPayload;
}
