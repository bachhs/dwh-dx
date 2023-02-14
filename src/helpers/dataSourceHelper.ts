import { dataSourceApi } from '@/api/dataSourceApi'; 
import { ElMessage } from 'element-plus';
import { ingestionPipelineApi } from '@/api/ingestionPipelineApi';

const testConnection = (requestData:any) => {
    return new Promise((resolve, reject) => {        
        ingestionPipelineApi.testConnection(requestData)
            .then((response: any) => {
                switch (response.status) {
                    case 400:                                        
                        return resolve({
                            isSucceed: false,
                            msg: "Tham số nhập vào không đúng định dạng"
                        });
                        break;
                    case 200:                                        
                        return resolve({
                            isSucceed: true,
                            msg: "kết nối thành công đến Database"
                        });
                        break;
                    default:                                
                        return resolve({
                            isSucceed: false,
                            msg: "Tham số nhập vào không đúng định dạng"
                        });
                        break; 
                }
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

const getDataSourceMetaData = (dtsName: string) => {
    return new Promise((resolve, reject) => {
        dataSourceApi
            .getDataSourceMetaData(dtsName)
            .then((response: any) => {
                return resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const updateDataSourceDescription = (
    dtsName: string,
    descriptionHtml: string
) => {
    return new Promise((resolve, reject) => {
        dataSourceApi
            .updateDataSourceDescription(dtsName, descriptionHtml)
            .then((response: any) => {
                return resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const updateDatabseDescription = (metaId: string, descriptionHtml: string) => {
    return new Promise((resolve, reject) => {
        dataSourceApi
            .updateDatabseDescription(metaId, descriptionHtml)
            .then((response: any) => {
                return resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const updateSchemaDescription = (metaId: string, descriptionHtml: string) => {
    return new Promise((resolve, reject) => {
        dataSourceApi
            .updateSchemaDescription(metaId, descriptionHtml)
            .then((response: any) => {
                return resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const updateTableDescription = (metaId: string, descriptionHtml: string) => {
    return new Promise((resolve, reject) => {
        dataSourceApi
            .updateTableDescription(metaId, descriptionHtml)
            .then((response: any) => {
                return resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

const updateColumnDescription = (
    tableMetaId: string,
    columnId: number,
    descriptionHtml: string
) => {
    return new Promise((resolve, reject) => {
        dataSourceApi
            .updateColumnDescription(tableMetaId, columnId, descriptionHtml)
            .then((response: any) => {
                return resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export {
    testConnection,
    getDataSourceMetaData,
    updateDataSourceDescription,
    updateSchemaDescription,
    updateDatabseDescription,
    updateTableDescription,
    updateColumnDescription,
};
