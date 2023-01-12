import { defineAsyncComponent, onMounted, ref } from 'vue';
import SkeletonBox from "@/components/SkeletonBox.vue";
import SetDescriptionModal from '@/components/modals/SetDescriptionModal.vue';
import type { AddTagCategoryRequest, AddTagRequest, ListTagResponse, } from '@/types/tag';
import { tagApi } from "@/api/tagApi";
export default {
    components: {
        SetDescriptionModal,
        TagInfoEdit: defineAsyncComponent({
            loader: () =>
                import("@/views/tag/TagInfoEdit.vue"),
            loadingComponent: SkeletonBox,
        }),
    },
    setup() {
        const centerDialogVisible = ref(false);
        const centerDialogChildVisible = ref(false);
        const tagSelected = ref<any>();
        const tagItemData = ref<ListTagResponse>();
        const getTagList = (isSetSelection:Boolean = true) => {
            tagApi.tagList().then((response:any) =>{
                tagItemData.value = response.data;
                if(isSetSelection){
                    if(tagItemData.value && tagItemData.value.data && tagItemData.value.data.length > 0) {
                        tagSelected.value = tagItemData.value.data[0];
                    }
                }
            });
        }

        const refreshTagData = () => {
            getTagList(false);            
        };

        onMounted(() =>{
            getTagList();
        });
        return {
            centerDialogVisible,
            centerDialogChildVisible,
            tagSelected,
            tagItemData,
            refreshTagData,
        };
    },
};
