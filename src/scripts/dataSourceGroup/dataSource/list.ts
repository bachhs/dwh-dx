import { ref, onMounted, watch } from 'vue';
import { mapState } from 'pinia';
import { dataSourceApi } from '@/api/dataSourceApi';
import { organizationApi } from '@/api/organizationApi';
import { getDataSourceMetaData } from '@/helpers/dataSourceHelper';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { useRoute, useRouter } from 'vue-router';
//import usePaginationList from '@/scripts/_baseScripts/_usePaginationList';
import useGroupList from '@/scripts/_baseScripts/_useGroupList';
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
            groupIdVisible,
            listElements,
            filterData,
            filterDataDebounceFn,
            getListData,
            refreshDataFn,
            filterDataFn,
            deleteElement,
        } = useGroupList(organizationApi.organizationListAll, "id", dataSourceApi.listDatasourceByOrganization, filterDataSource, [filterDataSource.value.organization_id]);
        //} = usePaginationList(dataSourceApi.dataSourceList, filterDataSource); 
 
        watch(() => filterDataSource.value.organization_id, (newVal) =>{
            console.log('groupIdTargetShow', newVal);
            if(newVal){
                groupIdVisible.value= [newVal];
            }
            else groupIdVisible.value = [];
            getListData();
        });

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
            //getListData(1);
            getListData();
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
