<template>
    <el-scrollbar :style="`height: ${contentHeight};`">
        <div class="mr-3 pl-1 pt-2">
            <div class="mb-2">
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="info-box">
                            <span class="info-box-icon bg-info elevation-1"><i class="fas fa-list-ol"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Row Count</span>
                                <span class="info-box-number">
                                    10 rows
                                </span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="info-box mb-3">
                            <span class="info-box-icon bg-navy elevation-1"><i class="fas fa-columns"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Column Count</span>
                                <span class="info-box-number">4 columns</span>
                            </div>
                        </div>
                    </div>

                    <div class="clearfix hidden-md-up"></div>
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="info-box mb-3">
                            <span class="info-box-icon bg-success elevation-1"><i class="fas fa-tablets"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Table Sample %</span>
                                <span class="info-box-number">100%</span>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="info-box mb-3">
                            <span class="info-box-icon bg-lightblue elevation-1"><i class="far fa-thumbs-up"></i></span>
                            <div class="info-box-content">
                                <span class="info-box-text">Status</span>
                                <span class="info-box-number">
                                    <span class="text-success">Success 0</span>
                                    <span class="text-orange ml-2">Aborted 0</span>
                                    <span class="text-danger ml-2">Failed 0</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <el-input placeholder="Find in table" class="input-with-select">
                    <template #append>
                        <el-button>
                            <el-icon>
                                <Search />
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>
            <table class="table table-borderless table-customize table-head-fixed text-nowrap table-stripped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Data Type</th>
                        <th>Null %</th>
                        <th>Unique %</th>
                        <th>Distinct %</th>
                        <th class="text-center">Value Count</th>
                        <th class="text-center">Tests</th>
                        <th class="text-center">Status</th>
                        <th class="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="column in columns" :key="column.name">
                        <td>
                            <el-button link class="text-navy" 
                                @click="$emit('processingEvent', { eventName: 'ColumnDetails', dataItem: {}, })">
                                <strong>{{
                                        column.name
                                }}</strong>
                            </el-button>
                        </td>
                        <td>
                            <div>{{ column.dataType }}</div>
                        </td>
                        <td>
                            <div data-testid="profiler-progress-bar-container" class="ant-row">
                                <div>
                                    <el-progress :stroke-width="10" :percentage="70" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div data-testid="profiler-progress-bar-container" class="ant-row">
                                <div>
                                    <el-progress :stroke-width="10" :percentage="50" color="#5cb87a" />
                                </div>
                            </div>
                        </td>
                        <td>
                            <div data-testid="profiler-progress-bar-container" class="ant-row">
                                <div>
                                    <el-progress :stroke-width="10" :percentage="20" color="#f56c6c" />
                                </div>
                            </div>
                        </td>
                        <td class="text-center">1</td>
                        <td class="text-center">
                            <a class="text-navy" href="#">0</a>
                        </td>
                        <td class="text-center">
                            <span>
                                <i class="fas fa-circle text-success"></i>
                                <span class="ml-1">0</span>
                            </span>
                            <span class="ml-3">
                                <i class="fas fa-circle text-warning"></i>
                                <span class="ml-1">0</span>
                            </span>
                            <span class="ml-3">
                                <i class="fas fa-circle text-danger"></i>
                                <span class="ml-1">0</span>
                            </span>
                        </td>
                        <td></td>
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
const contentNodataHeight = 'calc(100vh - 24rem)';
const contentNodataWithFilterHeight = 'calc(100vh - 28rem)';
const columns = ref<Array<any>>(props.columns);
watch(() => props.columns, (newVal) =>{
    columns.value = newVal;
})
</script>