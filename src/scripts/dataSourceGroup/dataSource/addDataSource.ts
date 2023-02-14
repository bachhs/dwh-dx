import { ref, onMounted, reactive, defineAsyncComponent, computed } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { dataSourceApi } from '@/api/dataSourceApi';
import SkeletonBox from '@/components/SkeletonBox.vue';
import { testConnection } from '@/helpers/dataSourceHelper';
const appState = useDataCategoryStore();
const INDENTITY_STEP = 0;
const CONNECTION_STEP = 1;
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
    setup(props: any, context: any) {
        const identityStep1Ref = ref<InstanceType<any>>();
        const identityStep3Ref = ref<InstanceType<any>>();

        const isLoading = ref(false);
        const stepWizard = ref(INDENTITY_STEP);
        const totalStepWizard = 2;
        const itemModel = ref({
            nameOfDS: '',
            descOfDS: '',
            organizationSelected: appState.defaultOrganization.id,
            organizationName: appState.defaultOrganization.name,
            typeOfDataIn: 'database',
            databaseEngineSelected: 'postgresql',
            fileTypeSelected: 'xlsx',
            apiMethod: 'GET',
            apiUrl: '',
            host: '',
            port: 5432,
            username: '',
            password: '',
            dbName: '',
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
            if(stepWizard.value === CONNECTION_STEP){
                return isTestDatabaseOk.value;
            }
            else{
                stepWizard.value < totalStepWizard.value;
            }
        });

        const isShowTestConnectionBtn = computed(() => {
            if(stepWizard.value === CONNECTION_STEP){
                return !isTestDatabaseOk.value;
            }
            else return false;
        });

        const submitStep = (stepIndex: number) => {
            switch (stepIndex) {
                case INDENTITY_STEP:
                    if (!identityStep1Ref.value || !identityStep1Ref.value)
                        return;
                    identityStep1Ref.value?.submitData();
                    break;
                case CONNECTION_STEP:
                    if (!identityStep3Ref.value || !identityStep3Ref.value) return;
                    identityStep3Ref.value?.submitData().then((isVaild) => {
                        console.log(isVaild);
                        if (isVaild) stepWizard.value = stepWizard.value + 1;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                    break;
                default:
                    stepWizard.value = stepWizard.value + 1;
                    break;
            }
        };

        const addDatasource = () => {
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
                    .addDatasource(itemModel.value.organizationSelected, data)
                    .then((response: any) => {
                        if (response.data.code === 20000) {
                            ElMessage({
                                message: 'Thêm mới nguồn dữ liệu thành công',
                                type: 'success',
                            });
                            context.emit('onChangeView', {
                                viewName: 'ListData',
                                data: null,
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

        onMounted(() => {
            if (props.viewSettings) {
                const dataSourceItem = props.viewSettings.dataItem;
                const orgId = dataSourceItem.organization && dataSourceItem.organization.id ? dataSourceItem.organization.id : appState.defaultOrganization.id;
                const orgName = dataSourceItem.organization && dataSourceItem.organization.name ? dataSourceItem.organization.name : appState.defaultOrganization.name;
                itemModel.value = {
                    nameOfDS: '',
                    descOfDS: '',
                    organizationSelected: orgId,
                    organizationName: orgName,
                    typeOfDataIn: 'database',
                    databaseEngineSelected: 'postgresql',
                    fileTypeSelected: 'csv',
                    apiMethod: 'GET',
                    apiUrl: '',
                    host: '',
                    port: 5432,
                    username: '',
                    password: '',
                    dbName: '',
                };
            }
        });
        return {
            isLoading,
            stepWizard,
            totalStepWizard,
            identityStep1Ref,
            identityStep3Ref,
            itemModel,
            isTestDatabaseOk,
            TestDatabase,
            isAllowedNext,
            isShowTestConnectionBtn,
            submitStep,
            addDatasource,
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
