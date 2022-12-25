<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div class="mr-3 pl-1 pt-2">
            <div class="mb-4">
                <el-input
                    placeholder="Find in table"
                    class="input-with-select">
                    <template #append>
                        <el-button>
                            <el-icon><Search /></el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
            <table
                class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                <thead>
                    <tr>
                        <th>Column name</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="column in columns"
                        :key="column.name">
                        <td>
                            <el-button
                                link
                                class="text-navy"
                                @click="
                                    $emit('processingEvent', {
                                        eventName: 'ColumnDetails',
                                        dataItem: column,
                                    })
                                ">
                                <strong
                                    class="text-navy"
                                    style="font-size: 1rem">
                                    <i
                                        class="fa-solid fa-key"
                                        v-if="column.isPrimaryKey"></i>
                                    {{ column.name }}
                                </strong>
                            </el-button>
                        </td>
                        <td>{{ column.dataType }}</td>
                        <td>No description</td>
                        <td>
                            <el-button size="small">
                                <div>
                                    <el-icon><Plus /></el-icon>
                                    <span class="ml-1"
                                        >Add tag</span
                                    >
                                </div>
                            </el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">    
import { ref, watch } from 'vue';
const props = defineProps({
    viewSettings: { type: Object, required: true },
    columns: { type: Array<any>, required: true },
});
const contentHeight = 'calc(100vh - 23rem)';
const columns = ref<Array<any>>(props.columns);
watch(() => props.columns, (newVal) =>{
    columns.value = newVal;
})
</script>