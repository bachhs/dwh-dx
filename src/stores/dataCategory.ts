import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { organizationApi } from '@/api/organizationApi';
import { appParamsApi } from '@/api/appParamsApi';
export const useDataCategoryStore = defineStore('dataCategory', () => {
    const defaultOrganization = ref<any>({});
    const organization = ref(new Array<any>([]));
    const databaseEngineOptions = ref(new Array<any>([]));
    const databaseEnginesMap = ref<any>({});
    const fileTypeDataSourceOptions = ref(new Array<any>([]));
    function getAppParams() {
        appParamsApi.getAllParams().then((response: any) => {
            const tDataSourceItems = response.data.content.filter(
                (x: any) => x.type === 'database'
            );
            tDataSourceItems.forEach((typeDtsItem: any) => {
                try {
                    typeDtsItem.value = JSON.parse(typeDtsItem.value);
                    typeDtsItem.iconName = typeDtsItem.value.iconName;
                    typeDtsItem.name = typeDtsItem.label;
                    typeDtsItem.id = typeDtsItem.key;
                } catch (errorParse) {
                    console.error(errorParse);
                }
            });
            databaseEngineOptions.value = tDataSourceItems;
            databaseEnginesMap.value = tDataSourceItems.reduce(function (
                acc: any,
                cur: any
            ) {
                acc[cur.key] = cur;
                return acc;
            },
            {});

            const fileTypeDtsItems = response.data.content.filter(
                (x: any) => x.type === 'file'
            );
            fileTypeDataSourceOptions.value = fileTypeDtsItems;
        });
    }
    function getOrganization() {
        organizationApi.organizationListAll().then((response: any) => {
            //organization.value = response.data.content;
            organization.value = response.data.map((item: any) => {
                return { ...item, imgUrl: item.path };
            });
            if (organization.value.length > 0)
                defaultOrganization.value = organization.value[0];
        });
    }
    return {
        organization,
        defaultOrganization,
        databaseEngineOptions,
        databaseEnginesMap,
        fileTypeDataSourceOptions,
        getOrganization,
        getAppParams,
    };
});
