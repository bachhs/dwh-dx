import axios from "axios";
import { onMounted, ref } from "vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup(props: any) {
        const tables = ref([]);
        const fetchTables = async (
            datasourceName: string,
            databaseName: string,
            schemaName: string
        ) => {
            const res = await axios(
                `/meta/database_service/${datasourceName}/database/${databaseName}/schema/${schemaName}/table`
            );

            tables.value = res.data.tables;
        };
        onMounted(() => {
            // hard code for now
            fetchTables("demo_app_26_10_23", "demo_app", "public");
        });
        return {
            tables,
        };
    },
};
