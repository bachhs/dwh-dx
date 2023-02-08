<script setup lang="ts">
import { dataSourceApi } from '@/api/dataSourceApi';
import type { SampleData } from '@/scripts/dataSourceGroup/dataSource/type';
import { ref, onMounted } from 'vue';
const props = defineProps({
  viewSettings: { type: Object, required: true },
});
const sampleData = ref<SampleData>();
const fetchSampleData = async (
    datasourceName: string,
    databaseName: string,
    schemaName: string,
    tableName: string
) => {
    const res = await dataSourceApi.fetchSampleData(
        datasourceName,
        databaseName,
        schemaName,
        tableName
    );

    sampleData.value = res.data.sampleData;
};

onMounted(() => {
    fetchSampleData(
        props.viewSettings.dataSourceItem.name, 
        props.viewSettings.databaseSelected.name, 
        props.viewSettings.schemasSelected.name, 
        props.viewSettings.tableSelected.name
    );
});
</script>

<template>
    <div>
        <table v-if="sampleData && sampleData.rows.length > 0" class="table table-hover table-striped table-borderless text-nowrap" >
            <thead>
                <tr style="background-color: #dceaff;">
                    <th v-for="columnName in sampleData.columns" :key="columnName">
                        {{columnName}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(rowData, rowDataIndex) in sampleData.rows" :key="rowDataIndex">
                    <td v-for="rowValue in rowData" :key="rowValue">
                        {{ rowValue }}
                    </td>
                </tr>
            </tbody>
        </table>
        <no-data v-else/>
    </div>
</template>
