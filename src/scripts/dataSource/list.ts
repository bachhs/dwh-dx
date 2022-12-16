import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { dataSourceApi } from "@/api/dataSourceApi";
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
import debounce from 'lodash/debounce';

export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup() {
		const isLoading = ref(false);
		const datasources = ref({ 
			data: [],  
			pagination: { 
				page: 1, 
				size: 15,
				totalElements: 0, 
				totalPages: 1 
			} 
		});
		const typeDataFormat = ref("");
		const filterData = ref({
			organization_id: '',
			dialect: '',
			name: '',
		});
		const sourceData:any = ref(''); 
		const getDataSources = (pageNumber:number = 1) => {
			isLoading.value = true;
			let pagination:any = datasources.value.pagination;
			let filterDataRequest = filterData.value;
			dataSourceApi.dataSourceList({ 
				page: pageNumber, 
				size: pagination.size,
				organization_id: filterDataRequest.organization_id,
				dialect: filterDataRequest.dialect,
				name: filterDataRequest.name,
			})
			.then(response =>{
				datasources.value.pagination = {
					page : pageNumber,					
					size : response.data.size,
					totalElements: response.data.totalElements,
					totalPages: response.data.totalPages
				};
				datasources.value.data = response.data.content;
				isLoading.value = false;
			}).catch(() =>{
				isLoading.value = false;
			});
		};

		const deleteDataSource = (item:any) =>{
			let showErrorMsg =(msg:string) =>{
				ElMessage({
					dangerouslyUseHTMLString: true,
					type: 'info',
					message: `Đã có lỗi xảy ra khi xoá nguồn dữ liệu <strong class="text-primary">${item.name}</strong>. ${msg}`,
				})
			};
			ElMessageBox.confirm(
				`Đồng ý sẽ xoá nguồn dữ liệu <strong class="text-primary">${item.name}</strong>. Tiếp tục?`, 'Xác nhận xoá', {
					dangerouslyUseHTMLString: true,
					confirmButtonText: 'Đồng ý xoá',
					cancelButtonText: 'Không xoá',
					type: 'warning',
				}
			)
			.then(() => {
				dataSourceApi.deleteDataSource(item.id).then((response:any) =>{		
					if(response.data.code === 20000){
						ElMessage({
							dangerouslyUseHTMLString: true,
							type: 'success',
							message: `Đã xoá nguồn dữ liệu <strong class="text-primary">${item.name}</strong>`,
						});	
						console.log(response.data.message);
						filterDataFn();
					}
					else{
						showErrorMsg(response.data.message);
					}
				}).catch(error =>{
					showErrorMsg("UNKNOW ERROR");
					console.error(error);
				});
			})
			.catch(() => {
				ElMessage({
					dangerouslyUseHTMLString: true,
					type: 'info',
					message: `Đã huỷ bỏ lệnh xoá nguồn dữ liệu <strong class="text-primary">${item.name}</strong>`,
				})
			})
		};

		const route = useRoute();
		onMounted(() => {
			if(route.query.organization){
				const organizationId:any = route.query.organization || "";
				if(organizationId && organizationId !== ""){
					sourceData.value = parseInt(organizationId);
				}
			}
			getDataSources(1);
		});
		const filterDataFn = () =>{
			getDataSources(1);
		};
		const filterDataDebounceFn =  debounce(filterDataFn, 1000, { 'maxWait': 5000 });
		const refreshDataFn = () =>{
			filterData.value = {
				organization_id: '',
				dialect: '',
				name: '',
			};
			getDataSources(1);
		};

		return {
			isLoading,
			datasources,
			typeDataFormat,
			filterData,
			sourceData, 
			getDataSources,
			deleteDataSource,
			filterDataFn,
			filterDataDebounceFn,
			refreshDataFn,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions']),
	},
};