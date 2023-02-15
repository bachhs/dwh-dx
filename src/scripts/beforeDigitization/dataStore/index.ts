import { ref, onMounted, nextTick } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from "@/stores/dataCategory";
import { useRoute, useRouter } from "vue-router";
import usePaginationList from "@/scripts/_baseScripts/_usePaginationList";
const dataCategoryState = useDataCategoryStore(); 
const databaseEnginesMap = dataCategoryState.databaseEnginesMap;
export default{
    setup(){

    },    
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization"
        ]),
    },
}