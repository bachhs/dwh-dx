<script setup lang="ts">
import { dataSourceApi } from '@/api/dataSourceApi';
import type { SampleData } from '@/scripts/dataSource/type';
import { ref } from 'vue';

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

// fetchSampleData(
//     dataSourceSelected.name,
//     databaseSelected.name,
//     schemasSelected.name,
//     tableSelected.name
// );
</script>

<template>
    <div></div>
</template>
