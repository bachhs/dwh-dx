import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { organizationApi } from "@/api/organizationApi";
import { appParamsApi } from "@/api/appParamsApi";
export const useDataCategoryStore = defineStore("dataCategory", () => {
	const defaultOrganization = ref(0);
	const organization = ref(new Array<any>([]));
	const typeOfDataSource = ref(new Array<any>([]));
	const organizationList = ref([
		{
			id: 1,
			name: "Sở Thông Tin \r\n& Truyền Thông",
			imgUrl: "/custom-img/svg-icon/thong-tin-truyen-thong.svg",
		},
		{
			id: 2,
			name: "Sở Y Tế",
			imgUrl: "/custom-img/svg-icon/medical.svg",
		},
		{
			id: 3,
			name: "Sở Giao thông\r\nvận tải",
			imgUrl: "/custom-img/svg-icon/traffic-jam.svg",
		},
		{
			id: 4,
			name: "Sở Xây dựng",
			imgUrl: "/custom-img/svg-icon/construction.svg",
		},
		{
			id: 5,
			name: "Sở Kế hoạch\r\n& Đầu tư",
			imgUrl: "/custom-img/svg-icon/plan-investment.svg",
		},
	]);

	function getAppParams() {
		appParamsApi.getAllParams().then((response:any) => {
			let tDataSourceItems = response.data.content.filter((x:any) => x.type === "database");
			tDataSourceItems.forEach((typeDtsItem:any) => {
				try{
					typeDtsItem.value = JSON.parse(typeDtsItem.value);
					typeDtsItem.iconName = typeDtsItem.value.iconName;
					typeDtsItem.name = typeDtsItem.key;
					typeDtsItem.id = typeDtsItem.key;
				}
				catch(errorParse){
					console.error(errorParse);
				}
			});
			typeOfDataSource.value = tDataSourceItems;
		});
	}
	function getOrganization() {
		organizationApi.organizationList().then((response: any) => {
			//organization.value = response.data.content;
			organization.value = organizationList.value;
			if(organization.value.length > 0) defaultOrganization.value = organization.value[0].id
		});
	}
	return { 
		organization, 
		defaultOrganization,
		typeOfDataSource,
		getOrganization,
		getAppParams,
	};
});
