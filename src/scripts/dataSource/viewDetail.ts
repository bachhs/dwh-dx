import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup(props:any) { 
		const isLoading = ref(false);
		const ds = ref(null);
		onMounted(() =>{
			ds.value = props.viewSettings.dataItem;
		});
		return { 
			isLoading,
            ds,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfData']),
	},
};