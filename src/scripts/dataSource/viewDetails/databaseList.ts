import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup(props: any) {
        const databases = ref([]);
        const fetchDatabases = async (datasourceName: string) => {
            const res = await dataSourceApi.fetchDatabases(datasourceName);

            databases.value = res.data.data;
        };
        onMounted(() => {
            // hard code for now
            fetchDatabases("demo_app_26_10_23");
        });
        return {
            databases,
        };
    },
};
