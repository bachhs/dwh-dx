import axios from "axios";
import type { Nullable } from "element-plus/es/components/cascader-panel/src/node";
export const dataSourceApi = {
    dataSourceList(params:any){
        let requestParams:any = { 
            page: params.page,
            size: params.size,
        };
        if(params.organization_id && params.organization_id !== null && params.organization_id !== '') requestParams.organization_id = params.organization_id;
        if(params.dialect && params.dialect !== null && params.dialect !== '') requestParams.dialect = params.dialect;
        if(params.name && params.name !== null && params.name !== '') requestParams.name = params.name;
        return axios.get(
            `/datasources`,
            { params: requestParams }
        );
    },
    getDataSourceDetail(dtsId:number){
        return axios.get(
            `/datasource/${dtsId}`
        );
    },
    updateDataSource(dtsId:number, data:any){
        return axios.put(
            `/datasource/${dtsId}`, 
            data
        );
    },
    addDataSource(organizationId:number, data:any){
        return axios.post(
            `/organization/${organizationId}/datasource`, 
            data
        );
    },
    deleteDataSource(dtsId:number){
        return axios.delete(
            `/datasource/${dtsId}`
        );
    },
}