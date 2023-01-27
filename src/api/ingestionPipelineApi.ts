import { omAxios } from '@/config/apiClients';

const DIALECT_PARAMS: Record<string, Record<string, any>> = {
    mysql: {
        type: 'Mysql',
        scheme: 'mysql+pymysql',
    },
    postgresql: {
        type: 'Postgres',
        scheme: 'postgresql+psycopg2',
    },
    sqlserver: {
        type: 'Mssql',
        scheme: 'mssql+pytds',
    },
    oracle: {
        type: 'Oracle',
        scheme: 'oracle+cx_oracle',
    },
};

export const ingestionPipelineApi = {
    testConnection(
        dialect: string,
        host: string,
        port: number,
        username: string,
        password: string,
        database?: string
    ) {
        const body = {
            connection: {
                ...DIALECT_PARAMS[dialect],
                hostPort: `${host}:${port}`,
                username,
                password,
                database,
            },
            connectionType: 'Database',
        };

        return omAxios.post(
            '/services/ingestionPipelines/testConnection',
            body
        );
    },
    getAllIngestionPipelines(datasourceName: string) {
        return omAxios.get('/services/ingestionPipelines', {
            params: {
                service: datasourceName,
                fields: 'pipelineStatuses',
            },
        });
    },
    /**
     * Start running an ingestion pipeline
     * @param ingestionId
     * @returns axios promise
     */
    triggerIngestionPipeline(ingestionId: string) {
        return omAxios.post(
            `/services/ingestionPipelines/trigger/${ingestionId}`
        );
    },
    killIngestionPipeline(ingestionId: string) {
        return omAxios.post(`/services/ingestionPipelines/kill/${ingestionId}`);
    },
    /**
     * Get ingestion logs. The response includes "ingestion_task" or "profiler_task".
     * @param ingestionId
     * @returns
     */
    getIngestionLog(ingestionId: string) {
        return omAxios.get(
            `/services/ingestionPipelines/logs/${ingestionId}/last`
        );
    },
    deleteIngestionPipeline(ingestionId: string) {
        return omAxios.delete(`/services/ingestionPipelines/${ingestionId}`, {
            params: {
                hardDelete: true,
            },
        });
    },
};
