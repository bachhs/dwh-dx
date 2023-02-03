import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import { fileEmbedLinkApi } from "@/api/fileEmbedLinkApi";
import { useDataCategoryStore } from "@/stores/dataCategory";
import { useRoute, useRouter } from "vue-router";
import usePaginationList from "@/scripts/_baseScripts/_usePaginationList";
export default {
    props: ["viewSettings"],
    emits: ["onChangeView"],
    setup() {
        const moduleName = "File Embed Link";
        const filterDataInfo = ref({
            organization_id: "",
        });
        const {
            isLoading,
            lastDataLoading,
            listElements,
            filterData,
            filterDataDebounceFn,
            getListData,
            refreshDataFn,
            filterDataFn,
            deleteElement,
        } = usePaginationList(fileEmbedLinkApi.dataItemList, filterDataInfo);

        const deleteItem = (item: any) => {
            deleteElement(
                fileEmbedLinkApi.deleteItem(item.id),
                moduleName,
                item.id
            );
        };

        const route = useRoute();
        const router = useRouter();
        onMounted(() => {
            if (route.query.organization) {
                const organizationId: any = route.query.organization || "";
                if (organizationId && organizationId !== "") {
                    filterData.value.organization_id = parseInt(organizationId);
                    const query = Object.assign({}, route.query);
                    delete query.color;
                    router.replace({ query: {} });
                }
            }
            getListData(1);
        });
        return {
            isLoading,
            listElements,
            lastDataLoading,
            filterData,
            getListData,
            filterDataFn,
            refreshDataFn,
            filterDataDebounceFn,
            deleteItem,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            "organization",
        ]),
    },
};
