import { ref } from "vue";
export default {
    components: {},
    setup() {
        const tagSelected = ref<number>(1);

        return {
            tagSelected
        }
    },
};
