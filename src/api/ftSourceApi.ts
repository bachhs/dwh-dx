import axios from 'axios';
export const ftpSourceApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        let requestUrl = `/ftpsource`;
        if (
            params.organization_id &&
            params.organization_id !== null &&
            params.organization_id !== ''
        ) {
            requestUrl = `/organization/${params.organization_id}/ftpsource`;
        }
        return axios.get(requestUrl, { params: requestParams });
    },
    listByOrganization(organizationId: number) {
        return axios.get(`/organization/${organizationId}/ftpsource/all`);
    },
    getItem(itemId: number) {
        return axios.get(`/ftpsource/${itemId}`);
    },
    addItem(organization_id: number, itemData: any) {
        return axios.post(
            `/organization/${organization_id}/ftpsource`,
            itemData
        );
    },
    updateItem(itemId: number, itemData: any) {
        return axios.put(`/ftpsource/${itemId}`, itemData);
    },
    deleteItem(itemId: number) {
        return axios.delete(`/ftpsource/${itemId}`);
    },
};
