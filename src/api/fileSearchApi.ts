import axios from 'axios';
export const fileSearchApi = {
    searchFileData(params: any) {
        const requestParams: any = {
            query: params.query,
            organization_name: params.organization_name,
            embedded_id: params.embedded_id,
            page: params.page,
            size: params.size,
        };
        console.log(requestParams);
        return axios.get(`/file/search`, { params: requestParams });
    }
}