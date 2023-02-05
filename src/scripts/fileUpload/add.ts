import { ref, onMounted, reactive } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { fileUploadApi } from '@/api/fileUploadApi';
import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector';
import type { FormInstance, FormRules } from 'element-plus';
import { humanFileSize } from "@/helpers/ultilityFunctions";
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
	components: {
		FileSelector,
		Dropzone,
		DialogButton,
	},
    setup(props: any, context: any) {
		var controllerUpload = new AbortController();
        const fileSelectorRef = ref<any>(null);
		const files = ref([]);
        const isUploadProgress = ref(false);
        const uploadProgress = ref(0);

        const isLoading = ref(false);
        const currentOrganizationName = ref('');

        const ruleFormValidationRef = ref<FormInstance>();
        const rules = reactive<FormRules>({
            description: [
                {
                    required: true,
                    message: 'Vui lòng không bỏ trống..',
                    trigger: 'blur',
                },
                {
                    min: 3,
                    message: 'Nhập tối thiểu 3 ký tự..',
                    trigger: 'blur',
                },
            ],
        });

        const itemModel = ref({
            organizationId: appState.defaultOrganization.id,
            description: ''
        }); 

        const onOrganizationChanged = (item:any)=>{
            currentOrganizationName.value = item.name;
        };

        const removeFile = () => {
			try{
				files.value = [];
				if(fileSelectorRef && fileSelectorRef.value && fileSelectorRef.value.inputRef) {
					fileSelectorRef.value.inputRef.value="";
				}
			}
			catch(error){					
				console.error('removeFile ERROR', error);
			}
		};
		const onProgressUpload = (evt:any) =>{
			try{
				uploadProgress.value =  Math.round((((evt.progress)*100 + Number.EPSILON)) * 100) / 100;
			}
			catch(error){					
				console.error('onProgressUpload ERROR', error);
			}
		};
		const cancelUpload = () =>{
			try{
				uploadProgress.value = 0;
				controllerUpload.abort();
				controllerUpload = new AbortController();
				removeFile();
			}
			catch(error){					
				console.error('cancelUpload ERROR', error);
			}
		};

        const addItemSubmit = async () => {
            if (!ruleFormValidationRef || !ruleFormValidationRef.value) return;
            await ruleFormValidationRef.value.validate((valid, fields) => {
                if (valid) {
                    isLoading.value = true;
                    isUploadProgress.value = true;
                    try {
                        const formData = new FormData();
                            formData.append('file', files.value[0]);
                            formData.append('description', itemModel.value.description);
                            let requestParams:any = { 
                                organization_id : itemModel.value.organizationId,
                                description: itemModel.value.description
                            };
                            fileUploadApi.uploadFileData(requestParams, formData, controllerUpload, onProgressUpload).then((response: any) => {
                                isLoading.value = false;
                                isUploadProgress.value = false;
                                if(response){
                                    switch(response.status){
                                        case 200:						
                                            ElMessage({
                                                message: 'Đã tải lên file thành công !',
                                                type: 'success',
                                            });
                                            removeFile();
                                            context.emit('onChangeView', {
                                                viewName: 'ListData',
                                                data: null,
                                            });
                                            break;
                                    }
                                }
                            })
                            .catch((response:any) =>{
                                console.error('uploadFileData ERROR_1', response);
                                ElMessage.error('Tải file lên không thành công. Đã có lỗi xảy ra !');
                            });
                    } catch (err) {
                        console.log(err);
                        isLoading.value = false;
                        isUploadProgress.value = false;
                    }
                } else {
                    console.log('error submit!', fields);
                }
            });
        };

        onMounted(() => {
            if (props.viewSettings) {
                const orgId =  appState.defaultOrganization.id;
                const orgName =  appState.defaultOrganization.name;
                currentOrganizationName.value = orgName;
                itemModel.value = {
                    organizationId: orgId,
                    description: ''
                };
            }
        });
        return {
            isLoading,
            ruleFormValidationRef,
            rules,
            itemModel,
            addItemSubmit,
            onOrganizationChanged,
            humanFileSize,
            removeFile,
            cancelUpload,
            fileSelectorRef,
            files
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
