import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import { useDataCategoryStore } from "@/stores/dataCategory";
const dataCategoryState = useDataCategoryStore(); 
const databaseEnginesMap = dataCategoryState.databaseEnginesMap;
//import SkeletonBox from '@/components/SkeletonBox.vue';
import { Search } from '@element-plus/icons-vue';
import { searchMetaApi } from '@/api/searchMetaApi';
export default {
	components: {

	},
	setup() {
		const isLoading = ref<boolean>(false);
		const  filterCollection:any = ref({
			serviceTypeFilter: [],
			tierFilter: [],
			tagsFilter: [],
			dataSourceFilter: [],
			databaseFilter: [],
			schemaFilter: [],
		});

		const sortFieldOptions = [
			{ name: "Last updated", value: "updatedAt" },
			{ name: "Weekly Usage", value: "usageSummary.weeklyStats.count" },
			{ name: "Relevance", value: "" },
		]

		const data:any = ref<any>({
			queryStr: '',
			isShowDeleted: false,
			serviceTypeFilter: filterCollection.value.serviceTypeFilter.map((xItem:any) => {
				return { label: xItem, docCount: 0, selected: false }
			}),
			tierFilter: filterCollection.value.tierFilter.map((xItem:any) => {
				return { label: xItem, docCount: 0, selected: false }
			}),
			tagsFilter: filterCollection.value.tagsFilter.map((xItem:any) => {
				return { label: xItem, docCount: 0, selected: false }
			}),
			dataSourceFilter: filterCollection.value.dataSourceFilter.map((xItem:any) => {
				return { label: xItem, docCount: 0, selected: false }
			}),
			databaseFilter: filterCollection.value.databaseFilter.map((xItem:any) => {
				return { label: xItem, docCount: 0, selected: false }
			}),
			schemaFilter: filterCollection.value.schemaFilter.map((xItem:any) => {
				return { label: xItem, docCount: 0, selected: false }
			}),
		});
		
		const resultData:any = ref({
			sortField: sortFieldOptions[0].value,
			sortOrder: 'desc',
			tableData: {
				total: 0,
				pageIndex: 1,
				pageSize: 50,
				data: []
			},
			topicData: {
				total: 0,
				pageIndex: 1,
				pageSize: 50,
				data: []
			},
			dashboardData: {
				total: 0,
				pageIndex: 1,
				pageSize: 50,
				data: []
			},
			pipelinesData: {
				total: 0,
				pageIndex: 1,
				pageSize: 50,
				data: []
			},
			mlModelData: {
				total: 0,
				pageIndex: 1,
				pageSize: 50,
				data: []
			},
		});

		const getDbEngineIcon = (key:string) =>{
            try{
                if(key && databaseEnginesMap[key]){
                    return databaseEnginesMap[key].value.iconName;
                }
            }catch(error){
                console.error(error);
            }
            return "exclaimationquestionmark.svg";
        };
		
		const propertyMap = [
			{ key: 'serviceTypeFilter', value: 'sterms#Service' },
			{ key: 'tierFilter', value: 'sterms#Tier' },
			{ key: 'tagsFilter', value: 'sterms#Tags' },
			{ key: 'dataSourceFilter', value: 'sterms#ServiceName' },
			{ key: 'databaseFilter', value: 'sterms#Database' },
			{ key: 'schemaFilter', value: 'sterms#DatabaseSchema' }
		];

		const initedDataSearch = () => {
			isLoading.value = true;
			searchMetaApi.searchTables().then((response:any) => {
				const responseData = response.data;
				propertyMap.forEach(propItem => {
					const dataBucket = responseData.aggregations[propItem.value].buckets;
					//console.log(`response ${propItem.key}`, dataBucket);
					data.value[propItem.key] = dataBucket.map((xItem:any) => {
						return { label: xItem.key, docCount: xItem.doc_count, selected: false }
					});
				});
				resultData.value.tableData.total = responseData.hits.total.value;
				resultData.value.tableData.data = responseData.hits.hits;
				isLoading.value = false;
			})
			.catch((error:any) => {
				console.error('error initedDataSearch', error);
				isLoading.value = false;
			});
		};

		const searMetaData = () => {
			isLoading.value = true;
			let queryStr:string = data.value.queryStr;
			let pageIndex:number = resultData.value.tableData.pageIndex;
			let pageSize:number = resultData.value.tableData.pageSize;
			let sortField:string = resultData.value.sortField;
			let sortOrder:string = resultData.value.sortOrder;
			let dialects:Array<string> = data.value.serviceTypeFilter.filter((xItem:any) => xItem.selected).map((xItem:any) => xItem.label);
			let schemas:Array<string> = data.value.schemaFilter.filter((xItem:any) => xItem.selected).map((xItem:any) => xItem.label);
			let tags:Array<string> = data.value.tagsFilter.filter((xItem:any) => xItem.selected).map((xItem:any) => xItem.label);

			searchMetaApi.searchTables(queryStr, pageIndex, pageSize, sortField, sortOrder, dialects, schemas, tags)
			.then((response:any) => {
				const responseData = response.data;
				console.log(`searchTables responseData`, responseData);
				propertyMap.forEach(propItem => {
					const dataBucket = responseData.aggregations[propItem.value].buckets;
					//console.log(`response ${propItem.key}`, dataBucket);
					data.value[propItem.key] = dataBucket.map((xItem:any) => {
						let isSelected = false;
						if(propItem.key === 'serviceTypeFilter') isSelected = dialects.includes(xItem.key);
						if(propItem.key === 'schemaFilter') isSelected = schemas.includes(xItem.key);
						if(propItem.key === 'tagsFilter') isSelected = tags.includes(xItem.key);
						return { label: xItem.key, docCount: xItem.doc_count, selected: isSelected }
					});
				});
				resultData.value.tableData.total = responseData.hits.total.value;
				resultData.value.tableData.data = responseData.hits.hits;
				isLoading.value = false;
			})
			.catch((error:any) => {
				console.error('error searMetaData', error);
				isLoading.value = false;
			});
		}

		const clearAllFilter = () => {
			isLoading.value = true;
			initedDataSearch();
		}

		onMounted(() =>{
			initedDataSearch();
		})

		return { 
			isLoading, 
			sortFieldOptions, 
			getDbEngineIcon, 
			data, 
			Search, 
			clearAllFilter, 
			searMetaData, 
			resultData 
		};
	},
};
