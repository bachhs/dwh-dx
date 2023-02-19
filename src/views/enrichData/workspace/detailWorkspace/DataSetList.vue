<template>
    <div class="flex-fill d-flex flex-column w-100">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-database text-danger mr-2"></i>
                    <strong>Danh sách tập dữ liệu</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                    
                <div class="ml-1"> 
                    <el-button size="large" type="danger">
                        <el-icon :size="20" style="vertical-align: middle"
                            @click="$emit('changeView', { name: 'ListData' })">
                            <close />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
            <el-scrollbar class="w-100 flex-fill">
                <div class="mt-0 mr-3">
                    <table
                        class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                        <thead>
                            <tr class="bg-white">
                                <th>Database Name</th>
                                <th>Số bản ghi</th>
                                <th>Lần cuối chỉnh sửa</th>
                                <th>Chất lượng dữ liệu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="dataSetItem in 99" v-bind:key="dataSetItem">
                                <td>
                                    <el-button
                                        link
                                        class="link-schema"
                                        @click="$emit('changeView', { name: 'DataSetDetail' })">
                                        <strong class="text-navy" style="font-size: 1rem">
                                            <i class="fa-solid fa-database"></i>
                                            Tập dữ liệu {{ dataSetItem }}
                                        </strong>
                                    </el-button>
                                </td>
                                <td>
                                    {{parseInt(`${Math.random() * (3000 - 10) + 10}`)}} bản ghi                      
                                </td>
                                <td>30-10-2022 20:55</td>
                                <td>
                                    <el-progress :text-inside="true" :stroke-width="20" :percentage="parseInt(`${Math.random() * (100 - 10) + 10}`)" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </el-scrollbar> 
        </div>   
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineEmits(['changeView'])
</script>