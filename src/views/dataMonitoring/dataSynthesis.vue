<script lang="ts" src="@/scripts/dataMonitoring/dataSynthesis.ts">

</script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.8rem 1rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center">
                <div class="flex-fill d-none d-md-block">
                    <h4><i class="fas fa-refresh text-navy"></i> <strong>Tổng hợp dữ liệu</strong></h4>
                </div>
                <div class="d-flex align-items-center">
                    <div class="ml-1 mr-1">
                        <el-select v-model="sourceData" filterable placeholder="Dữ liệu nguồn.." size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="ml-1 mr-1">
                        <el-select v-model="typeDataFormat" filterable placeholder="Dữ liệu đích.." size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="ml-1 mr-1">
                        <el-select v-model="typeDataFormat" filterable placeholder="Lịch thu thập.." size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="ml-1 mr-1">
                        <el-select v-model="typeDataFormat" filterable placeholder="Trạng thái.." size="large">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div class="ml-1 mr-1">
                        <el-input v-model="filterQuery" filterable placeholder="Nhập để lọc dữ liệu.." size="large"
                            style="min-width: 16rem;">
                            <template #prepend>
                                <el-icon style="vertical-align: middle">
                                    <Search />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                    <div class="ml-1">
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
                <el-scrollbar class="w-100 flex-fill">
                    <div class="mt-2 mr-3">
                        <table class="table table-striped table-head-fixed text-nowrap table-borderless">
                            <thead>
                                <tr>
                                    <th class="pl-0 pt-2 pb-2 text-nowrap">
                                        <button>
                                            DỮ LIỆU NGUỒN
                                        </button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2">
                                        <button>
                                            DỮ LIỆU ĐÍCH
                                        </button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2 text-center">
                                        <button>
                                            LỊCH THU THẬP
                                        </button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2 text-center">
                                        <button>
                                            TRẠNG THÁI
                                        </button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2 text-center" style="width: 1%;">
                                        <div>Action</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class=" ">
                                <tr v-for="(itemDemo) in 99" :key="itemDemo">
                                    <td class="pl-2">Sở TTTT - Database {{ itemDemo }}</td>
                                    <td class="pl-2">DataLake - Partition/Db{{ itemDemo }}</td>
                                    <td class="pl-2 text-center">Hàng tháng</td>
                                    <td class="pl-2 text-center">
                                        <span class="badge badge-lg bg-success">Hoàn thành</span>
                                    </td>
                                    <td class="pl-2 text-center">
                                        <el-button type="default" class="p-2">
                                            <el-icon style="vertical-align: middle" :size="20">
                                                <Edit />
                                            </el-icon>
                                        </el-button>
                                        <el-button type="danger" class="p-2">
                                            <el-icon style="vertical-align: middle" :size="20">
                                                <Delete />
                                            </el-icon>
                                        </el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </el-scrollbar>
                <div class="mt-3 d-flex align-items-center pr-2 p-1">
                    <div class="flex-fill pl-2 d-flex align-items-center">
                        <el-icon class="text-primary mt-1 mr-1">
                            <Clock />
                        </el-icon>
                        <span><strong>Last update:</strong> 2 seconds ago</span>
                    </div>
                    <div>
                        <el-pagination class="" background layout="total, sizes, prev, pager, next, jumper"
                            :total="1000" />
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>