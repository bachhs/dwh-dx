import axios from 'axios';
const parentModuleId = 'city';
const moduleId = 'district';
export const provinceApi = {
    getItems(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        }; 
        return axios.get(`/param/${moduleId}`, { params: requestParams });
    }, 
    getItem(itemId: number) {
        return axios.get(`/param/${moduleId}/${itemId}`);
    },
    addItem(parentId:number, itemData: any) {
        return axios.post(
            `/param/${parentModuleId}/${parentId}/${moduleId}`,
            itemData
        );
    },
    updateItem(itemId: number, itemData: any) {
        return axios.put(`/param/${moduleId}/${itemId}`, itemData);
    },
    deleteItem(itemId: number) {
        return axios.delete(`/param/${moduleId}/${itemId}`);
    },
};
