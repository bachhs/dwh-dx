import { ref } from "vue";
import debounce from 'lodash/debounce';
import moment from 'moment';
import { ElMessage, ElMessageBox } from 'element-plus'; 

const usePaginationList = (getListDataFn:Function, filterData:any) => {
    const isLoading = ref(false);
    const lastDataLoading = ref("");
    const listElements = ref({ 
        data: [],  
        pagination: { 
            page: 1, 
            size: 15,
            totalElements: 0, 
            totalPages: 1 
        } 
    });
    //const filterData = ref({});
    const updateLoadTime = () =>{ 
        lastDataLoading.value = moment().local().format('DD-MM-YYYY HH:mm:ss')
    };
    const getListData = (pageNumber:number = 1) => {
        isLoading.value = true;
        listElements.value.data = [];
        let pagination:any = listElements.value.pagination;
        let filterDataRequest = filterData.value;
        let objectRequest = {
            ...pagination,
            ...filterDataRequest,
        };
        getListDataFn(objectRequest).then((response:any) =>{
            listElements.value.pagination = {
                page : pageNumber,					
                size : response.data.size,
                totalElements: response.data.totalElements,
                totalPages: response.data.totalPages
            };
            listElements.value.data = response.data.content;
            isLoading.value = false;
            updateLoadTime();
        }).catch(() =>{
            isLoading.value = false;
        });
        $('span.line-clamp-1').css('color', 'red');
    };
    const filterDataFn = () =>{
        getListData(1);
    };
    const filterDataDebounceFn:Function = debounce(filterDataFn, 1000, { 'maxWait': 5000 });
    const refreshDataFn = () =>{
        filterData.value = {};
        getListData(1);
    };

    const deleteElement = (deleteFnPromise:Promise<any>, moduleName:string, itemName:string) =>{
        let showErrorMsg =(msg:string) =>{
            ElMessage({
                dangerouslyUseHTMLString: true,
                type: 'info',
                message: `Đã có lỗi xảy ra khi xoá ${moduleName} <strong class="text-primary">${itemName}</strong>. ${msg}`,
            })
        };
        ElMessageBox.confirm(
            `Đồng ý sẽ xoá ${moduleName} <strong class="text-primary">${itemName}</strong>. Tiếp tục?`, 'Xác nhận xoá', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: 'Đồng ý xoá',
                cancelButtonText: 'Không xoá',
                type: 'warning',
            }
        )
        .then(() => {
            deleteFnPromise.then((response:any) =>{		
                if(response.data.code === 20000){
                    ElMessage({
                        dangerouslyUseHTMLString: true,
                        type: 'success',
                        message: `Đã xoá ${moduleName} <strong class="text-primary">${itemName}</strong>`,
                    });	
                    console.log(response.data.message);
                    filterDataFn();
                }
                else{
                    showErrorMsg(response.data.message);
                }
            }).catch(error =>{
                showErrorMsg("UNKNOW ERROR");
                console.error(error);
            });
        })
        .catch(() => {
            ElMessage({
                dangerouslyUseHTMLString: true,
                type: 'info',
                message: `Đã huỷ bỏ lệnh xoá ${moduleName} <strong class="text-primary">${itemName}</strong>`,
            })
        })
    };

    return {
        isLoading,
        lastDataLoading,
        listElements,
        filterData,
        updateLoadTime,
        getListData,
        filterDataDebounceFn,
        filterDataFn,
        refreshDataFn,
        deleteElement,
    };
}

export default usePaginationList;