import axios from "axios";
export const organizationApi = {
    organizationList(){
        return axios.get(
            `/organization`,
            { params: { page: 1, limit: 100 } }
        );
    }
}