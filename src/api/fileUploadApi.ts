import axios from "axios";
export const fileUploadApi = {
    dataItemList(params: any) {
        const requestParams: any = {
            ...params,
        };
        return axios.get(`/file`, { params: requestParams });
    },
    uploadFileData(paramsData: { organization_id:number, embedded_id: string }, 
        formData: FormData, controller: AbortController, 
        onUploadCallback:((_: any) => any)) {
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

        let urlRequest = `/organization/${paramsData.organization_id}/file`;
        if(paramsData.embedded_id){
            urlRequest = urlRequest + `?embedded_id=${paramsData.embedded_id}`
        }
        return axios.post(
            urlRequest, formData, configs
        );
    },
    getFileContent(organization_id:number, filename:string){
        return axios.get(`/organization/${organization_id}/file/${filename}`);
    },
    deleteItem(itemId:any) {
        return axios.delete(`/organization/3/file${itemId}`);
    }
} 