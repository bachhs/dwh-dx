import axios from "axios";
export const appParamsApi = {
    getAllParams(){
        return axios.get(
            `/params`,
            { params: { page: 1, size: 9999999 } }
        );
    }
}