import { defineAsyncComponent, onMounted, ref, nextTick } from 'vue';
import SkeletonBox from "@/components/SkeletonBox.vue";
import SetDescriptionModal from '@/components/modals/SetDescriptionModal.vue';
import type { AddTagCategoryRequest, AddTagRequest, ListTagResponse, TagCategory, Tag } from '@/types/tag';
import { tagApi } from "@/api/tagApi";
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
    components: {
        SetDescriptionModal,
        TagInfoEdit: defineAsyncComponent({
            loader: () => import("@/views/tag/TagInfoEdit.vue"),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {

        const isLoadingTagCategory = ref(false);
        const isLoadingTagChild = ref(false);
        const isLoadingSubmit = ref(false);

        const centerDialogVisible = ref(false);
        const centerDialogChildVisible = ref(false);

        const tagSelected = ref<any>();
        const tagItemData = ref<ListTagResponse>();
        const getTagList = (isSetSelection:Boolean = true) => {
            return new Promise<void>((resolve, reject) =>{
                isLoadingTagCategory.value = true;
                tagApi.tagList().then((response:any) =>{
                    tagItemData.value = response.data;
                    if(isSetSelection){
                        if(tagItemData.value && tagItemData.value.data && tagItemData.value.data.length > 0) {
                            tagSelected.value = tagItemData.value.data[0];
                        }
                    }
                    isLoadingTagCategory.value = false;
                    return resolve();
                }).catch((error) =>{
                    isLoadingTagCategory.value = false;
                    console.error(error);
                    reject();
                });
            });
        };

        //TagCategory 
        const addTagCategory = (formData:any) =>{
            isLoadingTagCategory.value = true;
            isLoadingSubmit.value = true;
            const requestData:AddTagCategoryRequest = {
                name: formData.name,
                description: formData.description,
                categoryType: formData.category
            };
            tagApi.createTagCategory(requestData).then((response:any) =>{
                isLoadingSubmit.value = false;
                centerDialogVisible.value = false;
                getTagList(false).then(()=>{});
                ElMessage({
                    message: `Thêm mới danh mục Tag ${formData.name} thành công !`,
                    type: 'success',
                });
            }).catch((error) =>{
                isLoadingSubmit.value = false;
                console.error(error);
            });
        };

        const updateTagCategory = (descriptionHTML:string) => {
            isLoadingTagChild.value = true;
            const requestData:AddTagCategoryRequest = {
                name: tagSelected.value.name,
                description: descriptionHTML,
                categoryType: tagSelected.value.categoryType
            };
            tagApi.updateTagCategory(tagSelected.value.name, requestData).then((response:any) =>{
                isLoadingTagChild.value = false;
                tagSelected.value.description = descriptionHTML;
                ElMessage({
                    message: `Cập nhật mô tả danh mục Tag ${tagSelected.value.name} thành công !`,
                    type: 'success',
                });
            }).catch((error) =>{
                isLoadingTagChild.value = false;
                console.error(error);
            });
        };

        const deleteTagCategory = () =>{
            ElMessageBox.confirm(
                `Xoá danh mục Tag ${tagSelected.value.name}. Điều này sẽ gỡ bỏ tag ${tagSelected.value.name} đã gắn trên các mục dữ liệu liên quan. Tiếp tục ?`,
                'Xác nhận xoá', {
                  confirmButtonText: 'Đồng ý',
                  cancelButtonText: 'Huỷ bỏ',
                  type: 'warning',
                }
            ).then(() => {
                isLoadingTagCategory.value = true;
                isLoadingTagChild.value = true;
                tagApi.deleteTagCategory(tagSelected.value.id).then((response:any) =>{
                    isLoadingTagChild.value = false;
                    getTagList().then(()=>{});
                    ElMessage({
                        message: `Xoá danh mục Tag ${tagSelected.value.name} thành công !`,
                        type: 'success',
                    });
                }).catch((error) =>{
                    isLoadingTagChild.value = false;
                    console.error(error);
                });
            }).catch(() => { })
            
        }

        //TagItem
        const addTagItem = (formData:any) =>{
            isLoadingTagChild.value = true;
            isLoadingSubmit.value = true;
            const requestData:AddTagRequest = {
                name: formData.name,
                description: formData.description
            };
            tagApi.createTag(tagSelected.value.name, requestData).then((response:any) =>{
                centerDialogChildVisible.value = false;
                isLoadingSubmit.value = false;
                isLoadingTagChild.value = false;
                getTagList(false).then(() =>{
                    if(tagItemData && tagItemData.value && tagItemData.value.data){
                        let tagItemFound:any = tagItemData.value.data.find((xItem:TagCategory) => xItem.id === tagSelected.value.id);
                        console.log('tagItemFound.children', tagItemFound.children);
                        if(tagItemFound && tagItemFound !== null) {
                            tagSelected.value.children = tagItemFound.children;
                            console.log('tagSelected.children', tagSelected.value.children);
                        }
                    }
                });
            }).catch((error) =>{
                isLoadingSubmit.value = false;
                isLoadingTagChild.value = false;
                console.error(error);
            });
        };

        const updateTagItem = (tagItemTarget:any, descriptionHTML:string) => {
            isLoadingTagChild.value = true;
            const requestData:AddTagRequest = {
                name: tagItemTarget.name,
                description: descriptionHTML
            };
            tagApi.updateTag(tagSelected.value.name, tagItemTarget.name, requestData).then((response:any) =>{
                isLoadingTagChild.value = false;
                tagItemTarget.description = descriptionHTML;
                ElMessage({
                    message: `Cập nhật mô tả danh mục Tag ${tagItemTarget.name} thành công !`,
                    type: 'success',
                });
            }).catch((error) =>{
                isLoadingTagChild.value = false;
                console.error(error);
            });
        };

        const deleteTagItem = (tagItemTarget:any) =>{
            ElMessageBox.confirm(
                `Xoá Tag ${tagItemTarget.name}. Điều này sẽ gỡ bỏ tag ${tagItemTarget.name} đã gắn trên các mục dữ liệu liên quan. Tiếp tục ?`,
                'Xác nhận xoá', {
                  confirmButtonText: 'Đồng ý',
                  cancelButtonText: 'Huỷ bỏ',
                  type: 'warning',
                }
            ).then(() => {
                isLoadingTagChild.value = true;
                tagApi.deleteTag(tagSelected.value.name, tagItemTarget.id).then((response:any) =>{
                    isLoadingTagChild.value = false;
                    let tagItemIndexFound:number = tagSelected.value.children.findIndex((xItem:Tag) => xItem.id === tagItemTarget.id);
                    if(tagItemIndexFound !== -1){
                        tagSelected.value.children.splice(tagItemIndexFound, 1);
                    }
                    ElMessage({
                        message: `Xoá Tag ${tagItemTarget.name} thành công !`,
                        type: 'success',
                    });
                }).catch((error) =>{
                    isLoadingTagChild.value = false;
                    console.error(error);
                });
            }).catch(() => { });            
        }

        const refreshTagData = () => {
            getTagList(false).then(()=>{});            
        };

        const addTagCategoryModalRef = ref<any>();
        const openAddTagCategoryModal = () => {
            centerDialogVisible.value = true;
            nextTick(() => {
                addTagCategoryModalRef?.value.resetForm();
                addTagCategoryModalRef?.value.loadTagCategoryType();
            });
        };

        const addTagChildModalRef = ref<any>();
        const openAddTagChildModal = () => {
            centerDialogChildVisible.value = true;
            nextTick(() => {
                addTagChildModalRef?.value.resetForm();
            });
        };

        onMounted(() =>{
            getTagList().then(()=>{});
        });
        return {
            isLoadingTagCategory,
            isLoadingTagChild,
            centerDialogVisible,
            centerDialogChildVisible,
            addTagCategoryModalRef,
            openAddTagCategoryModal,
            addTagChildModalRef,
            openAddTagChildModal,
            tagSelected,
            tagItemData,
            refreshTagData,
            isLoadingSubmit,
            addTagCategory,
            updateTagCategory,
            deleteTagCategory,
            addTagItem,
            updateTagItem,
            deleteTagItem,
        };
    },
};
