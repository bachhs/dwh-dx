import { ref, defineAsyncComponent } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';
export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import('@/views/queryResult/specialized/List.vue'),
            loadingComponent: SkeletonBox,
        }),
        AddData: defineAsyncComponent({
            loader: () => import('@/views/queryResult/specialized/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
        ModifyData: defineAsyncComponent({
            loader: () => import('@/views/queryResult/specialized/Add.vue'),
            loadingComponent: SkeletonBox,
        }),
        DataSetList: defineAsyncComponent({
            loader: () => import('@/views/queryResult/specialized/detail/DataSetList.vue'),
            loadingComponent: SkeletonBox,
        }),
        DataSetDetail: defineAsyncComponent({
            loader: () => import('@/views/queryResult/specialized/detail/DataSetDetail.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const currentView = ref("ListData");
        const ItemSelected = ref<any>(null);
        return {
            currentView,
            ItemSelected,
        };
    },
};
