import { ref, onMounted, nextTick } from 'vue';
import { mapState } from 'pinia';
import { dataSourceApi } from '@/api/dataSourceApi';
import { organizationApi } from '@/api/organizationApi';
import { getDataSourceMetaData } from '@/helpers/dataSourceHelper';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute, useRouter } from 'vue-router';
import usePaginationList from '@/scripts/_baseScripts/_usePaginationList';
const dataCategoryState = useDataCategoryStore();
const databaseEnginesMap = dataCategoryState.databaseEnginesMap;
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    setup() {
        const moduleName = 'Nguồn dữ liệu';
        const filterDataSource = ref({
            organization_id: '',
            dialect: '',
            name: '',
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
        } = usePaginationList(dataSourceApi.dataSourceList, filterDataSource);

        const groupElements: {
            id: any;
            organization: any;
            datasources: any;
        }[] = [];

        const onChangeWaitpoint = (ds: any, waypointState: any) => {
            if (waypointState.going === 'IN') {
                getDataSourceMetaData(ds.name).then((metaData: any) => {
                    ds.metaData = metaData;
                });
            }
        };

        const deleteDataSource = (item: any) => {
            deleteElement(
                dataSourceApi.deleteDataSource(item.id),
                moduleName,
                item.name
            );
        };

        const getDbEngineIcon = (ds: any, key: string) => {
            try {
                if (key && databaseEnginesMap[key]) {
                    ds.dialectIcon = databaseEnginesMap[key].value.iconName;
                    return databaseEnginesMap[key].value.iconName;
                }
            } catch (error) {
                console.error(error);
            }
            console.log('getDbEngineIcon', key);
            setTimeout(() => {
                if (key && databaseEnginesMap[key]) {
                    ds.dialectIcon = databaseEnginesMap[key].value.iconName;
                }
            }, 1000);
            return 'exclaimationquestionmark.svg';
        };

        const getGroupDatasources = async () => {
            const or = await organizationApi.organizationListAll();
            const organizations = or.data;

            for (const organization of organizations) {
                const dr = await dataSourceApi.listDatasourceByOrganization(
                    organization.id
                );

                const datasources = dr.data;

                if (datasources.length > 0) {
                    groupElements.push({
                        id: organization.id,
                        organization,
                        datasources,
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
            await getGroupDatasources();
        });
        return {
            isLoading,
            listElements,
            lastDataLoading,
            filterData,
            getListData,
            getDbEngineIcon,
            filterDataFn,
            refreshDataFn,
            filterDataDebounceFn,
            onChangeWaitpoint,
            deleteDataSource,
            groupElements,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
            'databaseEngineOptions',
            'databaseEnginesMap',
        ]),
    },
};
