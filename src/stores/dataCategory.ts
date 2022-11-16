import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { organizationApi } from "@/api/organizationApi";
export const useDataCategoryStore = defineStore("dataCategory", () => {
	const organization = ref([]);
	function getOrganization() {
		organizationApi.organizationList().then((response: any) => {
			organization.value = response.data.content;
		});
	}
	return { organization, getOrganization };
});
