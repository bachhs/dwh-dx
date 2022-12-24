import type { PagingPayload } from '.';

export interface AddTagRequest {
    name: string;
    description: string;
}

export interface AddTagCategoryRequest extends AddTagRequest {
    categoryType: 'Descriptive' | 'Classification';
}

export interface TagCategory extends AddTagCategoryRequest {
    id: string;
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
