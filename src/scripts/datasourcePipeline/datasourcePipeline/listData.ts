import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { datasourcePipelineApi } from "@/api/datasourcePipelineApi";
import { dataSourceApi } from "@/api/dataSourceApi";
import { useDataCategoryStore } from '@/stores/dataCategory';
import { stringCompareFn } from '@/helpers/compareFn';
import usePaginationList from '@/scripts/_baseScripts/_usePaginationList';
import { cronstrueToString } from '@/helpers/cronstrueVI';
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup() {
        const moduleName = 'Tiến trình thu thập dữ liệu';
		const filterDtsPipeline = ref({
			organization_id: '',
			dialect: '',
			name: '',
		});
		const { 
			isLoading, 
			lastDataLoading, 
			listElements, 
			filterData, 
			filterDataDebounceFn, 
			getListData,
			refreshDataFn, 
			filterDataFn,
			deleteElement,
		} = usePaginationList(datasourcePipelineApi.dtsPipelineList, filterDtsPipeline);

        const dataSourceOptions = ref([]);
        const getDataSourceOptions = () =>{
            dataSourceApi.dataSourceList({ 
                page: 1,
                size: 999,
            })
            .then((response:any) =>{
                dataSourceOptions.value = response.data.content
                .sort((a:any, b:any) =>{ return stringCompareFn(a.organization, b.organization); }).map((item:any) =>{
                    return {
                        id: item.id,
                        label: `${item.organization} - ${item.name}`,
                    }
                });
            })
            .catch(error => console.error(error));
        };

		const getCronExpressionReadable = (cronExp) => {
			return cronstrueToString(cronExp, { locale: "vi", verbose: true, use24HourTimeFormat: true, });
		};

		const deleteDtsPipeline = (item:any) =>{
			deleteElement(datasourcePipelineApi.deleteDtsPipeline(item.id), moduleName, item.name);
		}; 

		onMounted(() => { 
            getDataSourceOptions();
			getListData(1);
		}); 
		return {
            moduleName,
			isLoading,
			listElements,
			lastDataLoading,
			filterData,
			getListData,
			filterDataFn,
			refreshDataFn,
			filterDataDebounceFn,
			deleteDtsPipeline,
            dataSourceOptions,
			getCronExpressionReadable,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions']),
	},
};