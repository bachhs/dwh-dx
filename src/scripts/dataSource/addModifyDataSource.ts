import { ref, onMounted, reactive } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';
import type { FormInstance, FormRules } from 'element-plus';
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup(props:any) { 
		const isLoading = ref(false);
		const stepWizard = ref(1);
		const totalStepWizard = 4;
		const itemModel = ref({
			nameOfDS: "",
			descOfDS: "",
			organizationSelected: appState.defaultOrganization,
			typeOfDataIn: "database",
			databaseEngineSelected: 'postgresql',
			fileTypeSelected: 'csv',
		});

		const ruleFormStep1Ref = ref<FormInstance>();
		const rules = {
			step1: reactive<FormRules>({
				nameOfDS: [
					{ required: true, message: 'Vui lòng không bỏ trống..', trigger: 'blur' },
					{ min: 3, message: 'Nhập tối thiểu 3 ký tự..', trigger: 'blur' },
				],
				descOfDS: [
					{ required: true, message: 'Vui lòng không bỏ trống..', trigger: 'blur' },
					{ min: 3, message: 'Nhập tối thiểu 3 ký tự..', trigger: 'blur' },
				],
			})
		}
		const submitForm = {
			submitStep1 : async (formElStep1: FormInstance | undefined) => {
				if (!formElStep1) return
				await formElStep1.validate((valid, fields) => {
					if (valid) {
						stepWizard.value = stepWizard.value + 1;
					} else {
						console.log('error submit!', fields)
					}
				})
			},
		}
		const submitStep =(stepIndex:number) =>{
			switch(stepIndex){
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
		onMounted(() =>{
			if(props.viewSettings && props.viewSettings.viewName === "ModifyData" && props.viewSettings.dataItem != null){
				itemModel.value = {
					nameOfDS: props.viewSettings.dataItem.name,
					descOfDS: props.viewSettings.dataItem.name,
					organizationSelected: appState.defaultOrganization,
					typeOfDataIn: "database",
					databaseEngineSelected: 'postgresql',
					fileTypeSelected: 'csv',
				}
			}
		});
		return { 
			isLoading,
			stepWizard,
			totalStepWizard,
			itemModel,
			ruleFormStep1Ref, 
			rules,
			submitStep,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions', 'fileTypeDataSourceOptions']),
	},
};