import { defineAsyncComponent, reactive } from "vue";
import SkeletonBox from '@/components/SkeletonBox.vue';
export default {
  components: {    
    Navigation: defineAsyncComponent({
        loader: () => import('@/views/search-engine/components/Navigation.vue'),
        loadingComponent: SkeletonBox,
    }), 
    IndexView: defineAsyncComponent({
        loader: () => import('@/views/search-engine/components/IndexView.vue'),
        loadingComponent: SkeletonBox,
    }),
  },
  setup() {
    const data = reactive({
      test: 1,
    });
    return data;
  },
};
