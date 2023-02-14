import { ref, onMounted, defineAsyncComponent, computed } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { dataSourceApi } from '@/api/dataSourceApi';
import { getDataSourceMetaData } from '@/helpers/dataSourceHelper';
import SkeletonBox from '@/components/SkeletonBox.vue';
const appState = useDataCategoryStore();
const INDENTITY_TAB = 1;
const CONNECTION_TAB = 2;
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {
        IdentityStep1: defineAsyncComponent({
            loader: () =>
                import('@/views/dataSourceGroup/dataSource/editComponents/IdentityStep1.vue'),
            loadingComponent: SkeletonBox,
        }),
        DataSourceTypeDBStep2: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/dataSourceGroup/dataSource/editComponents/DataSourceTypeDBStep2.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
        DataSourceTypeFileStep2: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/dataSourceGroup/dataSource/editComponents/DataSourceTypeFileStep2.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
        DataSourceTypeAPIStep2: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/dataSourceGroup/dataSource/editComponents/DataSourceTypeAPIStep2.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
        ConfigDatabaseStep3: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/dataSourceGroup/dataSource/editComponents/ConfigDatabaseStep3.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
        SummaryInfoStep4: defineAsyncComponent({
            loader: () =>
                import(
                    '@/views/dataSourceGroup/dataSource/editComponents/SummaryInfoStep4.vue'
                ),
            loadingComponent: SkeletonBox,
        }),
    },
    setup(props: any) {
        const identityStep1Ref = ref<InstanceType<any>>();
        const identityStep3Ref = ref<InstanceType<any>>();

        const isLoading = ref(false); 
        const dataSourceItem = props.viewSettings.dataItem;
        const itemModel = ref({
            nameOfDS: dataSourceItem.name,
            descOfDS:
                dataSourceItem.metaData && dataSourceItem.metaData.description
                    ? dataSourceItem.metaData.description
                    : '',
            organizationSelected: dataSourceItem.organization.id,
            organizationName: dataSourceItem.organization.name,
            typeOfDataIn: dataSourceItem.type,
            databaseEngineSelected: dataSourceItem.dialect,
            fileTypeSelected: 'xlsx',
            apiMethod: 'GET',
            apiUrl: '',
            host: dataSourceItem.host,
            port: dataSourceItem.port,
            username: dataSourceItem.username,
            password: dataSourceItem.password,
            dbName: dataSourceItem.database,
        }); 

        const isTestDatabaseOk = ref<boolean>(false);
        const TestDatabase = () =>{      
            if (!identityStep3Ref.value || !identityStep3Ref.value) return;
            isLoading.value = true;
            identityStep3Ref.value?.submitData().then((isVaild) => {
                console.log(isVaild);
                let requestData:any = {
                    dialect: itemModel.value.databaseEngineSelected,
                    host: itemModel.value.host,
                    port: itemModel.value.port,
                    username: itemModel.value.username,
                    password: itemModel.value.password,
                    database: itemModel.value.dbName,
                };
                testConnection(requestData).then(({ isSucceed, msg }) => {
                    isTestDatabaseOk.value = isSucceed;
                    if(isSucceed){                        
                        ElMessage({
                            message: 'Kiểm tra kết nối đến database thành công',
                            type: 'success',
                        });
                        isLoading.value = false;
                    }
                    else{
                        ElMessage({
                            message: msg,
                            type: 'warning',
                        });
                        isLoading.value = false;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    isTestDatabaseOk.value = false;
                    ElMessage({
                        message: 'Kiểm tra kết nối đến database không thành công. ' + error.message,
                        type: 'warning',
                    });
                    isLoading.value = false;
                });
            })
            .catch((error) => {
                console.error(error);
            });      
        };

        const isAllowedNext = computed(() => {
            return isTestDatabaseOk.value;
        });

        const isShowTestConnectionBtn = computed(() => {
            return !isTestDatabaseOk.value;;
        });

        const updateDatasource = () => {
            isLoading.value = true;
            try {
                const data = {
                    name: itemModel.value.nameOfDS,
                    description: itemModel.value.descOfDS,
                    type: itemModel.value.typeOfDataIn,
                    host: itemModel.value.host,
                    port: itemModel.value.port,
                    dialect: itemModel.value.databaseEngineSelected,
                    database: itemModel.value.dbName,
                    username: itemModel.value.username,
                    password: itemModel.value.password,
                };
                dataSourceApi
                    .updateDataSource(dataSourceItem.id, data)
                    .then((response: any) => {
                        if (response.data.code === 20000) {
                            ElMessage({
                                message: 'Cập nhật nguồn dữ liệu thành công',
                                type: 'success',
                            });
                        } else {
                            ElMessage.error(`Oops, ${response.data.message}`);
                        }
                        isLoading.value = false;
                    })
                    .catch((error) => {
                        console.error(error);
                        isLoading.value = false;
                    });
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        };

        const submitTab = (tabIndex: number) => {
            switch (tabIndex) {
                case INDENTITY_TAB:
                    if (!identityStep1Ref.value || !identityStep1Ref.value)
                        return;
                    identityStep1Ref.value?.submitData();
                    break;
                case CONNECTION_TAB:
                    if (!identityStep3Ref.value || !identityStep3Ref.value)
                        return;
                    identityStep3Ref.value?.submitData().then((isVaild) => {
                        console.log(isVaild);
                        if(isVaild) { updateDatasource(); }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                    break;
                default:
                    break;
            }
        };
        onMounted(() => {
            if (
                props.viewSettings &&
                props.viewSettings.viewName === 'ModifyData' &&
                props.viewSettings.dataItem != null
            ) {
                //let dataSourceItem = props.viewSettings.dataItem;
                getDataSourceMetaData(dataSourceItem.name).then(
                    (metaData: any) => {
                        dataSourceItem.metaData = metaData;
                        itemModel.value = {
                            nameOfDS: dataSourceItem.name,
                            descOfDS:
                                dataSourceItem.metaData &&
                                dataSourceItem.metaData.description
                                    ? dataSourceItem.metaData.description
                                    : '',
                            organizationSelected:
                                dataSourceItem.organization.id,
                            organizationName: dataSourceItem.organization.name,
                            typeOfDataIn: dataSourceItem.type,
                            databaseEngineSelected: dataSourceItem.dialect,
                            fileTypeSelected: 'xlsx',
                            apiMethod: 'GET',
                            apiUrl: '',
                            host: dataSourceItem.host,
                            port: dataSourceItem.port,
                            username: dataSourceItem.username,
                            password: dataSourceItem.password,
                            dbName: dataSourceItem.database,
                        };
                    }
                );
            }
        });
        return {
            isLoading, 
            identityStep1Ref,
            identityStep3Ref,
            itemModel,
            submitTab,
            isTestDatabaseOk,
            TestDatabase,
            updateDatasource,
        };
    },
    computed: {
        ...mapState(useDataCategoryStore, [
            'organization',
            'databaseEngineOptions',
            'fileTypeDataSourceOptions',
        ]),
    },
};
