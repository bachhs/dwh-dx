import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";

export default {
    props: ["viewSettings"],
    emits: ["onChangeView", "processingEvent"],
    components: {
        SetDescriptionModal,
    },
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
