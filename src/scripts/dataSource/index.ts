import { ref, onMounted } from "vue";
import { mapState } from "pinia";
import axios from "axios";
import { useDataCategoryStore } from '@/stores/dataCategory';

export default {
	setup() {
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

		async function getDataSources(): Promise<void> {
			const response = await axios.get(
				`/datasources`,
				{
					params: { page: 1, limit: 20 },
				}
			);
			datasources.value = response.data.content;
		}

		onMounted(() => {
			getDataSources();
		});

		return {
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
