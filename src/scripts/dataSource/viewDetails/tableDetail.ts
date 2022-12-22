import { dataSourceApi } from "@/api/dataSourceApi";
import axios from "axios";
import { onMounted, ref } from "vue";

function parseColumns(columns: any[]): any[] {
    return columns.map((c) => {
        let dataType = c.dataTypeDisplay;
        if (dataType === "varchar") dataType = `${dataType}(${c.dataLength})}`;

        return {
            name: c.name,
            dataType: dataType,
            isPrimaryKey: c.constraint === "PRIMARY KEY",
        };
    });
}

export default {
    props: ["viewSettings"],
    emits: ["onChangeView", "processingEvent"],
    setup(props: any) {
        const dataSourceSelected = props.viewSettings.dataSourceItem;
        const databaseSelected = props.viewSettings.databaseSelected;
        const schemasSelected = props.viewSettings.schemasSelected;
        const tableSelected = props.viewSettings.tableSelected;
        
        const activityFilter = ref("All Activity");
        const contentHeight = "calc(100vh - 23rem)";
        const contentNodataHeight = "calc(100vh - 24rem)";
        const contentNodataWithFilterHeight = "calc(100vh - 28rem)";

        const columns = ref([] as any[]);
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
        };

        onMounted(() => {
            // hard code for now
            fetchColumns(
                dataSourceSelected.name,
                databaseSelected.name,
                schemasSelected.name,
                tableSelected.name
            );
        });
        return {
            activityFilter,
            contentHeight,
            contentNodataHeight,
            contentNodataWithFilterHeight,
            columns,
        };
    },
};
