import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref, watch } from "vue";
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";
import { updateDatabseDescription, updateSchemaDescription } from "@/helpers/dataSourceHelper";
import { ElMessage } from 'element-plus';

export default {
    props: ["viewSettings"],
    emits: ["onChangeView", "processingEvent", "onLoadingChanged"],
    components: {
        SetDescriptionModal,
    },
    setup(props:any, { emit }:any) {
        const isLoading = ref(false);
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
        const contentHeight = 'calc(100vh - 23rem)';
        const schemas = ref([]);
        const fetchSchemas = async ( datasourceName: string, databaseName: string ) => {            
            isLoading.value = true;
            const res = await dataSourceApi.fetchSchemas(
                datasourceName,
                databaseName
            );
            schemas.value = res.data.data;
            isLoading.value = false;
        };
        
        const refreshData = () =>{
            fetchSchemas(dataSourceSelected.name, databaseSelected.name);
        };

        const updateDatabseDesc = (metaId:string, description:string) => {
            updateDatabseDescription(metaId, description).then((metaData:any) =>{
                ElMessage({
                    message: "Cập nhật mô tả database thành công",
                    type: 'success',
                });
            });
        };

        const updateSchemaDesc = (metaId:string, description:string) => {
            updateSchemaDescription(metaId, description).then((metaData:any) =>{
                ElMessage({
                    message: "Cập nhật mô tả schema thành công",
                    type: 'success',
                });
                fetchSchemas(dataSourceSelected.name, databaseSelected.name);
            });
        }; 

        onMounted(() => {
            // hard code for now
            fetchSchemas(dataSourceSelected.name, databaseSelected.name);
        });
        watch(isLoading, (newVal) => {
            emit("onLoadingChanged", newVal);
        });
        return {
            isLoading,
            databaseSelected,
            schemas,
            contentHeight,
            refreshData,
            updateDatabseDesc,
            updateSchemaDesc,
        };
    },
};
