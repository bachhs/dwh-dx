import { dataSourceApi } from '@/api/dataSourceApi';
import { onMounted, ref } from 'vue';

export default {
    props: ['viewSettings'],
    emits: ['onChangeView', 'processingEvent'],
    setup(props: any) {
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
        const schemasSelected = props.viewSettings.schemasSelected;
        const tables = ref([]);
        const fetchTables = async (
            datasourceName: string,
            databaseName: string,
            schemaName: string
        ) => {
            const res = await dataSourceApi.fetchTables(
                datasourceName,
                databaseName,
                schemaName
            );

            tables.value = res.data.tables;
        };
        onMounted(() => {
            // hard code for now
            fetchTables(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name
            );
        });
        return {
            tables,
        };
    },
};
