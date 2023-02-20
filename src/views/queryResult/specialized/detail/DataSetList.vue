<template>
    <div class="flex-fill d-flex flex-column w-100">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-building text-danger mr-2"></i>
                    <strong v-if="ItemSelected">{{ItemSelected.name}}</strong>
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
                        class="table table-striped table-head-fixed table-borderless">
                        <thead>
                            <tr class="bg-white">
                                <th style="width: 1%;"
                                    class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                    <button>ID</button>
                                </th>
                                <th class="pl-0 pt-2 pb-2 align-middle">
                                    <button>MÃ SỐ</button>
                                </th> 
                                <th class="pl-0 pt-2 pb-2 align-middle">
                                    <button>TÊN THỦ TỤC</button>
                                </th> 
                                <th class="pl-0 pt-2 pb-2 align-middle">
                                    <button>LĨNH VỰC</button>
                                </th> 
                                <th class="pl-0 pt-2 pb-2 align-middle text-nowrap">
                                    <button>TÊN MỨC ĐỘ</button>
                                </th>
                                <th
                                    class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                    <button>NGÀY ÁP DỤNG</button>
                                </th>
                                <th
                                    class="pl-0 pt-2 pb-2 text-center align-middle"
                                    style="width: 1%">
                                    <div>ACTION</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class=" ">
                            <tr v-for="(itemData, itemIndex) in procedureIssue" :key="itemIndex">
                                <td class="pl-2 text-left">{{itemIndex+1}}</td>
                                <td class="pl-2">
                                    <strong>{{ itemData.shortName }}</strong>
                                </td> 
                                <td class="pl-2">
                                    {{ itemData.name }}
                                </td> 
                                <td class="pl-2 text-nowrap">
                                    {{ itemData.linhVuc }}
                                </td> 
                                <td class="pl-2 text-nowrap">
                                    {{ itemData.mucDo }}
                                </td> 
                                <td class="pl-2 text-left text-nowrap" style="width: 1%;">
                                    --
                                </td>
                                <td class="pl-2 text-center text-nowrap">
                                    <el-button type="default" class="p-2"
                                        @click="$emit( 'changeView', { name: 'DataSetDetail', data: itemData })">
                                        <el-icon class="mr-1"
                                            style="vertical-align: middle"
                                            :size="20">
                                            <InfoFilled />
                                        </el-icon>
                                        <span>Chi tiết</span>
                                    </el-button> 
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
import procedureIssue from "@/_sampleData/procedureIssue";
import { InfoFilled } from "@element-plus/icons-vue";
defineEmits(['changeView']);
const props = defineProps({
    ItemSelected: { type: Object, required: false, default: null }
});
</script>