import type DatasourceInfo from '@/scripts/dataSource/type';
import axios from 'axios';

export const dataSourceApi = {
    dataSourceList(params: any) {
        const requestParams: any = {
            page: params.page,
            size: params.size,
        };
        if (
            params.organization_id &&
            params.organization_id !== null &&
            params.organization_id !== ''
        )
            requestParams.organization_id = params.organization_id;
        if (params.dialect && params.dialect !== null && params.dialect !== '')
            requestParams.dialect = params.dialect;
        if (params.name && params.name !== null && params.name !== '')
            requestParams.name = params.name;
        return axios.get(`/datasources`, { params: requestParams });
    },
    getDataSourceDetail(dtsId: number) {
        return axios.get(`/datasource/${dtsId}`);
    },
    updateDataSource(dtsId: number, datasourceInfo: DatasourceInfo) {
        return axios.put(`/datasource/${dtsId}`, datasourceInfo);
    },
    addDatasource(organizationId: number, datasourceInfo: DatasourceInfo) {
        return axios.post(
            `/organization/${organizationId}/datasource`,
            datasourceInfo
        );
    },
    deleteDataSource(dtsId: number) {
        return axios.delete(`/datasource/${dtsId}`);
    },
    getDataSourceMetaData(datasourceName: string) {
        return axios(`/meta/database_service/${datasourceName}`);
    },
    fetchDatabases(datasourceName: string) {
        return axios(`/meta/database_service/${datasourceName}/database`);
    },
    fetchSchemas(datasourceName: string, databaseName: string) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema`
        );
    },
    fetchTables(
        datasourceName: string,
        databaseName: string,
        schemaName: string
    ) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table`
        );
    },
    fetchColumns(
        datasourceName: string,
        databaseName: string,
        schemaName: string,
        tableName: string
    ) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table/${tableName}/column`
        );
    },
};
