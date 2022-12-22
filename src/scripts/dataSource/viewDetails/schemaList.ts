import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView", "processingEvent"],
    setup(props: any) {
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
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
            fetchSchemas(dataSourceSelected.name, databaseSelected.name);
        });
        return {
            schemas,
        };
    },
};
