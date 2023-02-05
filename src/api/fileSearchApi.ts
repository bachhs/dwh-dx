import axios from 'axios';
export const fileSearchApi = {
    searchFileData(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        if(params.query) requestParams.query = params.query;
        if(params.organization_name) requestParams.organization_name = params.organization_name;
        if(params.embedded_id) requestParams.embedded_id = params.embedded_id;
        console.log(requestParams);
        return axios.get(`/file/search`, { params: requestParams });
    }
}