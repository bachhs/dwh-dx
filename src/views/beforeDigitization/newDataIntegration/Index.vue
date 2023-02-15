<script lang="ts" src="@/scripts/beforeDigitization/newDataIntegration/index.ts"></script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.5rem 0.8rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center pr-3">
                <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                    <h4>
                        <i class="fas fa-plus text-lightblue mr-2"></i>
                        <strong>Tích hợp dữ liệu mới</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center"> 
                    <div class="ml-1 mr-1">
                        <el-input filterable placeholder="Nhập để lọc dữ liệu.." size="large"
                            style="min-width: 16rem">
                            <template #prepend>
                                <el-icon style="vertical-align: middle">
                                    <Search />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="ml-1 text-nowrap">
                        <el-button size="large" type="primary">
                            <el-icon :size="20" style="vertical-align: middle">
                                <Plus />
                            </el-icon>
                        </el-button>

                        <el-button size="large" type="primary">
                            <el-icon :size="20" style="vertical-align: middle">
                                <Refresh />
                            </el-icon>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
                <div class="flex-fill d-flex flex-column">
                    <el-scrollbar class="w-100 flex-fill">
                        <div class="mt-2 mr-3">
                            <table class="table table-striped table-head-fixed table-borderless">
                                <thead>
                                    <tr class="bg-white">
                                        <th style="width: 1%;" class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                            <button>STT</button>
                                        </th>
                                        <th style="width: 1%;" class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                            <button>SỐ HỒ SƠ</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 align-middle text-nowrap">
                                            <button>VỀ VIỆC</button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class=" ">
                                    <tr v-for="(itemData, itemIndex) in 99" :key="itemIndex">
                                        <td class="pl-2 text-left">{{ itemData }}</td>
                                        <td class="pl-2">
                                            <a href="#" class="text-primary">
                                                <strong>000.00.12.H60-230201-0002</strong>
                                            </a>
                                        </td>
                                        <td class="pl-2 text-left">
                                            <div>2.001098.000.00.00.H60 - Cấp Giấy phép thiết lập trang thông tin điện tử tổng hợp</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-scrollbar>
                    <div class="mt-1 d-flex align-items-center pr-2 p-1">
                        <div class="flex-fill pl-2 d-flex align-items-center">
                            <div class="d-none d-md-block">
                                
                            </div>
                        </div>
                        <div>
                            <el-pagination small background layout="prev, pager, next" :total="50" class="mt-1" />
                        </div>
                    </div>
                </div> 
            </div>
        </div> 
    </el-card>
</template>