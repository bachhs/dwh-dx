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
    updateDataSourceDescription(datasourceName: string, descriptionHtml: string){
        return axios.put(`/meta/database_service/${datasourceName}/description`, {
            "description": descriptionHtml
        });
    },
    fetchDatabases(datasourceName: string) {
        return axios(`/meta/database_service/${datasourceName}/database`);
    },
    updateDatabseDescription(metaId: string, descriptionHtml: string){
        return axios.post(`/meta/database_service/database/${metaId}/description`, {
            "description": descriptionHtml
        });
    },
    fetchSchemas(datasourceName: string, databaseName: string) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema`
        );
    },
    updateSchemaDescription(metaId:string, descriptionHtml: string){
        return axios.post(`/meta/database_service/schema/${metaId}/description`, {
            "description": descriptionHtml
        });
    },
    fetchTables( datasourceName: string, databaseName: string, schemaName: string ) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table`
        );
    },
    updateTableDescription(tableMetaId: string, description: string) {
        return axios.post(`/meta/database_service/table/${tableMetaId}/description`, {
            description,
        });
    },
    updateTableTags(tableMetaId: string, tags: string[]) {
        return axios.post(`/meta/database_service/table/${tableMetaId}/tags`, {
            tags,
        });
    },
    fetchColumns( datasourceName: string, databaseName: string, schemaName: string, tableName: string ) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table/${tableName}/column`
        );
    },
    updateColumnDescription( tableMetaId: string, columnId: number, description: string ) {
        return axios.post(
            `/meta/database_service/table/${tableMetaId}/column/${columnId}/description`, {
                description,
            }
        );
    },
    updateColumnTags(tableMetaId: string, columnId: number, tags: string[]) {
        return axios.post(`/meta/database_service/table/${tableMetaId}/column/${columnId}/tags`, {
            tags,
        });
    },
    fetchSampleData( datasourceName: string, databaseName: string, schemaName: string, tableName: string ) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table/${tableName}/sample`
        );
    },
    fetchActivityFeedData( datasourceName: string, databaseName: string, schemaName: string, tableName: string ) {
        return axios(
            `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table/${tableName}/feed`
        );
    },
};
