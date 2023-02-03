import { ref, onMounted, defineAsyncComponent } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { fileUploadApi } from '@/api/fileUploadApi';
import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector';
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
        const uploadProgress = ref(0);

        const isLoading = ref(false);
        const currentOrganizationName = ref('');
        const itemModel = ref({
            organizationId: 0,
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

        const addItemSubmit = () => {
            isLoading.value = true;
            try {
                const formData = new FormData();
                    formData.append('file', files.value[0]);
                    fileUploadApi.uploadFileData(itemModel.value.organizationId, formData, controllerUpload, onProgressUpload).then((response: any) => {
                        console.log('uploadFileData response', response);
                        isLoading.value = false;
                        if(response.data){
                            switch(response.data.status){
                                case 200:		
                                case 400:						
                                    ElMessage({
                                        message: 'Đã tải lên file thành công !',
                                        type: 'success',
                                    });
                                    removeFile();
                                    break;
                            }
                        }
                    })
                    .catch((response:any) =>{
                        console.error('uploadFileData ERROR_1', response);
                        if(response.status && response.status === 400){
                            
                        }
                        else{
                            ElMessage.error('Tải file lên không thành công. Đã có lỗi xảy ra !');
                        }
                    });
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        };

        onMounted(() => {
            if (props.viewSettings) {
                const orgId =  appState.defaultOrganization.id;
                const orgName =  appState.defaultOrganization.name;
                currentOrganizationName.value = orgName;
                itemModel.value = {
                    organizationId: orgId,
                };
            }
        });
        return {
            isLoading,
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
