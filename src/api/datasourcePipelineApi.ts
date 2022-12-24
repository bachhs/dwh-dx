import type { ListPipelineResponse } from '@/scripts/datasourcePipeline/type';
import axios from 'axios';
export const datasourcePipelineApi = {
    dtsPipelineList(params: { page: number; size: number }) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        return axios.get(`/pipelines`, { params: requestParams });
    },
    dtsPipelineByDtsId(dtsId: number) {
        return axios.get(`/datasources/${dtsId}/pipelines`);
    },
    getDtsPipeline(pipelineId: number) {
        return axios.get(`/pipeline/${pipelineId}`);
    },
    addDtsPipeline(dtsId: number, data: any) {
        return axios.post(`/datasources/${dtsId}/pipeline`, data);
    },
    updateDtsPipeline(pipelineId: number, data: any) {
        return axios.put(`/pipeline/${pipelineId}`, data);
    },
    deleteDtsPipeline(dtsId: number) {
        return axios.delete(`/pipeline/${dtsId}`);
    },
    getMetaPipelines(datasourceName?: string) {
        return axios.get<ListPipelineResponse>(
            `meta/ingestion?datasourceName=${datasourceName || ''}`
        );
    },
};
