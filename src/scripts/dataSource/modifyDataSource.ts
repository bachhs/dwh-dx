import { ref, onMounted, defineAsyncComponent } from 'vue';
import { mapState } from 'pinia';
import { ElMessage } from 'element-plus';
import { useDataCategoryStore } from '@/stores/dataCategory';
import { dataSourceApi } from '@/api/dataSourceApi';
import SkeletonBox from "@/components/SkeletonBox.vue";
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {
        IdentityStep1: defineAsyncComponent({
            loader: () => import("@/views/dataSource/editComponents/IdentityStep1.vue"),
            loadingComponent: SkeletonBox,
        }),
        DataSourceTypeDBStep2: defineAsyncComponent({
            loader: () => import("@/views/dataSource/editComponents/DataSourceTypeDBStep2.vue"),
            loadingComponent: SkeletonBox,
        }),
        DataSourceTypeFileStep2: defineAsyncComponent({
            loader: () => import("@/views/dataSource/editComponents/DataSourceTypeFileStep2.vue"),
            loadingComponent: SkeletonBox,
        }),
        DataSourceTypeAPIStep2: defineAsyncComponent({
            loader: () => import("@/views/dataSource/editComponents/DataSourceTypeAPIStep2.vue"),
            loadingComponent: SkeletonBox,
        }),
        ConfigDatabaseStep3: defineAsyncComponent({
            loader: () => import("@/views/dataSource/editComponents/ConfigDatabaseStep3.vue"),
            loadingComponent: SkeletonBox,
        }),
        SummaryInfoStep4: defineAsyncComponent({
            loader: () => import("@/views/dataSource/editComponents/SummaryInfoStep4.vue"),
            loadingComponent: SkeletonBox,
        }),
    },
	setup(props: any) {
        const isLoading = ref(false);
        const stepWizard = ref(1);
        const totalStepWizard = 4;
        const dataSourceItem = props.viewSettings.dataItem;
        const itemModel = ref({
            nameOfDS: dataSourceItem.name,
            descOfDS: dataSourceItem.name,
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
                dataSourceApi.updateDataSource(dataSourceItem.id, data)
                .then((response:any) =>{
                    if(response.data.code === 20000){
                        ElMessage({
                            message: response.data.message,
                            type: 'success',
                        });
                    }
                    else{
                        ElMessage.error(`Oops, ${response.data.message}`)
                    }
                    isLoading.value = false;
                })
                .catch(error => {
                    console.error(error);
                    isLoading.value = false;
                });
            } catch (err) {
                console.log(err);
                isLoading.value = false;
            }
        }; 
 
        const identityStep1Ref = ref<InstanceType<any>>(); 
        const submitTab = (tabIndex: number) => {
            switch (tabIndex) {
                case 1:
                    console.log('identityStep1Ref', identityStep1Ref.value);
                    if (!identityStep1Ref || !identityStep1Ref.value) return;
                    identityStep1Ref.value?.submitData();
                    break;
                case 2:
                    break;
                default:
                    break;
            }
        };
        onMounted(() => {
            if ( props.viewSettings && props.viewSettings.viewName === 'ModifyData' && props.viewSettings.dataItem != null ) {
                //let dataSourceItem = props.viewSettings.dataItem;
                itemModel.value = {
                    nameOfDS: dataSourceItem.name,
                    descOfDS: dataSourceItem.name,
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
                };
            }
        });
        return {
            isLoading,
            stepWizard,
            totalStepWizard,
            identityStep1Ref,
            itemModel,
            submitTab,
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