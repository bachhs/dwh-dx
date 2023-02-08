import { ref, onMounted,reactive } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { restfulMethods } from "@/helpers/constants";
import { useDataCategoryStore } from '@/stores/dataCategory';
import { apiSourceApi } from '@/api/apiSourceApi';
import type { FormInstance, FormRules } from 'element-plus';
import moment from 'moment';
const appState = useDataCategoryStore();

export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup(props: any, context: any) {
        const isLoading = ref(false);
        const currentOrganizationName = ref('');
        
        const itemModel = ref({
            organizationId: 0,
            name: "",
            description: "",
            url: "",
            method: "",
            headers: "",
            body: ""
        }); 
        
        const activeTabName = ref('params');
        const queryParams = ref<any>([]);
        const itemModelAddParams = ref<any>({ key: "", value: "", description: "" });
        const ruleFormParamsRef = ref<FormInstance>();
        const rules = reactive<FormRules>({
            key: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
            value: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
            ],
        });
        
        const submitAddParam = async () => {
            if (!ruleFormParamsRef || !ruleFormParamsRef.value) return;
            await ruleFormParamsRef.value.validate((valid, fields) => {
                if (valid) {
                    queryParams.value.push({
                        ...itemModelAddParams.value
                    });
                    itemModelAddParams.value = { key: "", value: "", description: "" };
                } else {
                    console.log('error submit!', fields);
                }
            });
        };

        const onOrganizationChanged = (item:any)=>{
            currentOrganizationName.value = item.name;
        };

        const addItemSubmit = () => {
            isLoading.value = true;
            try {
                const organizationId = itemModel.value.organizationId;
                const data = {
                    name: itemModel.value.name,
                    description: itemModel.value.description,
                    url: itemModel.value.url,
                    method: itemModel.value.method,
                    headers: itemModel.value.headers,
                    body: itemModel.value.body
                };
                apiSourceApi
                    .addItem(organizationId, data)
                    .then((response: any) => {
                        if (response.data) {
                            ElMessage({
                                message: 'Thêm mới nguồn dữ liệu thành công',
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
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        }; 

        onMounted(() => {
            if (props.viewSettings) {
                if(props.viewSettings.dataItem === null){
                    currentOrganizationName.value = appState.defaultOrganization.name;
                    itemModel.value = {
                        organizationId: appState.defaultOrganization.id,
                        name: "",
                        description: "",
                        url: "",
                        method: "",
                        headers: "",
                        body: ""
                    };
                }
                else{
                    let fileEmbedItem = props.viewSettings.dataItem;
                    currentOrganizationName.value = fileEmbedItem.organization.name;
                    itemModel.value = {
                        organizationId: fileEmbedItem.organization.id,
                        name: "",
                        description: "",
                        url: "",
                        method: "",
                        headers: "",
                        body: ""
                    };
                }
            }
        });
        return {
            isLoading,
            currentOrganizationName,
            itemModel,
            addItemSubmit,
            onOrganizationChanged,
            moment,
            activeTabName,
            restfulMethods,
            queryParams,
            itemModelAddParams,
            submitAddParam,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
