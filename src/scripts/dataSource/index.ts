import { defineAsyncComponent, ref, nextTick } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';

export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import('@/views/dataSource/List.vue'),
            loadingComponent: SkeletonBox,
        }),
        AddData: defineAsyncComponent({
            loader: () => import('@/views/dataSource/AddDataSource.vue'),
            loadingComponent: SkeletonBox,
        }),
        ModifyData: defineAsyncComponent({
            loader: () => import('@/views/dataSource/ModifyDataSource.vue'),
            loadingComponent: SkeletonBox,
        }),
        ViewDetail: defineAsyncComponent({
            loader: () => import('@/views/dataSource/ViewDetail.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const viewSettings = ref({
            viewName: 'ListData',
            title: 'Nguồn dữ liệu',
            dataItem: new Object(null),
        });
        const changeView = (paramsObject: { viewName: string; data: any }) => {
            isChangeViewLoading.value = true;
            // nextTick().then(async () =>{
            //     currentComponent.value = viewName;
            //     await nextTick();
            //     isChangeViewLoading.value = false;
            // });
            setTimeout(async () => {
                switch (paramsObject.viewName) {
                    case 'ListData':
                        viewSettings.value = {
                            viewName: 'ListData',
                            title: 'Nguồn dữ liệu',
                            dataItem: new Object(null),
                        };
                        break;
                    case 'AddData':
                        viewSettings.value = {
                            viewName: 'AddData',
                            title: 'Thêm mới nguồn dữ liệu',
                            dataItem: new Object(null),
                        };
                        break;
                    case 'ModifyData':
                        viewSettings.value = {
                            viewName: 'ModifyData',
                            title: 'Chỉnh sửa nguồn dữ liệu',
                            dataItem: paramsObject.data,
                        };
                        break;
                    case 'ViewDetail':
                        viewSettings.value = {
                            viewName: 'ViewDetail',
                            title: 'Chi tiết nguồn dữ liệu',
                            dataItem: paramsObject.data,
                        };
                        break;
                }
                await nextTick();
                currentComponent.value = paramsObject.viewName;
                isChangeViewLoading.value = false;
            }, 100);
        };
        return {
            isChangeViewLoading,
            currentComponent,
            viewSettings,
            changeView,
        };
    },
};
