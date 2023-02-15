<script lang="ts" src="@/scripts/beforeDigitization/dataStore/index.ts"></script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.5rem 0.8rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center pr-3">
                <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                    <h4>
                        <i class="fas fa-database text-lightblue mr-2"></i>
                        <strong>Kho dữ liệu</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">
                    <div class="ml-1 mr-1 d-none d-md-block">
                        <el-select v-if="organization"
                            style="width: 15rem"
                            filterable
                            placeholder="Tổ chức.."
                            size="large">
                            <el-option label="Tất cả tổ chức" value="" />
                            <el-option v-for="item in organization"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </div> 
                    <div class="ml-1 mr-1 d-none d-md-block">
                        <el-select
                            style="width: 15rem"
                            filterable
                            placeholder="Nguồn dữ liệu.."
                            size="large">
                            <el-option label="Tất cả nguồn dữ liệu" value="" />
                            <el-option label="API" value="api" />
                            <el-option label="DATABASE" value="database" />
                            <el-option label="EMBEDLINK" value="embedlink" />
                            <el-option label="FILE SERVER" value="filerServer" />
                        </el-select>
                    </div> 
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
                                        <th style="width: 1%;"></th>
                                        <th style="width: 1%;" class="pl-0 pt-2 pb-2 text-center text-nowrap align-middle">
                                            <button>STT</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                            <button>TÊN FILE</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-nowrap text-center align-middle">
                                            <button>LOẠI FILE</button>
                                        </th>
                                        <th style="width: 1%;" class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                            <button>TỔ CHỨC</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 align-middle text-center text-nowrap">
                                            <button>NGUỒN DỮ LIỆU</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                            <button>KHỞI TẠO</button>
                                        </th>
                                        <th style="width: 1%;" class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                            <button>THAO TÁC</button>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class=" ">
                                    <tr v-for="(itemData, itemIndex) in 99" :key="itemIndex">
                                        <td class="p-0 pl-1 text-left">
                                            <img v-if="itemIndex % 2 === 0" src="/custom-img/list-icon/pdf-icon.png"
                                                style="height: 2.5rem;" />
                                            <img v-else src="/custom-img/list-icon/xlsx-icon.png"
                                                style="height: 2.5rem;" />
                                        </td>
                                        <td class="pl-2 text-center">#{{ itemData }}</td>
                                        <td class="pl-2 text-left">
                                            <div>2.{{(Math.random() + 1).toString(36).substring(4)}}.000.00.00.H60.{{itemIndex % 2 === 0 ? 'pdf' : 'xlsx'}}</div>
                                            <!-- <div class="text-muted" style="font-size: 85%;">
                                                2.001098.000.00.00.H60 - Cấp Giấy phép thiết lập trang thông tin điện tử tổng hợp
                                            </div> -->
                                        </td>
                                        <td class="pl-2 text-center">
                                            <div class="text-uppercase">{{itemIndex % 2 === 0 ? 'pdf' : 'xlsx'}}</div>
                                        </td>
                                        <td class="pl-2 text-nowrap">
                                            <div>Sở thông tin & Truyền thông</div>
                                        </td>
                                        <td class="pl-2 text-center">
                                            TỪ API
                                        </td>
                                        <td class="pl-2 text-left text-nowrap" style="width: 1%;">
                                            <div><i class="fas fa-plus-circle text-primary"></i> {{$filters.prettyDate($filters.randomDate())}}</div>
                                            <div><i class="fas fa-user text-primary"></i> dtc_user</div>
                                        </td>
                                        <td class="text-nowrap">
                                            <el-tooltip class="box-item" effect="dark" content="Xem nhanh" placement="top">                                                
                                                <el-button type="primary">
                                                    <i class="fas fa-eye"></i>
                                                </el-button>
                                            </el-tooltip>
                                            <el-tooltip class="box-item" effect="dark" content="Số hoá tài liệu này" placement="top"> 
                                                <el-button>
                                                    <i class="fas fa-upload"></i>
                                                </el-button>
                                            </el-tooltip>
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