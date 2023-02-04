import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { fileEmbedLinkApi } from '@/api/fileEmbedLinkApi';
import { fileUploadApi } from '@/api/fileUploadApi';
import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector';
import { humanFileSize } from "@/helpers/ultilityFunctions";
const appState = useDataCategoryStore();
export default {
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
        const currentEmbedLinkInfo = ref<any>(null);
        const itemModel = ref({
            organizationId: appState.defaultOrganization.id,
            embedLinkId: null,
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

        const getEmbedLinkInfo = (embedLinkId:string) => {
            isLoading.value = true;
            fileEmbedLinkApi.getItemContent(embedLinkId)
                .then((response: any) => {
                    console.log('getEmbedLinkInfo', response);
                    if (response.status === 200 && response.data) {
                        currentEmbedLinkInfo.value = response.data;
                        currentOrganizationName.value = response.data.organization.name;
                        itemModel.value.organizationId = response.data.organization.id;
                        itemModel.value.embedLinkId = response.data.embedded_id;
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

        const addItemSubmit = () => {
            isLoading.value = true;
            isUploadProgress.value = true;
            try {
                const formData = new FormData();
                    formData.append('file', files.value[0]);
                    let requestParams:any = { 
                        organization_id : itemModel.value.organizationId,
                        embedded_id: itemModel.value.embedLinkId,
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
        };

        const route:any = useRoute();

        onMounted(() => {
            getEmbedLinkInfo(route.params.id);
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
            files,
            currentOrganizationName,
            currentEmbedLinkInfo,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
        ]),
    },
};
