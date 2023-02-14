import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from "@/stores/dataCategory";
import { useRoute, useRouter } from "vue-router";
import usePaginationList from "@/scripts/_baseScripts/_usePaginationList";
import { ElMessage, ElMessageBox } from 'element-plus';
export default {
    setup() {
        const isLoading = ref(false);
        const route = useRoute();
        const router = useRouter();
        const centerDialogVisible = ref(false)
        onMounted(() => { 

        });
        return {
            isLoading,
            centerDialogVisible,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization",
        ]),
    },
};
