import { ref } from "vue";
import debounce from 'lodash/debounce';
import moment from 'moment';
import { ElMessage, ElMessageBox } from 'element-plus'; 

const useGroupList = (getGroupFn:Function, requestProp:string, getListDataFn:Function, filterData:any) => {
    const isLoading = ref(false);
    const lastDataLoading = ref("");
    const listElements = ref<any>([]);
    //const filterData = ref({});
    const updateLoadTime = () =>{ 
        lastDataLoading.value = moment().local().format('DD-MM-YYYY HH:mm:ss')
    };
    const getListData = () => {
        isLoading.value = true;
        listElements.value = [];
        let filterDataRequest = filterData.value;        
        getGroupFn().then((response:any) => {
            console.log('getGroupFn', response);
            response.data.forEach((groupItem:any) => {
                getListDataFn(groupItem[requestProp]).then((dataResult:any) =>{
                    if (dataResult.data.length > 0) {
                        listElements.value.push({
                            id: groupItem[requestProp],
                            groupItem: groupItem,
                            dataItems: dataResult.data,
                        });
                    }
                    listElements.value.data = response.data.content;
                    isLoading.value = false;
                    updateLoadTime();
                }).catch((error:any) =>{ 
                    isLoading.value = false;
                    console.error(error);
                });   
            });
        }).catch((error:any) =>{ 
            isLoading.value = false;
            console.error(error);
        });        
        $('span.line-clamp-1').css('color', 'red');
    };
    const filterDataFn = () =>{
        getListData();
    };
    const filterDataDebounceFn:Function = debounce(filterDataFn, 1000, { 'maxWait': 5000 });
    const refreshDataFn = () =>{
        filterData.value = {};
        getListData();
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
                ElMessage({
                    dangerouslyUseHTMLString: true,
                    type: 'success',
                    message: `Đã xoá ${moduleName} <strong class="text-primary">${itemName}</strong>`,
                });	
                console.log(response.data.message);
                filterDataFn();
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

export default useGroupList;