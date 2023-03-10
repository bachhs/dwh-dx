import { ref, onMounted, nextTick } from 'vue';
import { mapState } from 'pinia';
import { fileUploadApi } from '@/api/fileUploadApi';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute, useRouter } from 'vue-router';
import usePaginationList from '@/scripts/_baseScripts/_usePaginationList';
import { organizationApi } from '@/api/organizationApi';
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup() {
        const moduleName = 'File Upload';
        const filterDataInfo = ref({
            organization_id: '',
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
        } = usePaginationList(fileUploadApi.dataItemList, filterDataInfo);

        const groupElements: { id: any; organization: any; files: any }[] = [];

        const deleteItem = (item: any) => {
            deleteElement(
                fileUploadApi.deleteItem(item.id),
                moduleName,
                item.name
            );
        };

        const getDownloadUrl = (item: any) => {
            return `${import.meta.env.VITE_API_URL}/organization/${
                item.organization.id
            }/file/${item.file_name}`;
        };

        const getGroup = async () => {
            const or = await organizationApi.organizationListAll();
            const organizations = or.data;

            for (const organization of organizations) {
                const r = await fileUploadApi.listByOrganization(
                    organization.id
                );

                const files = r.data;

                if (files.length > 0) {
                    groupElements.push({
                        id: organization.id,
                        organization,
                        files,
                    });
                }
            }
        };

        const route = useRoute();
        const router = useRouter();
        onMounted(async () => {
            // if (route.query.organization) {
            //     const organizationId: any = route.query.organization || '';
            //     if (organizationId && organizationId !== '') {
            //         filterData.value.organization_id = parseInt(organizationId);
            //         const query = Object.assign({}, route.query);
            //         delete query.color;
            //         router.replace({ query: {} });
            //     }
            // }
            // getListData(1);
            await getGroup();
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
            getDownloadUrl,
            groupElements,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, ['organization']),
    },
};
