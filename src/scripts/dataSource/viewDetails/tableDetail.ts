import { dataSourceApi } from '@/api/dataSourceApi';
//import { tagApi } from '@/api/tagApi';
// import type { Tag, TagCategory } from '@/types/tag';
// import axios from 'axios';
import { onMounted, ref, defineAsyncComponent, watch, computed } from 'vue';
import type { SampleData } from '../type';
import SkeletonBox from "@/components/SkeletonBox.vue";
import { ElMessage, ElMessageBox } from 'element-plus';

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
            tagItems: c.tags ? c.tags.map((xTag:any) => xTag.tagFQN) : [],
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
    setup(props:any, { emit }:any) {
        const isLoading = ref(false);
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
        const schemasSelected = props.viewSettings.schemasSelected;
        const tableSelected = props.viewSettings.tableSelected;

        const activityFilter = ref('All Activity');
        const contentHeight = 'calc(100vh - 23rem)';
        const contentNodataHeight = 'calc(100vh - 24rem)';
        const contentNodataWithFilterHeight = 'calc(100vh - 28rem)';

        const tableInfo = ref<any>({});
        const columns = ref([] as any[]);
        const sampleData = ref<SampleData>();
        const tagList = computed(() =>{
            return tableInfo.value && tableInfo.value.tags ? tableInfo.value.tags.map((xTag:any) => xTag.tagFQN) : [];
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

        const setTableTags = async (tableMetaId: string, tags: string[]) => {
            await dataSourceApi.updateTableTags(tableMetaId, tags);
            ElMessage({
                message: `Đã cập nhật tag cho bảng thành công !`,
                type: 'success',
            });
        };

        const deleteTableTags = async (tableMetaId: string, tagIndex:number) =>{
            await dataSourceApi.deleteTableTags(tableMetaId, tagIndex);
            ElMessage({
                message: `Đã xoá tag cho bảng thành công !`,
                type: 'success',
            });
        }
        
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
            deleteTableTags,
            refreshData,
        };
    },
};
