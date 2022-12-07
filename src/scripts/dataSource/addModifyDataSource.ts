import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup(props:any) { 
		const isLoading = ref(false);
		const itemModel = ref({
			nameOfDS: "",
			descOfDS: "",
			organizationSelected: appState.defaultOrganization,
			typeOfDataIn: 1,
			typeOfDataSourceSelected: 1
		});
		onMounted(() =>{
			if(props.viewSettings && props.viewSettings.viewName === "ModifyData" && props.viewSettings.dataItem != null){
				itemModel.value = {
					nameOfDS: props.viewSettings.dataItem.name,
					descOfDS: props.viewSettings.dataItem.name,
					organizationSelected: appState.defaultOrganization,
					typeOfDataIn: 1,
					typeOfDataSourceSelected: 1
				}
			}
		});
		return { 
			isLoading,
			itemModel
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfData']),
	},
};