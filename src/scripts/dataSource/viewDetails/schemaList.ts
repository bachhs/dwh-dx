import { dataSourceApi } from "@/api/dataSourceApi";
import { onMounted, ref } from "vue";
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";
import { updateDatabseDescription, updateSchemaDescription } from "@/helpers/dataSourceHelper";
import { ElMessage } from 'element-plus';

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

        const updateDatabseDesc = (metaId:string, description:string) => {
            updateDatabseDescription(metaId, description).then((metaData:any) =>{
                ElMessage({
                    message: "Cập nhật mô tả database thành công",
                    type: 'success',
                });
                fetchDatabases(dataSourceSelected.name);
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
        return {
            databaseSelected,
            schemas,
            contentHeight,
            refreshData,
            updateDatabseDesc,
            updateSchemaDesc,
        };
    },
};
