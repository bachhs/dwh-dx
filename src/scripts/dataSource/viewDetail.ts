import { defineAsyncComponent, ref, onMounted } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';
import SkeletonBox from "@/components/SkeletonBox.vue";
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
    components: {
        SchemasList: defineAsyncComponent({
            loader: () => import("@/views/dataSource/viewDetails/SchemasList.vue"),
            loadingComponent: SkeletonBox
        }),
        TablesAndViews: defineAsyncComponent({
            loader: () => import("@/views/dataSource/viewDetails/TablesAndViews.vue"),
            loadingComponent: SkeletonBox
        }),
    },
	setup(props:any) { 
		const isLoading = ref(false);
		const ds = ref(null);
		const currentView = ref('SchemasList');
        const processingEvent = (evtParams:any) => {
            currentView.value = "TablesAndViews";
        };
		onMounted(() =>{
			ds.value = props.viewSettings.dataItem;
		});
		return { 
			isLoading,
            ds,
            currentView,
            processingEvent,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfData']),
	},
};