import type { MetaService, PagingPayload } from '@/types';

export interface SourceConfig {
    config: {
        type: string;
    };
}

export interface PipelineStatus {
    runId: string;
    state: string;
    startDate: number;
    endDate: number;
    timestamp: number;
}

export interface MetaPipeline {
    id: string;
    name: string;
    displayName: string;
    fullyQualifiedName: string;
    enabled: boolean;
    deleted: boolean;
    pipelineType: string;
    service: MetaService;
    sourceConfig: SourceConfig;
}

export interface ListPipelineResponse {
    data: Pipeline[];
    paging: PagingPayload;
}
