import { onMounted, ref } from 'vue';
import SetDescriptionModal from '@/components/modals/SetDescriptionModal.vue';
import type { AddTagCategoryRequest, AddTagRequest, ListTagResponse, } from '@/types/tag';
import { tagApi } from "@/api/tagApi";
export default {
    components: {
        SetDescriptionModal,
    },
    setup() {
        const tagSelected = ref<any>();
        const tagItemData = ref<ListTagResponse>();
        const getTagList = () => {
            tagApi.tagList().then((response:any) =>{
                tagItemData.value = response.data;
                if(tagItemData.value.data && tagItemData.value.data.length > 0) tagSelected.value = tagItemData.value.data[0];
            });
        }
        onMounted(() =>{
            getTagList();
        });
        return {
            tagSelected,
            tagItemData,
        };
    },
};
