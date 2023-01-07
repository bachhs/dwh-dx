import { dataSourceApi } from '@/api/dataSourceApi';
import { tagApi } from '@/api/tagApi';
// import type { Tag, TagCategory } from '@/types/tag';
// import axios from 'axios';
import { onMounted, ref, defineAsyncComponent, watch, computed } from 'vue';
import type { SampleData } from '../type';
import SkeletonBox from "@/components/SkeletonBox.vue";

function parseColumns(columns: any[]): any[] {
    return columns.map((c) => {
        let dataType = c.dataTypeDisplay;
        if (dataType === 'varchar') dataType = `${dataType}(${c.dataLength})}`;

        return {
            name: c.name,
            description: c.description,
            fullyQualifiedName: c.fullyQualifiedName,
            dataType: dataType,
            dataLength: c.dataLength,
            isPrimaryKey: c.constraint === 'PRIMARY KEY',
            tagItems: c.tags ? c.tags.map(xTag => xTag.tagFQN) : [],
        };
    });
}

export default {
    props: ['viewSettings'],
    emits: ['onChangeView', 'processingEvent', "onLoadingChanged"],
    components : {
        SchemaView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/SchemaView.vue"),
            loadingComponent: SkeletonBox,
        }),
        SampleDataView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/SampleDataView.vue"),
            loadingComponent: SkeletonBox,
        }),
        ActivityFeedsAndTaskView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/ActivityFeedsAndTaskView.vue"),
            loadingComponent: SkeletonBox,
        }),
        QueriesView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/QueriesView.vue"),
            loadingComponent: SkeletonBox,
        }),
        ProfilerDataQualityView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/ProfilerDataQualityView.vue"),
            loadingComponent: SkeletonBox,
        }),
        LineageView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/LineageView.vue"),
            loadingComponent: SkeletonBox,
        }),
        CustomerPropertiesView: defineAsyncComponent({
            loader: () => import("@/views/dataSource/tableDetail/CustomerPropertiesView.vue"),
            loadingComponent: SkeletonBox,
        }),
    },
    setup(props:any, { emit }) {
        const isLoading = ref(false);
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
        const schemasSelected = props.viewSettings.schemasSelected;
        const tableSelected = props.viewSettings.tableSelected;

        const activityFilter = ref('All Activity');
        const contentHeight = 'calc(100vh - 23rem)';
        const contentNodataHeight = 'calc(100vh - 24rem)';
        const contentNodataWithFilterHeight = 'calc(100vh - 28rem)';

        const tableInfo = ref<Object>({});
        const columns = ref([] as any[]);
        const sampleData = ref<SampleData>();
        const tagList = computed(() =>{
            return tableInfo.value && tableInfo.value.tags ? tableInfo.value.tags.map(xTag => xTag.tagFQN) : [];
        });

        const fetchColumns = async ( datasourceName: string, databaseName: string, schemaName: string, tableName: string ) => {
            isLoading.value = true;
            const res = await dataSourceApi.fetchColumns(
                datasourceName,
                databaseName,
                schemaName,
                tableName
            );
            columns.value = parseColumns(res.data.columns);
            tableInfo.value = {
                id: res.data.id,
                name: res.data.name,
                tableType: res.data.tableType,
                changeDescription: res.data.changeDescription,
                href: res.data.href,
                tags: res.data.tags,
            }
            isLoading.value = false;
        };
 

        // const fetchTagList = async () => {
        //     const res = await tagApi.tagList();
        //     tagList.value = res.data.data
        //         .map((x) => x.children?.map((y) => y.fullyQualifiedName))
        //         .filter((x) => x)
        //         .flat();
        // };

        const setTableDescription = async ( tableMetaId: string, description: string ) => {
            await dataSourceApi.updateTableDescription(
                tableMetaId,
                description
            );
        };

        const setColumnDescription = async ( tableMetaId: string, columnId: number, description: string ) => {
            await dataSourceApi.updateColumnDescription(
                tableMetaId,
                columnId,
                description
            );
        };

        const setTableTags = async (tableMetaId: string, tags: string[]) => {
            await dataSourceApi.updateTableTags(tableMetaId, tags);
        };

        const setColumnTags = async ( tableMetaId: string, columnId: number, tags: string[] ) => {
            await dataSourceApi.updateColumnTags(tableMetaId, columnId, tags);
        };

        // sample table tags
        // setTableTags('8f2c2595-253e-4e00-937b-7e3d4a99bf5d', [
        //     'PersonalData.Personal',
        //     'PersonalData.SpecialCategory',
        // ]);
        
        const refreshData = () =>{
            // hard code for now
            fetchColumns(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name,
                tableSelected.name
            );
            //fetchTagList();
        };

        onMounted(() => {
            // hard code for now
            fetchColumns(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name,
                tableSelected.name
            );
            //fetchTagList();
        });
        watch(isLoading, (newVal) => {
            emit("onLoadingChanged", newVal);
        });
        return {
            props,
            tableSelected,
            isLoading,
            activityFilter,
            contentHeight,
            contentNodataHeight,
            contentNodataWithFilterHeight,
            tableInfo,
            columns,
            sampleData,
            //fetchTagList,
            tagList,
            setTableTags,
            refreshData,
        };
    },
};
