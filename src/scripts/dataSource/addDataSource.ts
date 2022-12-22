import { ref, onMounted, reactive } from 'vue';
import { mapState } from 'pinia';
import { useDataCategoryStore } from '@/stores/dataCategory';
import type { FormInstance, FormRules } from 'element-plus';
import { FileSelector, Dropzone, DialogButton } from 'vue3-file-selector';
import { dataSourceApi } from '@/api/dataSourceApi';
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
    emits: ['onChangeView'],
    components: {
        FileSelector,
        Dropzone,
        DialogButton,
    },
    setup(props: any) {
        const isLoading = ref(false);
        const stepWizard = ref(1);
        const totalStepWizard = 4;
        const itemModel = ref({
            nameOfDS: '',
            descOfDS: '',
            organizationSelected: appState.defaultOrganization,
            typeOfDataIn: 'database',
            databaseEngineSelected: 'postgresql',
            fileTypeSelected: 'csv',
            apiMethod: 'GET',
            apiUrl: '',
        });

        const ruleFormStep1Ref = ref<FormInstance>();
        const rules = {
            step1: reactive<FormRules>({
                nameOfDS: [
                    {
                        required: true,
                        message: 'Vui lòng không bỏ trống..',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        message: 'Nhập tối thiểu 3 ký tự..',
                        trigger: 'blur',
                    },
                ],
                descOfDS: [
                    {
                        required: true,
                        message: 'Vui lòng không bỏ trống..',
                        trigger: 'blur',
                    },
                    {
                        min: 3,
                        message: 'Nhập tối thiểu 3 ký tự..',
                        trigger: 'blur',
                    },
                ],
            }),
        };

        const controllerUpload = new AbortController();
        const fileSelectorRef = ref<any>(null);
        const files = ref([]);

        const submitForm = {
            submitStep1: async (formElStep1: FormInstance | undefined) => {
                if (!formElStep1) return;
                await formElStep1.validate((valid, fields) => {
                    if (valid) {
                        stepWizard.value = stepWizard.value + 1;
                    } else {
                        console.log('error submit!', fields);
                    }
                });
            },
        };
        const submitStep = (stepIndex: number) => {
            switch (stepIndex) {
                case 1:
                    submitForm.submitStep1(ruleFormStep1Ref.value);
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
            if (
                props.viewSettings &&
                props.viewSettings.viewName === 'ModifyData' &&
                props.viewSettings.dataItem != null
            ) {
                itemModel.value = {
                    nameOfDS: props.viewSettings.dataItem.name,
                    descOfDS: props.viewSettings.dataItem.name,
                    organizationSelected: appState.defaultOrganization,
                    typeOfDataIn: 'database',
                    databaseEngineSelected: 'postgresql',
                    fileTypeSelected: 'csv',
                    apiMethod: 'GET',
                    apiUrl: '',
                };
            }
        });
        return {
            isLoading,
            stepWizard,
            totalStepWizard,
            itemModel,
            ruleFormStep1Ref,
            rules,
            controllerUpload: controllerUpload,
            files,
            fileSelectorRef,
            fileTypeAccept: [
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-excel',
            ],
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
