import { ref, onMounted, reactive, defineAsyncComponent } from 'vue';
import { mapState } from 'pinia';
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
            host: "",
            port: 5432,
            username: "",
            password: "",
            dbName: "",
        });

        const identityStep1Ref = ref<InstanceType<any>>(); 
        const submitStep = (stepIndex: number) => {
            switch (stepIndex) {
                case 1:
                    console.log('identityStep1Ref', identityStep1Ref.value);
                    if (!identityStep1Ref || !identityStep1Ref.value) return;
                    identityStep1Ref.value?.submitData();
                    break;
                case 2:
                    stepWizard.value = stepWizard.value + 1;
                    break;
                default:
                    stepWizard.value = stepWizard.value + 1;
                    break;
            }
        };

        const addDatasource = () => {
            try {
                const data = {
                    name: itemModel.value.nameOfDS,
                    description: itemModel.value.descOfDS,
                    type: 'database',
                    host: '14.225.11.178',
                    port: 5432,
                    dialect: 'postgresql',
                    database: 'covid_report',
                    username: 'minhdao',
                    password: '1a2s3d4f',
                };

                dataSourceApi.addDataSource(1, data);
            } catch (err) {
                console.log(err);
            }
        };

        onMounted(() => {
            if ( props.viewSettings && props.viewSettings.viewName === 'ModifyData' && props.viewSettings.dataItem != null) {
                itemModel.value = {
                    nameOfDS: props.viewSettings.dataItem.name,
                    descOfDS: props.viewSettings.dataItem.name,
                    organizationSelected: appState.defaultOrganization.id,
                    organizationName: appState.defaultOrganization.name,
                    typeOfDataIn: 'database',
                    databaseEngineSelected: 'postgresql',
                    fileTypeSelected: 'csv',
                    apiMethod: 'GET',
                    apiUrl: '',
                    host: "",
                    port: 5432,
                    username: "",
                    password: "",
                    dbName: "",
                };
            }
        });
        return {
            isLoading,
            stepWizard,
            totalStepWizard,
            identityStep1Ref,
            itemModel,
            // controllerUpload: controllerUpload,
            // files,
            // fileSelectorRef,
            // fileTypeAccept: [
            //     'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            //     'application/vnd.ms-excel',
            // ],
            submitStep,
            addDatasource,
            //humanFileSize,
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
