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
        TableDetails: defineAsyncComponent({
            loader: () => import("@/views/dataSource/viewDetails/TableDetails.vue"),
            loadingComponent: SkeletonBox
        }),
        ColumnDetails: defineAsyncComponent({
            loader: () => import("@/views/dataSource/viewDetails/ColumnDetails.vue"),
            loadingComponent: SkeletonBox
        }),
    },
	setup(props:any) { 
		const isLoading = ref(false);
		const ds:any = ref(null);
		const currentView = ref('SchemasList');
		const breadcrumbs = ref(new Array<string>());
        const processingEvent = (evtParams:any) => {
            switch(evtParams.eventName){
                case 'SchemasList':
                    breadcrumbs.value = [ds.value.name];
                    break;
                case 'TablesAndViews':
                    breadcrumbs.value = [ds.value.name, 'information_schema'];
                    break;
                case 'TableDetails':
                    breadcrumbs.value = [ds.value.name, 'information_schema', 'datasource_cdc'];
                    break;
                case 'ColumnDetails':
                    breadcrumbs.value = [ds.value.name, 'information_schema', 'datasource_cdc', 'id'];
                    break;
            }
            currentView.value = evtParams.eventName;
        };
		onMounted(() =>{
			ds.value = props.viewSettings.dataItem;
            breadcrumbs.value = [props.viewSettings.dataItem.name]
		});
		return { 
			isLoading,
            ds,
            breadcrumbs,
            currentView,
            processingEvent,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfDataSource']),
	},
};