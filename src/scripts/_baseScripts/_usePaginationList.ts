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
        let filterDataRequest =  (filterData !== null) ? filterData.value : {};
        let objectRequest = {
            page: pageNumber,
            size: pagination.size,
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
        if(filterData !== null) filterData.value = {};
        getListData(1);
    };

    const deleteElement = (deleteFnPromise:Promise<any>, moduleName:string, itemName:string) =>{
        let showErrorMsg =(msg:string) =>{
            ElMessage({
                dangerouslyUseHTMLString: true,
                type: 'info',
                message: `???? c?? l???i x???y ra khi xo?? ${moduleName} <strong class="text-primary">${itemName}</strong>. ${msg}`,
            })
        };
        ElMessageBox.confirm(
            `?????ng ?? s??? xo?? ${moduleName} <strong class="text-primary">${itemName}</strong>. Ti???p t???c?`, 'X??c nh???n xo??', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '?????ng ?? xo??',
                cancelButtonText: 'Kh??ng xo??',
                type: 'warning',
            }
        )
        .then(() => {
            deleteFnPromise.then((response:any) =>{		
                //if(response.data.code === 20000){
                    ElMessage({
                        dangerouslyUseHTMLString: true,
                        type: 'success',
                        message: `???? xo?? ${moduleName} <strong class="text-primary">${itemName}</strong>`,
                    });	
                    console.log(response.data.message);
                    filterDataFn();
                //}
                //else{
                //    showErrorMsg(response.data.message);
                //}
            }).catch(error =>{
                showErrorMsg("UNKNOW ERROR");
                console.error(error);
            });
        })
        .catch(() => {
            ElMessage({
                dangerouslyUseHTMLString: true,
                type: 'info',
                message: `???? hu??? b??? l???nh xo?? ${moduleName} <strong class="text-primary">${itemName}</strong>`,
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