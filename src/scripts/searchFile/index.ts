import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from "@/stores/dataCategory";
import { Search } from '@element-plus/icons-vue';
export default {
    setup(props:any, context:any) {        
        return {
            Search
        }
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization",
        ]),
    },
}