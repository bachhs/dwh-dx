import axios from "axios";
export const fileUploadApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            ...params,
        };
        return axios.get(`/file`, { params: requestParams });
    },
    uploadFileData(organization_id:number, formData: FormData, controller: AbortController, onUploadCallback:((_: any) => any)) {
        const configs = {
            signal: controller.signal,
            headers: { 'Content-Type': 'multipart/form-data' },
            // Old version
            progress (evtParam:any) {
                onUploadCallback(evtParam);
            },
            onUploadProgress: (evtParam: any) => {
                onUploadCallback(evtParam);
            }
        };
        return axios.post(
            `/organization/${organization_id}/file`, formData, configs
        );
    },
    getFileContent(organization_id:number, filename:string){
        return axios.get(`/organization/${organization_id}/file/${filename}`);
    },
    deleteItem(itemId:any) {
        return axios.delete(`/organization/3/file${itemId}`);
    }
} 