import { dataSourceApi } from '@/api/dataSourceApi';
const getDataSourceMetaData = (dtsName:string) => {
    return new Promise((resolve, reject) =>{
        dataSourceApi.getDataSourceMetaData(dtsName)
        .then((response:any) => {
            return resolve(response.data);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
};

export { getDataSourceMetaData };