import { ref, onMounted, reactive } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';
import type { FormInstance, FormRules } from 'element-plus';
import { cronstrueToString } from '@/helpers/cronstrueVI';
const appState = useDataCategoryStore();
export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup(props:any, { emit }){
		const isLoading = ref(false);		
		const organizationSelected = ref(appState.defaultOrganization.id);
		const itemModel = ref({
			id:1,
			dataSource: "",
			dataDestination: "",
			schedule:"0 0 * * *",
			createdAt:"2022-11-05T03:22:10.983284Z",
			updatedAt:"2022-11-05T03:22:10.983284Z",
			dag_id:null
		});

		const ruleFormRef = ref<FormInstance>();
		const rules = reactive<FormRules>({
			dataSource: [
				{ required: true, message: 'Vui lòng không bỏ trống..', trigger: 'blur' },
				{ min: 3, message: 'Nhập tối thiểu 3 ký tự..', trigger: 'blur' },
			],
			dataDestination: [
				{ required: true, message: 'Vui lòng không bỏ trống..', trigger: 'blur' },
				{ min: 3, message: 'Nhập tối thiểu 3 ký tự..', trigger: 'blur' },
			],
			schedule: [
				{ required: true, message: 'Vui lòng không bỏ trống..', trigger: 'blur' },
				{ min: 3, message: 'Nhập tối thiểu 3 ký tự..', trigger: 'blur' },
			],
			dag_id: [
				{ required: true, message: 'Vui lòng không bỏ trống..', trigger: 'blur' },
				{ min: 3, message: 'Nhập tối thiểu 3 ký tự..', trigger: 'blur' },
			],
		});

		const getCronExpressionReadable = (cronExp:string) => {
			return cronstrueToString(cronExp, { locale: "vi", verbose: true, use24HourTimeFormat: true, });
		};

		const submitData = async () =>{
			if (!ruleFormRef || !ruleFormRef.value) return;
			await ruleFormRef.value.validate((valid, fields) => {
				if (valid) {
					emit("onFormSubmit", valid);
				} else {
					console.log('error submit!', fields);
				}
			});
		};

		onMounted(() =>{
			if(props.viewSettings && props.viewSettings.viewName === "ModifyData" 
				&& props.viewSettings.dataItem != null){
				itemModel.value = {
					id:1,
					dataSource: "",
					dataDestination: "",
					schedule:"0 0 * * *",
					createdAt:"2022-11-05T03:22:10.983284Z",
					updatedAt:"2022-11-05T03:22:10.983284Z",
					dag_id:null
				}
			}
		});

		return {
			ruleFormRef,
			rules,
			isLoading,
			organizationSelected,
			itemModel,
			getCronExpressionReadable,
			submitData,
		}
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'databaseEngineOptions', 'fileTypeDataSourceOptions']),
	},
}