import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup(props: any) {
        const schemas = ref([]);
        const fetchSchemas = async (
            datasourceName: string,
            databaseName: string
        ) => {
            const res = await dataSourceApi.fetchSchemas(
                datasourceName,
                databaseName
            );

            schemas.value = res.data.data;
        };
        onMounted(() => {
            // hard code for now
            fetchSchemas("demo_app_26_10_23", "demo_app");
        });
        return {
            schemas,
        };
    },
};
