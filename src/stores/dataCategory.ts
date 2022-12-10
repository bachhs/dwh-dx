import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { organizationApi } from "@/api/organizationApi";
export const useDataCategoryStore = defineStore("dataCategory", () => {
	const defaultOrganization = ref(0);
	const organization = ref(new Array<any>([]));
	const typeOfData = ref([
		{ id: 1, type: "database", name: "PostgreSQL", iconName: "postgresql.svg" },
		{ id: 2, type: "database", name: "Microsoft SQL Server", iconName: "microsoft-sql-server.svg" },
		{ id: 3, type: "database", name: "MySQL", iconName: "mysql.svg" },
		{ id: 4, type: "database", name: "Oracle", iconName: "oracle.svg" },
		{ id: 5, type: "database", name: "MongoDB", iconName: "mongodb.svg" },
		{ id: 6, type: "database", name: "Cassandra", iconName: "postgresql.svg" },
		{ id: 7, type: "database", name: "MariaDB", iconName: "mariadb.svg" },
		{ id: 8, type: "database", name: "IBM Db2", iconName: "ibmdb2.svg" },
		{ id: 9, type: "database", name: "SQLite", iconName: "sqlite.svg" },
		{ id: 10, type: "database", name: "Elasticsearch", iconName: "elasticsearch.svg" },
		{ id: 11, type: "database", name: "Redis", iconName: "redis.svg" }
	]);

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
		typeOfData,
		getOrganization 
	};
});
