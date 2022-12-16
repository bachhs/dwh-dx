import axios from "axios";
export const organizationApi = {
    organizationList(){
        return axios.get(
            `/organization`,
            { params: { page: 1, limit: 100 } }
        );
    },
    getOrganization(organizationId:number){
        return axios.get(
            `/organization/${organizationId}`
        );
    },
    addOrganization(data:any){
        return axios.post(
            `/organization`, 
            data
        );
    },
    updateOrganization(organizationId:number, data:any){
        return axios.put(
            `/organization/${organizationId}`, 
            data
        );
    },
    deleteOrganization(organizationId:number){
        return axios.delete(
            `/organization/${organizationId}`
        );
    },
}