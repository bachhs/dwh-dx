import { ref } from "vue";
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";
export default {
    components: {
        SetDescriptionModal
    },
    setup() {
        const tagSelected = ref<number>(1);

        return {
            tagSelected
        }
    },
};
