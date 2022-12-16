import axios from "axios";
export const dataSourcePipelineApi = {
    dtsPipelineList(params:{ page:number, size:number }){
        let requestParams:any = { 
            page: params.page,
            size: params.size,
        }; 
        return axios.get(
            `/pipelines`,
            { params: requestParams }
        );
    },
    dtsPipelineByDtsId(dtsId:number){
        return axios.get(
            `/datasources/${dtsId}/pipelines`
        );
    },
    getDtsPipeline(pipelineId:number){
        return axios.get(
            `/pipeline/${pipelineId}`
        );
    },
    addDataSource(dtsId:number, data:any){
        return axios.post(
            `/datasources/${dtsId}/pipeline`, 
            data
        );
    },
    updateDataSource(pipelineId:number, data:any){
        return axios.put(
            `/pipeline/${pipelineId}`, 
            data
        );
    },
    deleteDataSource(dtsId:number){
        return axios.delete(
            `/pipeline/${dtsId}`
        );
    },
}