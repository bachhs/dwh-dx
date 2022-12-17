<script lang="ts" src="@/scripts/datasourcePipeline/datasourcePipeline/listData.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4><i class="fas fa-refresh text-navy"></i> <strong>{{moduleName}}</strong></h4>
            </div>
            <div class="d-flex align-items-center">
                <div class="ml-1 mr-1">
                    <el-select filterable placeholder="Dữ liệu nguồn.." size="large">
                        <el-option v-for="item in dataSourceOptions" :key="item.id" :label="item.label" :value="item.id" />
                    </el-select>
                </div>
                <div class="ml-1 mr-1">
                    <el-select filterable placeholder="Dữ liệu đích.." size="large">
                        <el-option  label="DataLake" :value="0" />
                        <el-option  label="Data Warehouse" :value="1" />
                        <el-option  label="Operational Data Store(OOS)" :value="2" />
                    </el-select>
                </div>
                <div class="ml-1 mr-1">
                    <el-select filterable placeholder="Lịch thu thập.." size="large">
                        <el-option  label="Hàng giờ" :value="0" />
                        <el-option  label="Hàng ngày" :value="1" />
                        <el-option  label="Hàng tuần" :value="2" />
                        <el-option  label="Hàng tháng" :value="3" />
                        <el-option  label="Thủ công" :value="4" />
                    </el-select>
                </div>
                <div class="ml-1 mr-1">
                    <el-select filterable placeholder="Trạng thái.." size="large">
                        <el-option  label="Đang xử lý" :value="0" />
                        <el-option  label="Hoàn thành" :value="1" />
                        <el-option  label="Không thành công" :value="-1" />
                    </el-select>
                </div> 
                <div class="ml-1">
                    <el-button size="large" type="primary"
                        @click="$emit('onChangeView', { viewName: 'AddData', data: {} })">
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
        <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0"
            v-if="(listElements.data && listElements.data.length > 0)">
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
                                        LẦN THỰC HIỆN CUỐI
                                    </button>
                                </th>
                                <th class="pl-0 pt-2 pb-2 text-center">
                                    <button>
                                        LẦN THỰC HIỆN KẾ TIẾP
                                    </button>
                                </th>
                                <th class="pl-0 pt-2 pb-2 text-center">
                                    <button>
                                        TRẠNG THÁI
                                    </button>
                                </th>
                                <th class="pl-0 pt-2 pb-2 text-center" style="width: 1%;">
                                    <div>THAO TÁC</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class=" ">
                            <tr v-for="element in listElements.data" :key="element.id">
                                <td class="pl-2">Sở TTTT - Database {{ element.id }}</td>
                                <td class="pl-2">DataLake - Partition/Db{{ element.id }}</td>
                                <td class="pl-2 text-center">
                                    <div>{{getCronExpressionReadable(element.schedule)}} ({{ element.schedule }})</div>
                                </td>
                                <td class="pl-2 text-center">13-12-2022. 4:00:05 PM</td>
                                <td class="pl-2 text-center">13-01-2024. 4:00:05 PM</td>
                                <td class="pl-2 text-center">
                                    <span class="badge badge-lg bg-success">Hoàn thành</span>
                                </td>
                                <td class="pl-2 text-center">
                                    <el-button type="primary" class="p-2">
                                        <i class="fas fa-play ml-1 mr-1"></i>
                                    </el-button>
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
                    <span><strong>Last update:</strong> {{lastDataLoading}}</span>
                </div>
                <div>
                    <el-pagination v-if="(listElements.data && listElements.data.length > 0)"
                            class="" background 
                            layout="total, sizes, prev, pager, next, jumper" 
                            v-model:current-page="listElements.pagination.page"
                            :page-size="listElements.pagination.size"
                            :page-count="listElements.pagination.totalPages"
                            :total="listElements.pagination.totalElements"
                            @size-change="getListData"
                            @current-change="getListData"/>
                </div>
            </div>
        </div>
        <div v-else class="flex-fill d-flex flex-column">
            <no-data/>
        </div>
    </div>
</template>