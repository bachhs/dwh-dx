import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from "@/stores/dataCategory";
import { fileSearchApi } from "@/api/fileSearchApi";
import { ElMessage } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
export default {
    setup(props:any, context:any) {  
        const isLoading = ref(false); 
        const filterRequest = ref({
            query: "",
            organization_name: "",
            embedded_id: "",
            page: 1,
            size: 50
        });
        
        const searchFileData = () => {
            isLoading.value = true;
            const searchParams:any =   {
                ...filterRequest
            };
            fileSearchApi.searchFileData(searchParams)
                .then((response: any) => {
                    if (response.data) {
                        
                    } else {
                        console.error(`Oops, ${response.data.message}`);
                    }
                    isLoading.value = false;
                })
                .catch((error) => {
                    console.error(error);
                    isLoading.value = false;
                });
        };

        onMounted(() => {
            searchFileData();
        });
        
        return {
            isLoading,
            filterRequest,
            searchFileData,
            Search
        }
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization",
        ]),
    },
}