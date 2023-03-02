import axios from 'axios';

export const apiSourcePipelineApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        let requestUrl = `/apisource/pipeline`;
        if (
            params.apisource_id &&
            params.apisource_id !== null &&
            params.apisource_id !== ''
        ) {
            requestUrl = `/apisource/${params.apisource_id}/pipeline`;
        }
        return axios.get(requestUrl, { params: requestParams });
    },
    getItem(itemId: number) {
        return axios.get(`/apisource/${itemId}`);
    },
    addItem(apisource_id: number, itemData: any) {
        return axios.post(
            `/apisource/${apisource_id}/pipeline`,
            itemData
        );
    },
    updateItem(itemId: number, itemData: any) {
        return axios.put(`/apisource/pipeline/${itemId}`, itemData);
    },
    deleteItem(itemId: number) {
        return axios.delete(`/apisource/pipeline/${itemId}`);
    },
};
