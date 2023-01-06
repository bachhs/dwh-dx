import { dataSourceApi } from '@/api/dataSourceApi';
import { tagApi } from '@/api/tagApi';
// import type { Tag, TagCategory } from '@/types/tag';
// import axios from 'axios';
import { onMounted, ref, defineAsyncComponent, nextTick } from 'vue';
import type { SampleData } from '../type';
import SkeletonBox from "@/components/SkeletonBox.vue";
import { ElInput } from 'element-plus';

function parseColumns(columns: any[]): any[] {
    return columns.map((c) => {
        let dataType = c.dataTypeDisplay;
        if (dataType === 'varchar') dataType = `${dataType}(${c.dataLength})}`;

        return {
            name: c.name,
            dataType: dataType,
            isPrimaryKey: c.constraint === 'PRIMARY KEY',
        };
    });
}

export default {
    props: ['viewSettings'],
    emits: ['onChangeView', 'processingEvent'],
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
    setup(props: any) {
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
        const tagList = ref<string[]>([]);
        const inputValue = ref('');
        const inputVisible = ref(false);
        const InputRef = ref<InstanceType<typeof ElInput>>();

        const handleClose = (tag: string) => {
            tagList.value.splice(tagList.value.indexOf(tag), 1)
        }

        const showInput = () => {
            inputVisible.value = true
            nextTick(() => {
                InputRef.value!.input!.focus()
            })
        }

        const handleInputConfirm = () => {
            if (inputValue.value) {
                tagList.value.push(inputValue.value)
            }
            inputVisible.value = false
            inputValue.value = ''
        }


        const fetchColumns = async (
            datasourceName: string,
            databaseName: string,
            schemaName: string,
            tableName: string
        ) => {
            const res = await dataSourceApi.fetchColumns(
                datasourceName,
                databaseName,
                schemaName,
                tableName
            );
            columns.value = parseColumns(res.data.columns);
            tableInfo.value = {
                tableType: res.data.tableType,
                changeDescription: res.data.changeDescription,
                href: res.data.href,
            }
        };
 

        const fetchTagList = async () => {
            const res = await tagApi.tagList();
            tagList.value = res.data.data
                .map((x) => x.children?.map((y) => y.fullyQualifiedName))
                .filter((x) => x)
                .flat();
        };

        const setTableDescription = async (
            tableMetaId: string,
            description: string
        ) => {
            await dataSourceApi.updateTableDescription(
                tableMetaId,
                description
            );
        };

        const setColumnDescription = async (
            tableMetaId: string,
            columnId: number,
            description: string
        ) => {
            await dataSourceApi.updateColumnDescription(
                tableMetaId,
                columnId,
                description
            );
        };

        const setTableTags = async (tableMetaId: string, tags: string[]) => {
            await dataSourceApi.updateTableTags(tableMetaId, tags);
        };

        const setColumnTags = async (
            tableMetaId: string,
            columnId: number,
            tags: string[]
        ) => {
            await dataSourceApi.updateColumnTags(tableMetaId, columnId, tags);
        };

        // sample table tags
        setTableTags('8f2c2595-253e-4e00-937b-7e3d4a99bf5d', [
            'PersonalData.Personal',
            'PersonalData.SpecialCategory',
        ]);
        
        const refreshData = () =>{
            // hard code for now
            fetchColumns(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name,
                tableSelected.name
            );
            fetchTagList();
        };

        onMounted(() => {
            // hard code for now
            fetchColumns(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name,
                tableSelected.name
            );
            fetchTagList();
        });
        return {
            props,
            activityFilter,
            contentHeight,
            contentNodataHeight,
            contentNodataWithFilterHeight,
            tableInfo,
            columns,
            sampleData,
            fetchTagList,
            tagList,
            refreshData,
            
            inputValue,
            inputVisible,
            InputRef,
            handleClose,
            showInput,
            handleInputConfirm,
        };
    },
};
