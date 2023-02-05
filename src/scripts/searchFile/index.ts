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

        const aggregationsList = ref<any>({
            organization: Array<any>([]),
            embedded_id: Array<any>([])
        });
        
        const searchResult = ref({
            data: [],
            page: 1,
            size: 50, 
            total: 0,
        }); 

        const createAggregationsList = (propName:string, aggregations:Array<any>, itemSelected:any) =>{
            console.error(`propName, ${aggregations}`);
            let bucketsItem = aggregations.find((xItem:any) => xItem.name === propName).buckets;
            console.error(`propName, ${bucketsItem}`);
            if(bucketsItem.length > 0){                
                aggregationsList.value[propName] = bucketsItem.map((xItem:any) => {
                    return  {
                        ...xItem,
                        selected: (itemSelected && itemSelected === xItem.key ? true : false),
                    }
                });
            }
            else aggregationsList.value[propName] = [];
        }
        
        const searchFileData = () => {
            isLoading.value = true;
            const searchParams:any =   {
                page: filterRequest.value.page,
                size: filterRequest.value.size,
            };

            let orgItemSelected = aggregationsList.value.organization.find((xItem:any) =>  xItem.selected);
            if(orgItemSelected){
                searchParams.organization_name = orgItemSelected.key;
            }
            
            let embeddedIdItemSelected = aggregationsList.value.embedded_id.find((xItem:any) =>  xItem.selected);
            if(embeddedIdItemSelected){
                searchParams.embedded_id = orgItemSelected.key;
            }

            fileSearchApi.searchFileData(searchParams)
                .then((response: any) => {
                    if (response.status === 200 && response.data) {
                        searchResult.value.data = response.data.data;
                        searchResult.value.total = response.data.total;
                        searchResult.value.page = filterRequest.value.page;
                        searchResult.value.size = filterRequest.value.size;
                        createAggregationsList("organization", response.data.aggregations, orgItemSelected);
                        createAggregationsList("embedded_id", response.data.aggregations, embeddedIdItemSelected);
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

        const refreshResult  = () =>  {
            aggregationsList.value = {
                organization: [],
                embedded_id: []
            };
            filterRequest.value.page = 1;
            searchFileData();
        }

        onMounted(() => {
            searchFileData();
        });
        
        return {
            isLoading,
            filterRequest,
            aggregationsList,
            Search,
            searchResult,
            searchFileData,
            refreshResult
        }
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization",
        ]),
    },
}