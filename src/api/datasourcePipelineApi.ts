import axios from 'axios';

export const dbSourcePipelineApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        let requestUrl = `/dbsource/pipeline`;
        if (
            params.dbsource_id &&
            params.dbsource_id !== null &&
            params.dbsource_id !== ''
        ) {
            requestUrl = `/dbsource/${params.dbsource_id}/pipeline`;
        }
        return axios.get(requestUrl, { params: requestParams });
    },
    getItem(itemId: number) {
        return axios.get(`/dbsource/${itemId}`);
    },
    addItem(dbsource_id: number, itemData: any) {
        return axios.post(
            `/dbsource/${dbsource_id}/pipeline`,
            itemData
        );
    },
    updateItem(itemId: number, itemData: any) {
        return axios.put(`/dbsource/pipeline/${itemId}`, itemData);
    },
    deleteItem(itemId: number) {
        return axios.delete(`/dbsource/pipeline/${itemId}`);
    },
};
