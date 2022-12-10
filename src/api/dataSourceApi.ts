import axios from "axios";
export const dataSourceApi = {
    dataSourceList(params:{ page:number, size:number }){
        return axios.get(
            `/datasources`,
            { params: { page: params.page, size: params.size } }
        );
    }
}