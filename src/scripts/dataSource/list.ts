import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { dataSourceApi } from "@/api/dataSourceApi";
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';

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
		const filterQuery = ref("");
		const sourceData:any = ref('');
		const options = ref([
			{
				value: "Option1",
				label: "Option1",
			},
			{
				value: "Option2",
				label: "Option2",
			},
			{
				value: "Option3",
				label: "Option3",
			},
			{
				value: "Option4",
				label: "Option4",
			},
			{
				value: "Option5",
				label: "Option5",
			},
		]);

		const getDataSources = (pageNumber:number = 1) => {
			isLoading.value = true;
			let pagination:any = datasources.value.pagination;
			dataSourceApi.dataSourceList({ page: pageNumber, size: pagination.size })
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
			ElMessageBox.confirm(
				`Đồng ý sẽ xoá nguồn dữ liệu <strong class="text-primary">${item.name}</strong>. Tiếp tục?`, 'Xác nhận xoá', {
					dangerouslyUseHTMLString: true,
					confirmButtonText: 'Đồng ý xoá',
					cancelButtonText: 'Không xoá',
					type: 'warning',
				}
			)
			.then(() => {
				ElMessage({
					dangerouslyUseHTMLString: true,
					type: 'success',
					message: `Đã xoá nguồn dữ liệu <strong class="text-primary">${item.name}</strong>`,
				})
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

		return {
			isLoading,
			datasources,
			typeDataFormat,
			filterQuery,
			sourceData,
			options,
			getDataSources,
			deleteDataSource,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfData']),
	},
};