import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView", "processingEvent"],
    setup(props: any) {
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databases = ref([]);
        const fetchDatabases = async (datasourceName: string) => {
            const res = await dataSourceApi.fetchDatabases(datasourceName);
            databases.value = res.data.data;
        };
        onMounted(() => {
            // hard code for now
            fetchDatabases(dataSourceSelected.name);
        });
        return {
            databases,
        };
    },
};
