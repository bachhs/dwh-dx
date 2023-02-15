import { ref, onMounted } from 'vue';
import { mapState } from 'pinia';
import { apiSourceApi } from '@/api/apiSourceApi';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute, useRouter } from 'vue-router';
import usePaginationList from '@/scripts/_baseScripts/_usePaginationList';
import { ElMessage, ElMessageBox } from 'element-plus';
import { organizationApi } from '@/api/organizationApi';
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup() {
        const moduleName = 'API Data source';
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
        } = usePaginationList(apiSourceApi.dataItemList, filterDataInfo);

        const groupElements: { id: any; organization: any; apisources: any }[] =
            [];

        const deleteItem = (item: any) => {
            // deleteElement(
            //     fileEmbedLinkApi.deleteItem(item.id),
            //     moduleName,
            //     item.id
            // );
            const showErrorMsg = (msg: string) => {
                ElMessage({
                    dangerouslyUseHTMLString: true,
                    type: 'info',
                    message: `Đã có lỗi xảy ra khi xoá ${moduleName} <strong class="text-primary">${item.id}</strong>. ${msg}`,
                });
            };
            ElMessageBox.confirm(
                `Đồng ý sẽ xoá ${moduleName} <strong class="text-primary">${item.name}</strong>. Tiếp tục?`,
                'Xác nhận xoá',
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: 'Đồng ý xoá',
                    cancelButtonText: 'Không xoá',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        dangerouslyUseHTMLString: true,
                        type: 'info',
                        message: `Đã có lỗi xảy ra khi xoá ${moduleName} <strong class="text-primary">${item.name}</strong>. api source đã được sử dụng nên không thể xoá`,
                    });
                })
                .catch(() => {
                    ElMessage({
                        dangerouslyUseHTMLString: true,
                        type: 'info',
                        message: `Đã huỷ bỏ lệnh xoá ${moduleName} <strong class="text-primary">${item.name}</strong>`,
                    });
                });
        };

        const openEmbedLink = (itemData: any) => {
            window.open(`/file-embed-link-upload/${itemData.embedded_id}`);
        };

        const getGroup = async () => {
            const or = await organizationApi.organizationListAll();
            const organizations = or.data;

            for (const organization of organizations) {
                const r = await apiSourceApi.listByOrganization(
                    organization.id
                );

                const apisources = r.data;

                if (apisources.length > 0) {
                    groupElements.push({
                        id: organization.id,
                        organization,
                        apisources,
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
            openEmbedLink,
            groupElements,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, ['organization']),
    },
};
