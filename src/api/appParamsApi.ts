import axios from "axios";
export const appParamsApi = {
    getAllParams(){
        return axios.get(
            `http://14.225.11.182:8081/api/v1/params`,
            { params: { page: 1, size: 9999999 } }
        );
    }
}