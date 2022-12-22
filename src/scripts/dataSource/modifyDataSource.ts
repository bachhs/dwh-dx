import { ref, onMounted, reactive, defineAsyncComponent } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';
import type { FormInstance, FormRules } from 'element-plus';
import { FileSelector, Dropzone, DialogButton } from "vue3-file-selector";
import { dataSourceApi } from '@/api/dataSourceApi';
import { humanFileSize } from "@/helpers/ultilityFunctions";
import SkeletonBox from "@/components/SkeletonBox.vue";
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	components: {
		FileSelector,
		Dropzone,
		DialogButton,
	},
	setup(props:any) { 
		const isLoading = ref(false);
		const totalStepWizard = 4;
		const itemModel = ref({
			nameOfDS: "",
			descOfDS: "",
			organizationSelected: appState.defaultOrganization,
			typeOfDataIn: "database",
			databaseEngineSelected: 'postgresql',
			fileTypeSelected: 'csv',
			apiMethod: 'GET', 
			apiUrl: '',
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
		};
 
		const controllerUpload = new AbortController();
		const fileSelectorRef = ref<any>(null)
		const files = ref([]);

		const submitForm = {
			submitStep1 : async (formElStep1: FormInstance | undefined) => {
				if (!formElStep1) return
				await formElStep1.validate((valid, fields) => {
					if (valid) {
						
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
					break;
				default:
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
					apiMethod: 'GET', 
					apiUrl: '',
				}
			}
		});
		return { 
			isLoading,
			totalStepWizard,
			itemModel,
			ruleFormStep1Ref, 
			rules,
			controllerUpload: controllerUpload,
			files,
			fileSelectorRef,
			fileTypeAccept: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
			submitStep,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions', 'fileTypeDataSourceOptions']),
	},
};