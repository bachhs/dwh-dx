import { reactive } from "vue";
import { mapState } from "pinia";
import { useDataCategoryStore } from '@/stores/dataCategory';

export default {
  setup() {
    const data = reactive({
      indexSourceSelected: 0,
    });
    return data;
  },
	computed: {
		...mapState(useDataCategoryStore, ['organization', 'typeOfData']),
	},
};
