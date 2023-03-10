import { omAxios } from '@/config/apiClients';

function parseFilters(filters?: string[], field?: string): string | undefined {
    if (!filters || filters.length === 0) {
        return undefined;
    }

    const exp = filters.map((x) => `${field}:${x}`).join(' OR ');

    return `(${exp})`;
}

export const searchMetaApi = {
    searchTables(
        query?: string,
        page = 1,
        size = 10,
        sortField = 'updatedAt',
        sortOrder = 'desc',
        dialects?: string[],
        schemas?: string[],
        tags?: string[],
        datasourceNames?: string[],
        databaseNames?: string[]
    ) {
        let q = query ? `*${query}*` : '*';

        const dialectFilter = parseFilters(dialects, 'serviceType');
        if (dialectFilter) q += ` AND ${dialectFilter}`;

        const schemaFilter = parseFilters(schemas, 'databaseSchema.name');
        if (schemaFilter) q += ` AND ${schemaFilter}`;

        const tagFilter = parseFilters(tags, 'tags.tagFQN');
        if (tagFilter) q += ` AND ${tagFilter}`;

        const datasourceNameFilter = parseFilters(
            datasourceNames,
            'service.name'
        );
        if (datasourceNameFilter) q += ` AND ${datasourceNameFilter}`;

        const databaseNameFilter = parseFilters(databaseNames, 'database.name');
        if (databaseNameFilter) q += ` AND ${databaseNameFilter}`;

        size = Math.max(size, 1);
        const from = Math.max(page - 1, 0) * size;

        return omAxios.get('/search/query', {
            params: {
                index: 'table_search_index',
                q,
                from: from,
                size,
                sortField,
                sortOrder,
            },
        });
    },
};
