import { defineAsyncComponent, ref, nextTick } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';

export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import('@/views/dataSourceGroup/apiSource/List.vue'),
            loadingComponent: SkeletonBox,
        }),
        AddData: defineAsyncComponent({
            loader: () => import('@/views/dataSourceGroup/apiSource/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
        ModifyData: defineAsyncComponent({
            loader: () => import('@/views/dataSourceGroup/apiSource/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const viewSettings = ref({
            viewName: 'ListData',
            title: 'File Embed Link',
            dataItem: null,
        });
        const changeView = (paramsObject: { viewName: string; data: any }) => {
            isChangeViewLoading.value = true;
            setTimeout(async () => {
                switch (paramsObject.viewName) {
                    case 'ListData':
                        viewSettings.value = {
                            viewName: 'ListData',
                            title: 'File Embed Link',
                            dataItem: null,
                        };
                        break;
                    case 'AddData':
                        viewSettings.value = {
                            viewName: 'AddData',
                            title: 'Thêm mới Embed Link',
                            dataItem: null,
                        };
                        break;
                    case 'ModifyData':
                        viewSettings.value = {
                            viewName: 'ModifyData',
                            title: 'Chỉnh sửa Embed Link',
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
