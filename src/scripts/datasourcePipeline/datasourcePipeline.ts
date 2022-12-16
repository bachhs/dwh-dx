import { defineAsyncComponent, ref, nextTick, reactive } from 'vue'
import SkeletonBox from "@/components/SkeletonBox.vue";
export default {
    components: {
        ListData: defineAsyncComponent({
            loader: () => import("@/views/datasourcePipeline/datasourcePipeline/List.vue"),
            loadingComponent: SkeletonBox
        }),
        AddModifyData: defineAsyncComponent({
            loader: () => import("@/views/datasourcePipeline/datasourcePipeline/AddModify.vue"),
            loadingComponent: SkeletonBox
        }),
    },
    setup() {
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const viewSettings = ref({
            viewName: "ListData",
            title: "Tổng hợp dữ liệu",
            dataItem: new Object(null),
        }); 
        const changeView = (paramsObject:{ viewName:string, data:any }) => {
            isChangeViewLoading.value = true;
            // nextTick().then(async () =>{
            //     currentComponent.value = viewName;
            //     await nextTick();
            //     isChangeViewLoading.value = false;
            // });
            setTimeout(async () =>{
                switch(paramsObject.viewName){
                    case "ListData":
                        viewSettings.value = {
                            viewName: "ListData",
                            title : "Tổng hợp dữ liệu",
                            dataItem : new Object(null),
                        };
                        currentComponent.value = "ListData";
                        break;
                    case "AddData":
                        viewSettings.value = {
                            viewName: "AddData",
                            title : "Thêm mới luồng",
                            dataItem : new Object({}),
                        };
                        currentComponent.value = "AddModifyData";
                        break;
                    case "ModifyData":
                        viewSettings.value = {
                            viewName: "ModifyData",
                            title : "Chỉnh sửa luồng",
                            dataItem : paramsObject.data,
                        };
                        currentComponent.value = "AddModifyData";
                        break;
                }
                await nextTick();
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
}