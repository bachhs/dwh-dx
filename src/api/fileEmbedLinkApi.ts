import axios from 'axios';
export const fileEmbedLinkApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        if ( params.organization_id && params.organization_id !== null && params.organization_id !== '' )
        {
            requestParams.organization_id = params.organization_id;
        }
        return axios.get(`/embedded-links`, { params: requestParams });
    },
    getItem(itemId:number){
        return axios.get(`/embedded-links/${itemId}`);
    },
    addItem(itemData:{ organization_id:number, valid_from:Date, valid_to:Date }){
        return axios.post(`/embedded-links`, itemData);
    },
    updateItem(itemId:number, itemData:{ organization_id:number, valid_from:Date, valid_to:Date }){
        return axios.put(`/embedded-links/${itemId}`, itemData);
    },
    getItemContent(embeddedId:string){
        return axios.get(`/embedded-links/embedded-id/${embeddedId}`);
    },
    deleteItem(itemId:number) {
        return axios.delete(`/embedded-links/${itemId}`);
    }
}