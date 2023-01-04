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

const updateDataSourceDescription = (dtsName:string, descriptionHtml:string) => {
    return new Promise((resolve, reject) =>{
        dataSourceApi.updateDataSourceDescription(dtsName, descriptionHtml)
        .then((response:any) => {
            return resolve(response.data);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
};


const updateDatabseDescription = (metaId:string, descriptionHtml:string) => {
    return new Promise((resolve, reject) =>{
        dataSourceApi.updateDatabseDescription(metaId, descriptionHtml)
        .then((response:any) => {
            return resolve(response.data);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
};

const updateSchemaDescription = (metaId:string, descriptionHtml:string) => {
    return new Promise((resolve, reject) =>{
        dataSourceApi.updateSchemaDescription(metaId, descriptionHtml)
        .then((response:any) => {
            return resolve(response.data);
        })
        .catch(error => {
            console.log(error);
            reject(error);
        });
    });
};

export { 
    getDataSourceMetaData, updateDataSourceDescription, updateSchemaDescription,
    updateDatabseDescription
};