import { defineAsyncComponent, onMounted, ref, nextTick } from 'vue';
import SkeletonBox from '@/components/SkeletonBox.vue';
import SetDescriptionModal from '@/components/modals/SetDescriptionModal.vue';
import type {
    AddTagCategoryRequest,
    AddTagRequest,
    ListTagResponse,
    TagCategory,
    Tag,
} from '@/types/tag';
import { tagApi } from '@/api/tagApi';
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
    components: {
        SetDescriptionModal,
        TagInfoEdit: defineAsyncComponent({
            loader: () => import('@/views/tag/TagInfoEdit.vue'),
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
        const getTagList = (isSetSelection: Boolean = true) => {
            return new Promise<void>((resolve, reject) => {
                isLoadingTagCategory.value = true;
                tagApi
                    .tagList()
                    .then((response: any) => {
                        tagItemData.value = response.data;
                        if (isSetSelection) {
                            if (
                                tagItemData.value &&
                                tagItemData.value.data &&
                                tagItemData.value.data.length > 0
                            ) {
                                tagSelected.value = tagItemData.value.data[0];
                            }
                        }
                        isLoadingTagCategory.value = false;
                        return resolve();
                    })
                    .catch((error) => {
                        isLoadingTagCategory.value = false;
                        console.error(error);
                        reject();
                    });
            });
        };

        const getTagCategoryInfo = () => {
            isLoadingTagChild.value = true;
            const tabCategoryName = tagSelected.value.name;
            tagApi
                .getTagCategoryInfo(tabCategoryName)
                .then((response: any) => {
                    isLoadingTagChild.value = false;
                    tagSelected.value = response.data;
                })
                .catch((error) => {
                    isLoadingTagChild.value = false;
                    console.error(error);
                });
        };

        //TagCategory
        const addTagCategory = (formData: any) => {
            isLoadingTagCategory.value = true;
            isLoadingSubmit.value = true;
            const requestData: AddTagCategoryRequest = {
                name: formData.name,
                description: formData.description,
                categoryType: formData.category,
            };
            tagApi
                .createTagCategory(requestData)
                .then((response: any) => {
                    isLoadingSubmit.value = false;
                    centerDialogVisible.value = false;
                    getTagList(false).then(() => {});
                    ElMessage({
                        message: `Th??m m???i danh m???c Tag ${formData.name} th??nh c??ng !`,
                        type: 'success',
                    });
                })
                .catch((error) => {
                    isLoadingSubmit.value = false;
                    console.error(error);
                });
        };

        const updateTagCategory = (descriptionHTML: string) => {
            isLoadingTagChild.value = true;
            const requestData: AddTagCategoryRequest = {
                name: tagSelected.value.name,
                description: descriptionHTML,
                categoryType: tagSelected.value.categoryType,
            };
            tagApi
                .updateTagCategory(tagSelected.value.name, requestData)
                .then((response: any) => {
                    isLoadingTagChild.value = false;
                    tagSelected.value.description = descriptionHTML;
                    ElMessage({
                        message: `C???p nh???t m?? t??? danh m???c Tag ${tagSelected.value.name} th??nh c??ng !`,
                        type: 'success',
                    });
                })
                .catch((error) => {
                    isLoadingTagChild.value = false;
                    console.error(error);
                });
        };

        const deleteTagCategory = () => {
            ElMessageBox.confirm(
                `Xo?? danh m???c Tag ${tagSelected.value.name}. ??i???u n??y s??? g??? b??? tag ${tagSelected.value.name} ???? g???n tr??n c??c m???c d??? li???u li??n quan. Ti???p t???c ?`,
                'X??c nh???n xo??',
                {
                    confirmButtonText: '?????ng ??',
                    cancelButtonText: 'Hu??? b???',
                    type: 'warning',
                }
            )
                .then(() => {
                    isLoadingTagCategory.value = true;
                    isLoadingTagChild.value = true;
                    tagApi
                        .deleteTagCategory(tagSelected.value.id)
                        .then((response: any) => {
                            isLoadingTagChild.value = false;
                            getTagList().then(() => {});
                            ElMessage({
                                message: `Xo?? danh m???c Tag ${tagSelected.value.name} th??nh c??ng !`,
                                type: 'success',
                            });
                        })
                        .catch((error) => {
                            isLoadingTagChild.value = false;
                            console.error(error);
                        });
                })
                .catch(() => {});
        };

        //TagItem
        const addTagItem = (formData: any) => {
            isLoadingTagChild.value = true;
            isLoadingSubmit.value = true;
            const requestData: AddTagRequest = {
                name: formData.name,
                description: formData.description,
            };
            tagApi
                .createTag(tagSelected.value.name, requestData)
                .then((response: any) => {
                    centerDialogChildVisible.value = false;
                    isLoadingSubmit.value = false;
                    isLoadingTagChild.value = false;
                    getTagList(false).then(() => {
                        if (
                            tagItemData.value &&
                            tagItemData.value &&
                            tagItemData.value.data
                        ) {
                            const tagItemFound: any =
                                tagItemData.value.data.find(
                                    (xItem: TagCategory) =>
                                        xItem.id === tagSelected.value.id
                                );
                            console.log(
                                'tagItemFound.children',
                                tagItemFound.children
                            );
                            if (tagItemFound && tagItemFound !== null) {
                                tagSelected.value.children =
                                    tagItemFound.children;
                                console.log(
                                    'tagSelected.children',
                                    tagSelected.value.children
                                );
                            }
                        }
                    });
                })
                .catch((error) => {
                    isLoadingSubmit.value = false;
                    isLoadingTagChild.value = false;
                    console.error(error);
                });
        };

        const updateTagItem = (tagItemTarget: any, descriptionHTML: string) => {
            isLoadingTagChild.value = true;
            const requestData: AddTagRequest = {
                name: tagItemTarget.name,
                description: descriptionHTML,
            };
            tagApi
                .updateTag(
                    tagSelected.value.name,
                    tagItemTarget.name,
                    requestData
                )
                .then((response: any) => {
                    isLoadingTagChild.value = false;
                    tagItemTarget.description = descriptionHTML;
                    ElMessage({
                        message: `C???p nh???t m?? t??? danh m???c Tag ${tagItemTarget.name} th??nh c??ng !`,
                        type: 'success',
                    });
                })
                .catch((error) => {
                    isLoadingTagChild.value = false;
                    console.error(error);
                });
        };

        const deleteTagItem = (tagItemTarget: any) => {
            ElMessageBox.confirm(
                `Xo?? Tag ${tagItemTarget.name}. ??i???u n??y s??? g??? b??? tag ${tagItemTarget.name} ???? g???n tr??n c??c m???c d??? li???u li??n quan. Ti???p t???c ?`,
                'X??c nh???n xo??',
                {
                    confirmButtonText: '?????ng ??',
                    cancelButtonText: 'Hu??? b???',
                    type: 'warning',
                }
            )
                .then(() => {
                    isLoadingTagChild.value = true;
                    tagApi
                        .deleteTag(tagSelected.value.name, tagItemTarget.id)
                        .then((response: any) => {
                            isLoadingTagChild.value = false;
                            const tagItemIndexFound: number =
                                tagSelected.value.children.findIndex(
                                    (xItem: Tag) =>
                                        xItem.id === tagItemTarget.id
                                );
                            if (tagItemIndexFound !== -1) {
                                tagSelected.value.children.splice(
                                    tagItemIndexFound,
                                    1
                                );
                            }
                            ElMessage({
                                message: `Xo?? Tag ${tagItemTarget.name} th??nh c??ng !`,
                                type: 'success',
                            });
                        })
                        .catch((error) => {
                            isLoadingTagChild.value = false;
                            console.error(error);
                        });
                })
                .catch(() => {});
        };

        const refreshTagData = () => {
            getTagList(false).then(() => {});
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

        onMounted(() => {
            getTagList().then(() => {});
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
            getTagCategoryInfo,
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
