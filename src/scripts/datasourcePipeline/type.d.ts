import type { PagingPayload } from '@/types';

export interface MetaPipeline {
    id: string;
    name: string;
    displayName: string;
    fullyQualifiedName: string;
    enabled: boolean;
    deleted: boolean;
    pipelineType: string;
}

export interface ListPipelineResponse {
    data: Pipeline[];
    paging: PagingPayload;
}
