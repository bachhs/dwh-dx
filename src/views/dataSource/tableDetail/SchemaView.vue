<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div class="mt-1 ml-1 mr-3 callout callout-info p-2 pt-0 pb-0">
            <div class="d-flex w-100">
                <div class="flex-fill">
                    <div v-if="tableSelected.description">
                        <ReadmoreModal :title="`Mô tả về ${tableSelected.name}`" :content="tableSelected.description">  
                            <template #label>
                                <div class="line-clamp-2 text-justify" v-html="tableSelected.description"></div>
                            </template>                                      
                        </ReadmoreModal>
                    </div>
                    <div v-else>Không có mô tả</div>
                </div>
                <div class="ml-3">
                    <SetDescriptionModal v-model="tableSelected.description"
                        @onFormSubmit="(descHtml:string) => { updateTableDesc(tableSelected.id, descHtml); }">
                        <template #label>
                            <div class="m-2 d-flex align-items-center">
                                <el-icon :size="20">
                                    <Edit />
                                </el-icon>
                                <span class="ml-0"></span>
                            </div>
                        </template>
                    </SetDescriptionModal>
                </div>
            </div>
        </div>
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
                        <th style="width: 1%;" class="text-nowrap">Tên cột</th>
                        <th>Kiểu dữ liệu</th>
                        <th>Mô tả</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(column, indexColumn) in columns" 
                        :key="column.name">
                        <td class="text-nowrap">
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
                        <td class="text-nowrap">{{ column.dataType }}</td>
                        <td>
                            <div class="d-flex align-items-center">
                                <div v-if="column.description">
                                    <ReadmoreModal :title="`Mô tả về ${column.name}`" :content="column.description">                                        
                                        <span class="line-clamp-1" v-html="column.description.replace(/<[^>]*>/g, '')"></span>
                                    </ReadmoreModal>
                                </div>
                                <div v-else>Không có mô tả</div>
                                <SetDescriptionModal v-model="column.description"
                                    @onFormSubmit="(descHtml:string) => { updateColumnDesc(indexColumn, descHtml); }">
                                    <template #label>
                                        <span class="m-2 d-flex align-items-center">
                                            <el-icon :size="20">
                                                <Edit />
                                            </el-icon>
                                        </span>
                                    </template>
                                </SetDescriptionModal>
                            </div>  
                        </td>
                        <td>                            
                            <TagsEdit class="d-inline" 
                                v-model="column.tagItems"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </el-scrollbar>
</template>
<script setup lang="ts">    
import { ref, watch, defineComponent } from 'vue';
import SetDescriptionModal from "@/components/modals/SetDescriptionModal.vue";
import { updateTableDescription, updateColumnDescription } from "@/helpers/dataSourceHelper";
import { ElMessage } from 'element-plus';
const props = defineProps({
    viewSettings: { type: Object, required: true },
    columns: { type: Array<any>, required: true },
});

const dataSourceSelected = props.viewSettings.dataSourceItem;
const databaseSelected = props.viewSettings.databaseSelected;
const schemasSelected = props.viewSettings.schemasSelected;
const tableSelected = props.viewSettings.tableSelected;
const contentHeight = 'calc(100vh - 23rem)';
const columns = ref<Array<any>>(props.columns);
watch(() => props.columns, (newVal) =>{
    columns.value = newVal;
});

const updateTableDesc = (metaId:string, description:string) => {
    updateTableDescription(metaId, description).then((metaData:any) =>{
        ElMessage({
            message: "Cập nhật mô tả table thành công",
            type: 'success',
        });
    });
}; 


const updateColumnDesc = (metaId:number, description:string) => {
    updateColumnDescription(tableSelected.id, metaId, description).then((metaData:any) =>{
        ElMessage({
            message: "Cập nhật mô tả cột thành công",
            type: 'success',
        });
    });
}; 
</script>