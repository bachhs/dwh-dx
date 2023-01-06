import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";
import { updateDatabseDescription } from "@/helpers/dataSourceHelper";
import { ElMessage } from 'element-plus';

export default {
    props: ["viewSettings"],
    emits: ["onChangeView", "processingEvent"],
    components: {
        SetDescriptionModal,
    },
    setup(props: any) {
        const isLoading = ref(false);
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databases = ref([]);
        const fetchDatabases = async (datasourceName: string) => {
            isLoading.value = true;
            const res = await dataSourceApi.fetchDatabases(datasourceName);
            databases.value = res.data.data;
            isLoading.value = false;
        };
        const updateDatabseDesc = (metaId:string, description:string) => {
            updateDatabseDescription(metaId, description).then((metaData:any) =>{
                ElMessage({
                    message: "Cập nhật mô tả database thành công",
                    type: 'success',
                });
                fetchDatabases(dataSourceSelected.name);
            });
        };
        const refreshData = () =>{
            fetchDatabases(dataSourceSelected.name);
        };
        onMounted(() => {
            // hard code for now
            fetchDatabases(dataSourceSelected.name);
        });
        return {
            isLoading,
            databases,
            refreshData,
            updateDatabseDesc,
        };
    },
};
