import axios from 'axios';

export const ftpSourcePipelineApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        let requestUrl = `/ftpsource/pipeline`;
        if (
            params.ftpsource_id &&
            params.ftpsource_id !== null &&
            params.ftpsource_id !== ''
        ) {
            requestUrl = `/ftpsource/${params.ftpsource_id}/pipeline`;
        }
        return axios.get(requestUrl, { params: requestParams });
    },
    getItem(itemId: number) {
        return axios.get(`/ftpsource/${itemId}`);
    },
    addItem(ftpsource_id: number, itemData: any) {
        return axios.post(
            `/ftpsource/${ftpsource_id}/pipeline`,
            itemData
        );
    },
    updateItem(itemId: number, itemData: any) {
        return axios.put(`/ftpsource/pipeline/${itemId}`, itemData);
    },
    deleteItem(itemId: number) {
        return axios.delete(`/ftpsource/pipeline/${itemId}`);
    },
};
