import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { dataSourceApi } from "@/api/dataSourceApi";
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute, useRouter } from 'vue-router';
import usePaginationList from '@/scripts/_baseScripts/_usePaginationList';

export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup() {
		const filterDataSource = ref({
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
		} = usePaginationList(dataSourceApi.dataSourceList, filterDataSource);

		const deleteDataSource = (item:any) =>{
			deleteElement(dataSourceApi.deleteDataSource(item.id), 'nguồn dữ liệu', item.name);
		};

		const route = useRoute();
		const router = useRouter();
		onMounted(() => {
			if(route.query.organization){
				const organizationId:any = route.query.organization || "";
				if(organizationId && organizationId !== ""){
					filterData.value.organization_id = parseInt(organizationId);
					let query = Object.assign({}, route.query);
					delete query.color;
					router.replace({ query: {} });
				}
			}
			getListData(1);
		}); 
		return {
			isLoading,
			listElements,
			lastDataLoading,
			filterData,
			getListData,
			filterDataFn,
			refreshDataFn,
			filterDataDebounceFn,
			deleteDataSource,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions']),
	},
};