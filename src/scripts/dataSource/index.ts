import { defineAsyncComponent, ref, nextTick } from 'vue'
import SkeletonBox from "@/components/SkeletonBox.vue";

export default {
	components: {
        ListData: defineAsyncComponent({
            loader: () => import("@/views/dataSource/List.vue"),
            loadingComponent: SkeletonBox
        }),
        AddModifyData: defineAsyncComponent({
            loader: () => import("@/views/dataSource/AddModifyDataSource.vue"),
            loadingComponent: SkeletonBox
        }),
        ViewDetail:  defineAsyncComponent({
            loader: () => import("@/views/dataSource/ViewDetail.vue"),
            loadingComponent: SkeletonBox
        }),
    },
    setup(){
        const isChangeViewLoading = ref(false);
        const currentComponent = ref('ListData');
        const viewSettings = ref({
            viewName: "ListData",
            title: "Nguồn dữ liệu",
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
                            title : "Nguồn dữ liệu",
                            dataItem : new Object(null),
                        };
                        currentComponent.value = "ListData";
                        break;
                    case "AddData":
                        viewSettings.value = {
                            viewName: "AddData",
                            title : "Thêm mới nguồn dữ liệu",
                            dataItem : new Object({}),
                        };
                        currentComponent.value = "AddModifyData";
                        break;
                    case "ModifyData":
                        viewSettings.value = {
                            viewName: "ModifyData",
                            title : "Chỉnh sửa nguồn dữ liệu",
                            dataItem : paramsObject.data,
                        };
                        currentComponent.value = "AddModifyData";
                        break;
                    case "ViewDetail":
                        viewSettings.value = {
                            viewName: "ViewDetail",
                            title : "Chi tiết nguồn dữ liệu",
                            dataItem : paramsObject.data,
                        };
                        currentComponent.value = "ViewDetail";
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
    }
};
