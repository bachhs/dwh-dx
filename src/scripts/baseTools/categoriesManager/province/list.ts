import { ref, onMounted } from "vue"; 
import { provinceApi } from "@/api/baseTools/provinceApi"; 
import { useRoute, useRouter } from "vue-router";
import usePaginationList from "@/scripts/_baseScripts/_usePaginationList";
import { ElMessage, ElMessageBox } from 'element-plus';
const route = useRoute();
const router = useRouter(); 
export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup() {
        const moduleName = "File Embed Link";
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
        } = usePaginationList(provinceApi.getItems, null);

        const deleteItem = (item: any) => { 
            let showErrorMsg =(msg:string) =>{
                ElMessage({
                    dangerouslyUseHTMLString: true,
                    type: 'info',
                    message: `Đã có lỗi xảy ra khi xoá ${moduleName} <strong class="text-primary">${item.id}</strong>. ${msg}`,
                })
            };
            ElMessageBox.confirm(
                `Đồng ý sẽ xoá ${moduleName} <strong class="text-primary">${item.id}</strong>. Tiếp tục?`, 'Xác nhận xoá', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'Đồng ý xoá',
                    cancelButtonText: 'Không xoá',
                    type: 'warning',
                }
            )
            .then(() => {
                ElMessage({
                    dangerouslyUseHTMLString: true,
                    type: 'info',
                    message: `Đã có lỗi xảy ra khi xoá ${moduleName} <strong class="text-primary">${item.id}</strong>. embedded link đã được sử dụng nên không thể xoá`,
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
