import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import axios from "axios";
import { useDataCategoryStore } from '@/stores/dataCategory';

export default {
    props: ['viewSettings'],
	emits: ['onChangeView'],
	setup() {
		const isLoading = ref(false);
		const datasources = ref([]);
		const typeDataFormat = ref("");
		const filterQuery = ref("");
		const sourceData = ref('');
		const options = ref([
			{
				value: "Option1",
				label: "Option1",
			},
			{
				value: "Option2",
				label: "Option2",
			},
			{
				value: "Option3",
				label: "Option3",
			},
			{
				value: "Option4",
				label: "Option4",
			},
			{
				value: "Option5",
				label: "Option5",
			},
		]);

		const getDataSources = () => {
			isLoading.value = true;
			axios.get(
				`/datasources`, { params: { page: 1, limit: 20 } }
			).then(response =>{
				datasources.value = response.data.content;
				isLoading.value = false;
			}).catch(() =>{
				isLoading.value = false;
			});
		}

		onMounted(() => {
			getDataSources();
		});

		return {
			isLoading,
			datasources,
			typeDataFormat,
			filterQuery,
			sourceData,
			options,
			getDataSources,
		};
	},
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfData']),
	},
};