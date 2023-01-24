import type DatasourceInfo from '@/scripts/dataSource/type';
import axios from 'axios';
import { omAxios } from '@/config/apiClients';

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
        return omAxios.get(
            `/services/databaseServices/name/${datasourceName}`,
            {
                params: {
                    fields: 'owner',
                },
            }
        );
    },
    updateDataSourceDescription(
        datasourceName: string,
        descriptionHtml: string
    ) {
        return this.getDataSourceMetaData(datasourceName).then((response) => {
            const data = response.data;

            return omAxios.put('/services/databaseServices', {
                connection: data.connection,
                name: datasourceName,
                serviceType: data.serviceType,
                owner: data.owner,
                description: descriptionHtml,
            });
        });
    },
    fetchDatabases(datasourceName: string) {
        return omAxios.get('/databases', {
            params: {
                service: datasourceName,
                fields: 'owner,usageSummary',
            },
        });
    },
    updateDatabseDescription(metaId: string, descriptionHtml: string) {
        return omAxios.patch(
            `/databases/${metaId}`,
            [
                {
                    op: 'add',
                    path: '/description',
                    value: descriptionHtml,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    },
    fetchSchemas(datasourceName: string, databaseName: string) {
        return omAxios.get('/databaseSchemas', {
            params: {
                database: `${datasourceName}.${databaseName}`,
                fields: 'owner,usageSummary',
            },
        });
    },
    updateSchemaDescription(metaId: string, descriptionHtml: string) {
        return omAxios.patch(
            `/databaseSchemas/${metaId}`,
            [
                {
                    op: 'add',
                    path: '/description',
                    value: descriptionHtml,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    },
    fetchTables(
        datasourceName: string,
        databaseName: string,
        schemaName: string
    ) {
        return omAxios.get(
            `/databaseSchemas/name/${datasourceName}.${databaseName}.${schemaName}`,
            {
                params: {
                    fields: 'tables,owner,usageSummary',
                },
            }
        );
    },
    updateTableDescription(tableMetaId: string, description: string) {
        return omAxios.patch(
            `/tables/${tableMetaId}`,
            [
                {
                    op: 'add',
                    path: '/description',
                    value: description,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    },
    updateTableTags(tableMetaId: string, tags: string[]) {
        const tagPayload = tags.map((tag, index) => {
            return {
                op: 'add',
                path: `/tags/${index}`,
                value: {
                    labelType: 'Manual',
                    source: 'Tag',
                    state: 'Confirmed',
                    tagFQN: tag,
                },
            };
        });
        return omAxios.patch(`/tables/${tableMetaId}`, tagPayload, {
            headers: {
                'Content-Type': 'application/json-patch+json',
            },
        });
    },
    deleteTableTags(tableMetaId: string, tagIndex: number) {
        return omAxios.patch(
            `/tables/${tableMetaId}`,
            [
                {
                    op: 'remove',
                    path: `/tags/${tagIndex}`,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    },
    fetchColumns(
        datasourceName: string,
        databaseName: string,
        schemaName: string,
        tableName: string
    ) {
        return omAxios.get(
            `/tables/name/${datasourceName}.${databaseName}.${schemaName}.${tableName}`,
            {
                params: {
                    fields: 'columns,owner,usageSummary,tags,dataModel,profile,tests,tableConstraints,extension',
                    include: 'all',
                },
            }
        );
    },
    updateColumnDescription(
        tableMetaId: string,
        columnId: number,
        description: string
    ) {
        return omAxios.patch(
            `/tables/${tableMetaId}`,
            [
                {
                    op: 'add',
                    path: `/columns/${columnId}/description`,
                    value: description,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    },
    updateColumnTags(tableMetaId: string, columnId: number, tags: string[]) {
        const tagPayload = tags.map((tag, index) => {
            return {
                op: 'add',
                path: `/columns/${columnId}/tags/${index}`,
                value: {
                    labelType: 'Manual',
                    source: 'Tag',
                    state: 'Confirmed',
                    tagFQN: tag,
                },
            };
        });
        return omAxios.patch(`/tables/${tableMetaId}`, tagPayload, {
            headers: {
                'Content-Type': 'application/json-patch+json',
            },
        });
    },
    deleteColumnTags(tableMetaId: string, columnId: number, tagIndex: number) {
        return omAxios.patch(
            `/tables/${tableMetaId}`,
            [
                {
                    op: 'remove',
                    path: `/columns/${columnId}/tags/${tagIndex}`,
                },
            ],
            {
                headers: {
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
    },
    fetchSampleData(
        datasourceName: string,
        databaseName: string,
        schemaName: string,
        tableName: string
    ) {
        return omAxios.get(
            `/tables/name/${datasourceName}.${databaseName}.${schemaName}.${tableName}`,
            {
                params: {
                    fields: 'sampleData',
                },
            }
        );
    },
    fetchActivityFeedData(
        datasourceName: string,
        databaseName: string,
        schemaName: string,
        tableName: string
    ) {
        return omAxios.get(
            `/feed/<#E::table::${datasourceName}.${databaseName}.${schemaName}.${tableName}>`
        );
    },
};
