import { datasourcePipelineApi } from '@/api/datasourcePipelineApi';
import SkeletonBox from '@/components/SkeletonBox.vue';
import { defineAsyncComponent, nextTick, onMounted, ref } from 'vue';
import type { ListPipelineResponse } from './type';
export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/datasourcePipeline/datasourcePipeline/List.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
        AddModifyData: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/datasourcePipeline/datasourcePipeline/AddModify.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const pipelineResponse = ref<ListPipelineResponse>();
        const viewSettings = ref({
            viewName: 'ListData',
            title: 'Tiến trình thu thập dữ liệu',
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
                            title: 'Tiến trình thu thập dữ liệu',
                            dataItem: new Object(null),
                        };
                        currentComponent.value = 'ListData';
                        break;
                    case 'AddData':
                        viewSettings.value = {
                            viewName: 'AddData',
                            title: 'Thêm tiến trình thu thập dữ liệu',
                            dataItem: new Object({}),
                        };
                        currentComponent.value = 'AddModifyData';
                        break;
                    case 'ModifyData':
                        viewSettings.value = {
                            viewName: 'ModifyData',
                            title: 'Chỉnh sửa tiến trình thu thập dữ liệu',
                            dataItem: paramsObject.data,
                        };
                        currentComponent.value = 'AddModifyData';
                        break;
                }
                await nextTick();
                isChangeViewLoading.value = false;
            }, 100);
        };

        const fetchMetaPipelines = async () => {
            try {
                const res = await datasourcePipelineApi.getMetaPipelines();

                pipelineResponse.value = res.data;

                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        onMounted(() => {
            fetchMetaPipelines();
        });

        return {
            isChangeViewLoading,
            currentComponent,
            viewSettings,
            changeView,
            fetchMetaPipelines,
            pipelineResponse,
        };
    },
};
