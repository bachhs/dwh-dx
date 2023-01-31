import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import SkeletonBox from '@/components/SkeletonBox.vue';
import { Search } from '@element-plus/icons-vue';
import { searchMetaApi } from '@/api/searchMetaApi';
import type { forEach } from "lodash";
export default {
	components: {

	},
	setup() {
		const  filterCollection:any = ref({
			serviceTypeFilter: [],
			tierFilter: [],
			tagsFilter: [],
			dataSourceFilter: [],
			databaseFilter: [],
			schemaFilter: [],
		});
		const data:any = ref<any>({
			isShowDeleted: true,
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

		const initedDataSearch = () => {
			const propertyMap = [
				{ key: 'serviceTypeFilter', value: 'sterms#Service' },
				{ key: 'tierFilter', value: 'sterms#Tier' },
				{ key: 'tagsFilter', value: 'sterms#Tags' },
				{ key: 'dataSourceFilter', value: 'sterms#ServiceName' },
				{ key: 'databaseFilter', value: 'sterms#Database' },
				{ key: 'schemaFilter', value: 'sterms#DatabaseSchema' }
			];
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
			})
			.catch((error:any) => {
				console.error('error searchTables', error);
			})
		};

		onMounted(() =>{
			initedDataSearch();
		})

		return { data, Search, resultData };
	},
};
