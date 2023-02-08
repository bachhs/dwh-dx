import { ref, onMounted,reactive, defineAsyncComponent, nextTick } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import SkeletonBox from '@/components/SkeletonBox.vue';
import { restfulMethods } from "@/helpers/constants";
import { useDataCategoryStore } from '@/stores/dataCategory';
import { apiSourceApi } from '@/api/apiSourceApi';
import type { FormInstance, FormRules } from 'element-plus';
import moment from 'moment';
const appState = useDataCategoryStore();

export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {        
        KeyValueEdit: defineAsyncComponent({
            loader: () => import('@/views/dataSourceGroup/apiSource/KeyValueEdit.vue'),
            loadingComponent: SkeletonBox,
        }),
    },
    setup(props: any, context: any) {
        const isLoading = ref(true);
        const currentOrganizationName = ref('');
        
        var isEditMode = false;
        const bodyContentType = ref<string>("none");
        const fileBinarySelected = ref<File>();
        const itemModel = ref({
            id: 0,
            organizationId: 0,
            name: "",
            description: "",
            url: "",
            method: "GET",
            params: "",
            headers: "",
            body: ""
        }); 
        
        const activeTabName = ref('params');
        const refParamsEdit = ref<any>();
        const refHeadersEdit = ref<any>();
        const refBodyEdit = ref<any>();
        const queryParams = ref<any>([]);
        const queryHeaders = ref<any>([]);
        const queryBody = ref<any>([]);
        const ruleFormApiRef = ref<FormInstance>();
        const rules = reactive<FormRules>({
            name: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
            description: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
            method: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
            url: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
        }); 

        const onOrganizationChanged = (item:any)=>{
            currentOrganizationName.value = item.name;
        };

        const createNewItem = (organizationId:number, data:any) => {
            apiSourceApi
                .addItem(organizationId, data)
                .then((response: any) => {
                    if (response.data) {
                        ElMessage({
                            message: 'Thêm mới API Data source thành công',
                            type: 'success',
                        });
                        context.emit('onChangeView', {
                            viewName: 'ListData',
                            data: null,
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
        }

        const modifyItem = (itemId:number, data:any) => {
            apiSourceApi
                .updateItem(itemId, data)
                .then((response: any) => {
                    if (response.data) {
                        ElMessage({
                            message: 'Cập nhật API Data source thành công',
                            type: 'success',
                        });
                        context.emit('onChangeView', {
                            viewName: 'ListData',
                            data: null,
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
        };

        const submitItemSubmit = async () => {
            if (!ruleFormApiRef || !ruleFormApiRef.value) return;
            await ruleFormApiRef.value.validate((valid, fields) => {
                if (valid) {
                    if (refParamsEdit && refParamsEdit.value) refParamsEdit.value.submitData();
                    if (refHeadersEdit && refHeadersEdit.value) refHeadersEdit.value.submitData();
                    if (refBodyEdit && refBodyEdit.value) refBodyEdit.value.submitData();            
                    nextTick(() => {
                        console.log('queryParams', queryParams.value);
                        console.log('queryHeaders', queryHeaders.value);
                        console.log('queryBody', queryBody.value);
                        isLoading.value = true;
                        try {
                            const organizationId = itemModel.value.organizationId;
                            itemModel.value.params = JSON.stringify(queryParams.value);
                            itemModel.value.headers = JSON.stringify(queryHeaders.value);
                            itemModel.value.body = JSON.stringify(queryBody.value);
                            const data = {
                                name: itemModel.value.name,
                                description: itemModel.value.description,
                                url: itemModel.value.url,
                                method: itemModel.value.method,
                                params: itemModel.value.params,
                                headers: itemModel.value.headers,
                                body: itemModel.value.body
                            };
                            if(!isEditMode) createNewItem(organizationId, data);
                            else modifyItem(itemModel.value.id, data);
    
                        } catch (err) {
                            console.log(err);
                            isLoading.value = false;
                        }                        
                    });
                } else {
                    console.log('error submit!', fields);
                }
            });
            
            
        }; 

        onMounted(() => {
            if (props.viewSettings) {
                if(props.viewSettings.dataItem === null){
                    isEditMode = false;
                    currentOrganizationName.value = appState.defaultOrganization.name;
                    itemModel.value = {
                        id: 0,
                        organizationId: appState.defaultOrganization.id,
                        name: "",
                        description: "",
                        url: "",
                        method: "GET",
                        params: "",
                        headers: "",
                        body: ""
                    };
                }
                else{
                    isEditMode = true;
                    let apiSourceItem = props.viewSettings.dataItem;
                    currentOrganizationName.value = apiSourceItem.organization.name;
                    if(apiSourceItem.params && apiSourceItem.params !== null) {
                        queryParams.value = JSON.parse(apiSourceItem.params);
                        //console.log('queryParams', apiSourceItem.params);
                    }
                    if(apiSourceItem.body && apiSourceItem.body !== null) {
                        queryBody.value = JSON.parse(apiSourceItem.body);
                        //console.log('queryBody', apiSourceItem.body);
                    }
                    if(apiSourceItem.headers && apiSourceItem.headers !== null) {
                        queryHeaders.value = JSON.parse(apiSourceItem.headers);
                        //console.log('queryHeaders', apiSourceItem.headers);
                    }
                    itemModel.value = {
                        id: apiSourceItem.id,
                        organizationId: apiSourceItem.organization.id,
                        name: apiSourceItem.name,
                        description: apiSourceItem.description,
                        url: apiSourceItem.url,
                        method: apiSourceItem.method.toUpperCase(),
                        params: "",
                        headers: apiSourceItem.headers,
                        body: apiSourceItem.body
                    };
                }
            }
            nextTick(() =>{
                isLoading.value = false;
            });
        });
        return {
            isLoading,
            currentOrganizationName,
            itemModel,
            submitItemSubmit,
            onOrganizationChanged,
            moment,
            refParamsEdit,
            refHeadersEdit,
            refBodyEdit,
            activeTabName,
            restfulMethods,
            ruleFormApiRef,
            rules,
            bodyContentType,
            fileBinarySelected,
            queryParams,
            queryHeaders,
            queryBody,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
