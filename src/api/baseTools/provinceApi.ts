import axios from 'axios';
const parentModuleId = 'country';
const moduleId = 'city';
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
    addItem(itemData: any) {
        let countryVNDefault = 1;
        return axios.post(
            `/param/${parentModuleId}/${countryVNDefault}/${moduleId}`,
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
