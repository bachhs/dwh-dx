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
        const databaseSelected = props.viewSettings.databaseSelected;
        const contentHeight = 'calc(100vh - 23rem)';
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
        
        const refreshData = () =>{
            fetchSchemas(dataSourceSelected.name, databaseSelected.name);
        };

        onMounted(() => {
            // hard code for now
            fetchSchemas(dataSourceSelected.name, databaseSelected.name);
        });
        return {
            schemas,
            contentHeight,
            refreshData,
        };
    },
};
