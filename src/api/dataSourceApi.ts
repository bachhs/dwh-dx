import axios from "axios";
export const dataSourceApi = {
    dataSourceList(){
        return axios.get(
            `/datasources`,
            { params: { page: 1, limit: 30 } }
        );
    }
}