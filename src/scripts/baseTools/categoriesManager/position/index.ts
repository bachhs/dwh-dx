import { defineAsyncComponent, ref, nextTick } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';

export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import('@/views/baseTools/categoriesManager/position/List.vue'),
            loadingComponent: SkeletonBox,
        }),
        AddData: defineAsyncComponent({
            loader: () => import('@/views/baseTools/categoriesManager/position/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
        ModifyData: defineAsyncComponent({
            loader: () => import('@/views/baseTools/categoriesManager/position/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const viewSettings = ref({
            viewName: 'ListData',
            title: 'Chức vụ',
            dataItem: null,
        });
        const changeView = (paramsObject: { viewName: string; data: any }) => {
            isChangeViewLoading.value = true;
            setTimeout(async () => {
                switch (paramsObject.viewName) {
                    case 'ListData':
                        viewSettings.value = {
                            viewName: 'ListData',
                            title: 'Chức vụ',
                            dataItem: null,
                        };
                        break;
                    case 'AddData':
                        viewSettings.value = {
                            viewName: 'AddData',
                            title: 'Thêm mới Chức vụ',
                            dataItem: null,
                        };
                        break;
                    case 'ModifyData':
                        viewSettings.value = {
                            viewName: 'ModifyData',
                            title: 'Chỉnh sửa Chức vụ',
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
