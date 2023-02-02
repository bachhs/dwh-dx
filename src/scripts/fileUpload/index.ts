import { defineAsyncComponent, ref, nextTick } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';

export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import('@/views/fileUpload/List.vue'),
            loadingComponent: SkeletonBox,
        }),
        AddData: defineAsyncComponent({
            loader: () => import('@/views/fileUpload/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const viewSettings = ref({
            viewName: 'ListData',
            title: 'File Upload',
            dataItem: new Object(null),
        });
        const changeView = (paramsObject: { viewName: string; data: any }) => {
            isChangeViewLoading.value = true;
            setTimeout(async () => {
                switch (paramsObject.viewName) {
                    case 'ListData':
                        viewSettings.value = {
                            viewName: 'ListData',
                            title: 'File Upload',
                            dataItem: new Object(null),
                        };
                        break;
                    case 'AddData':
                        viewSettings.value = {
                            viewName: 'AddData',
                            title: 'Thêm mới File Upload',
                            dataItem: new Object(null),
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
