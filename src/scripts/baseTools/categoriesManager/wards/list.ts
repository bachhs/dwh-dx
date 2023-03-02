import { ref, onMounted } from "vue"; 
import { wardApi } from "@/api/baseTools/wardApi"; 
import { useRoute, useRouter } from "vue-router";
import usePaginationList from "@/scripts/_baseScripts/_usePaginationList";
import { ElMessage, ElMessageBox } from 'element-plus';
const route = useRoute();
const router = useRouter(); 
export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup() {
        const moduleName = "Tỉnh/Thành phố";
        const {
            isLoading,
            lastDataLoading,
            listElements,
            filterData,
            filterDataDebounceFn,
            getListData,
            refreshDataFn,
            filterDataFn,
            deleteElement,
        } = usePaginationList(wardApi.getItems, {});

        const deleteItem = (item: any) => {  
            ElMessageBox.confirm(
                `Đồng ý sẽ xoá ${moduleName} <strong class="text-primary">${item.name}</strong>. Tiếp tục?`, 'Xác nhận xoá', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'Đồng ý xoá',
                    cancelButtonText: 'Không xoá',
                    type: 'warning',
                }
            )
            .then(() => {
                isLoading.value = true;
                wardApi.deleteItem(item.id)
                    .then((response: any) => {
                        if (response.data) {
                            ElMessage({
                                message: 'Thao tác thực hiện thành công',
                                type: 'success',
                            }); 
                        } else {
                            ElMessage.error(`Oops, ${response.data.message}`);
                        }
                        isLoading.value = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        isLoading.value = false;
                    });
            })
            .catch(() => {
                ElMessage({
                    dangerouslyUseHTMLString: true,
                    type: 'info',
                    message: `Đã huỷ bỏ lệnh xoá ${moduleName} <strong class="text-primary">${item.id}</strong>`,
                })
            });
        }; 
        onMounted(() => { 
            getListData(1);
        });
        return { 
            isLoading,
            listElements,
            lastDataLoading,
            filterData,
            getListData,
            filterDataFn,
            refreshDataFn,
            filterDataDebounceFn,
            deleteItem,
        };
    }, 
};
