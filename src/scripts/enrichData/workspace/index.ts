import { ref, defineAsyncComponent } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';
export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import('@/views/enrichData/workspace/List.vue'),
            loadingComponent: SkeletonBox,
        }),
        AddData: defineAsyncComponent({
            loader: () => import('@/views/enrichData/workspace/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
        ModifyData: defineAsyncComponent({
            loader: () => import('@/views/enrichData/workspace/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
        DataSetList: defineAsyncComponent({
            loader: () => import('@/views/enrichData/workspace/detailWorkspace/DataSetList.vue'),
            loadingComponent: SkeletonBox,
        }),
        DataSetDetail: defineAsyncComponent({
            loader: () => import('@/views/enrichData/workspace/detailWorkspace/DataSetDetail.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const currentView = ref("ListData");
        return {
            currentView,
        };
    },
};
