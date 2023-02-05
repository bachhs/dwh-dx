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
        
        const searchResult = ref({
            data: [],
            page: 1,
            size: 50, 
            total: 0,
        }); 
        
        const searchFileData = () => {
            isLoading.value = true;
            const searchParams:any =   {
                ...filterRequest.value
            };
            fileSearchApi.searchFileData(searchParams)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        searchResult.value.data = response.data.data;
                        searchResult.value.total = response.data.total;
                        searchResult.value.page = filterRequest.value.page;
                        searchResult.value.size = filterRequest.value.size;
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
            Search,
            searchResult
        }
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization",
        ]),
    },
}