import axios from 'axios';
export const apiSourceApi = {
    dataItemList(params: any) {
        const requestParams:any = {
            page: params.page,
            size: params.size,
        };
        let requestUrl = `/apisource`;
        if ( params.organization_id && params.organization_id !== null && params.organization_id !== '' )
        {
            requestUrl = `/organization/${params.organization_id}/apisource`;
        }
        return axios.get(requestUrl, { params: requestParams });
    },
    getItem(itemId:number){
        return axios.get(`/apisource/${itemId}`);
    },
    addItem(organization_id:number, itemData:any){
        return axios.post(`/organization/${organization_id}/apisource`, itemData);
    },
    updateItem(itemId:number, itemData:any){
        return axios.put(`/apisource/${itemId}`, itemData);
    }, 
    deleteItem(itemId:number) {
        return axios.delete(`/apisource/${itemId}`);
    }
}