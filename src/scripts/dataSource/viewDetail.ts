import { defineAsyncComponent, ref, onMounted } from 'vue';
import { mapState } from 'pinia';
import { useDataCategoryStore } from '@/stores/dataCategory';
import {
    getDataSourceMetaData,
    updateDataSourceDescription,
} from '@/helpers/dataSourceHelper';
import { ElMessage } from 'element-plus';
import SkeletonBox from '@/components/SkeletonBox.vue';
import SetDescriptionModal from '@/components/modals/SetDescriptionModal.vue';
import { getDataEngineItem } from '@/helpers/ultilityFunctions';
//const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {
        SetDescriptionModal,
        DatabaseList: defineAsyncComponent({
            loader: () =>
                import('@/views/dataSource/viewDetails/DatabaseList.vue'),
            loadingComponent: SkeletonBox,
        }),
        SchemasList: defineAsyncComponent({
            loader: () =>
                import('@/views/dataSource/viewDetails/SchemasList.vue'),
            loadingComponent: SkeletonBox,
        }),
        TablesAndViews: defineAsyncComponent({
            loader: () =>
                import('@/views/dataSource/viewDetails/TablesAndViews.vue'),
            loadingComponent: SkeletonBox,
        }),
        TableDetails: defineAsyncComponent({
            loader: () =>
                import('@/views/dataSource/viewDetails/TableDetails.vue'),
            loadingComponent: SkeletonBox,
        }),
        ColumnDetails: defineAsyncComponent({
            loader: () =>
                import('@/views/dataSource/viewDetails/ColumnDetails.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup(props: any) {
        const isLoading = ref(false);
        const isBusing = ref(false);
        const ds: any = ref(null);
        const currentView = ref('DatabaseList');
        const currentViewProps = ref({});
        const breadcrumbs = ref(new Array<any>());
        const dataEngineItem = ref<any>({});
        const processingEvent = (evtParams: any) => {
            const currentViewPropsValue: any = currentViewProps.value;
            let viewProps: any = {};
            viewProps.viewName = evtParams.eventName;
            viewProps.dataSourceItem = ds.value;
            breadcrumbs.value = [
                { view: 'DatabaseList', label: ds.value.name, data: ds.value },
            ];
            let databaseSelected = null;
            let schemasSelected = null;
            let tableSelected = null;
            let columnSelected = null;
            switch (evtParams.eventName) {
                case 'DatabaseList':
                    break;
                case 'SchemasList':
                    databaseSelected = evtParams.dataItem;
                    viewProps = {
                        ...viewProps,
                        databaseSelected: databaseSelected,
                    };
                    breadcrumbs.value.push({
                        view: 'SchemasList',
                        label: databaseSelected.name,
                        data: databaseSelected,
                    });
                    break;
                case 'TablesAndViews':
                    databaseSelected = currentViewPropsValue.databaseSelected;
                    schemasSelected = evtParams.dataItem;
                    viewProps = {
                        ...viewProps,
                        databaseSelected: databaseSelected,
                        schemasSelected: schemasSelected,
                    };
                    breadcrumbs.value.push({
                        view: 'SchemasList',
                        label: databaseSelected.name,
                        data: databaseSelected,
                    });
                    breadcrumbs.value.push({
                        view: 'TablesAndViews',
                        label: schemasSelected.name,
                        data: schemasSelected,
                    });
                    break;
                case 'TableDetails':
                    databaseSelected = currentViewPropsValue.databaseSelected;
                    schemasSelected = currentViewPropsValue.schemasSelected;
                    tableSelected = evtParams.dataItem;
                    viewProps = {
                        ...viewProps,
                        databaseSelected: databaseSelected,
                        schemasSelected: schemasSelected,
                        tableSelected: tableSelected,
                    };
                    breadcrumbs.value.push({
                        view: 'SchemasList',
                        label: databaseSelected.name,
                        data: databaseSelected,
                    });
                    breadcrumbs.value.push({
                        view: 'TablesAndViews',
                        label: schemasSelected.name,
                        data: schemasSelected,
                    });
                    breadcrumbs.value.push({
                        view: 'TableDetails',
                        label: tableSelected.name,
                        data: tableSelected,
                    });
                    break;
                case 'ColumnDetails':
                    databaseSelected = currentViewPropsValue.databaseSelected;
                    schemasSelected = currentViewPropsValue.schemasSelected;
                    tableSelected = currentViewPropsValue.tableSelected;
                    columnSelected = evtParams.dataItem;
                    viewProps = {
                        ...viewProps,
                        databaseSelected: databaseSelected,
                        schemasSelected: schemasSelected,
                        tableSelected: tableSelected,
                        columnSelected: columnSelected,
                    };
                    breadcrumbs.value.push({
                        view: 'SchemasList',
                        label: databaseSelected.name,
                        data: databaseSelected,
                    });
                    breadcrumbs.value.push({
                        view: 'TablesAndViews',
                        label: schemasSelected.name,
                        data: schemasSelected,
                    });
                    breadcrumbs.value.push({
                        view: 'TableDetails',
                        label: tableSelected.name,
                        data: tableSelected,
                    });
                    breadcrumbs.value.push({
                        view: 'ColumnDetails',
                        label: columnSelected.name,
                        data: columnSelected,
                    });
                    break;
            }
            currentViewProps.value = { ...viewProps };
            currentView.value = evtParams.eventName;
        };

        const currentViewRef = ref<InstanceType<any>>();
        const refreshData = () => {
            isLoading.value = true;
            if (!currentViewRef.value || !currentViewRef.value) return;
            currentViewRef.value?.refreshData();
            isLoading.value = false;
        };

        const updateDataSourceDesc = (descOfDS: string) => {
            updateDataSourceDescription(ds.value.name, descOfDS).then(
                (metaData: any) => {
                    ElMessage({
                        message: 'Cập nhật mô tả nguồn dữ liệu thành công',
                        type: 'success',
                    });
                }
            );
        };

        onMounted(() => {
            ds.value = props.viewSettings.dataItem;
            const viewProps: any = {};
            viewProps.viewName = 'DatabaseList';
            viewProps.dataSourceItem = ds.value;
            currentViewProps.value = { ...viewProps };
            breadcrumbs.value = [
                { view: 'DatabaseList', label: ds.value.name, data: ds.value },
            ];
            getDataSourceMetaData(ds.value.name).then((metaData: any) => {
                ds.value.metaData = metaData;
            });
            dataEngineItem.value = getDataEngineItem(ds.value.dialect);
        });
        return {
            isLoading,
            isBusing,
            currentViewRef,
            ds,
            breadcrumbs,
            currentView,
            currentViewProps,
            processingEvent,
            dataEngineItem,
            updateDataSourceDesc,
            refreshData,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
            'databaseEngineOptions',
        ]),
    },
};
