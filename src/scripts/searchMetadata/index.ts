import { defineAsyncComponent, reactive, ref } from "vue";
import SkeletonBox from '@/components/SkeletonBox.vue';
export default {
	components: {

	},
	setup() {
		const  filterCollection:any = ref({
			serviceTypeFilter: [
				'Postgres', 'sql'
			],
			tierFilter: [
				'Tier1', 'Tier2', 'Tier3', 'Tier4'
			],
			tagsFilter: [
				'PersonalData', 'SpecialCategory'
			],
			dataSourceFilter: [
				'test', 'bao_cao_covid', 'danh_sach_covid'
			],
			databaseFilter: [
				'bigdata', 'covid_report'
			],
			schemaFilter: [
				'public'
			],
		});
		const data:any = ref<any>({
			isShowDeleted: true,
			serviceTypeFilter: filterCollection.value.serviceTypeFilter.map((xItem:any) => {
				return { label: xItem, selected: false }
			}),
			tierFilter: filterCollection.value.tierFilter.map((xItem:any) => {
				return { label: xItem, selected: false }
			}),
			tagsFilter: filterCollection.value.tagsFilter.map((xItem:any) => {
				return { label: xItem, selected: false }
			}),
			dataSourceFilter: filterCollection.value.dataSourceFilter.map((xItem:any) => {
				return { label: xItem, selected: false }
			}),
			databaseFilter: filterCollection.value.databaseFilter.map((xItem:any) => {
				return { label: xItem, selected: false }
			}),
			schemaFilter: filterCollection.value.schemaFilter.map((xItem:any) => {
				return { label: xItem, selected: false }
			}),
		});
		return {data};
	},
};
