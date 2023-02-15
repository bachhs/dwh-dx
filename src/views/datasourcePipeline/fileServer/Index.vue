<script lang="ts" src="@/scripts/datasourcePipeline/fileServer/index.ts"></script>
<template>
    <el-card
        class="box-card w-100 d-flex flex-fill flex-column"
        :body-style="{ padding: '0.8rem 1rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center">
                <div class="flex-fill d-none d-md-block">
                    <h4>
                        <i class="fas fa-fire-alt text-danger mr-2"></i>
                        <strong>Tiến trình thu thập dữ liệu từ File</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">                    
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
                        <table
                            class="table table-striped table-head-fixed text-nowrap table-borderless">
                            <thead>
                                <tr class="bg-white">
                                    <th style="width: 1%;"></th>
                                    <th
                                        class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                        <button>DỮ LIỆU NGUỒN</button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2 align-middle">
                                        <button>DỮ LIỆU ĐÍCH</button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2 text-center">
                                        <button>
                                            <div>PHÁT HIỆN SAI KHÁC</div>
                                            <div>
                                                <small >(Bản ghi lỗi / Tổng số bản ghi)</small >
                                            </div>
                                        </button>
                                    </th>
                                    <th
                                        class="pl-0 pt-2 pb-2 text-center align-middle">
                                        <button>TRẠNG THÁI</button>
                                    </th>
                                    <th
                                        class="pl-0 pt-2 pb-2 text-center align-middle"
                                        style="width: 1%">
                                        <div>ACTION</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class=" ">
                                <tr v-for="itemDemo in 99" :key="itemDemo">
                                    <td class="p-0 text-left">
                                        <img src="/custom-img/list-icon/file-icon.svg"
                                            class="ml-1"
                                            style="height: 2.5rem;" />
                                    </td>
                                    <td class="pl-2">
                                        <div>ftp://ftp.dtcsolution.vn:21</div>
                                        <div class="text-muted" style="font-size: 90%;">Sở Thông Tin Truyền Thông</div>
                                    </td>
                                    <td class="pl-2">
                                        Kho dữ liệu
                                    </td>
                                    <td class="pl-2 text-center">0/10000</td>
                                    <td class="pl-2 text-center">
                                        <!-- <span v-if="itemDemo % 2 ===  0" class="badge badge-lg bg-success">Hoàn thành</span> -->
                                        <div v-if="itemDemo % 3 ===  0"  class="pl-2" style="background-color: #fff; border-radius: 50px;">
                                            <el-progress :stroke-width="15" status="success" :percentage="100"
                                                :duration="2" >
                                                <el-button text>Hoàn thành</el-button>
                                            </el-progress>
                                        </div>
                                        <div v-else  class="pl-2" style="background-color: #fff; border-radius: 50px;">
                                            <el-progress :stroke-width="15" :percentage="70"
                                                :duration="2"
                                                :indeterminate="true" >
                                                <el-button text>Đang xử lý</el-button>
                                            </el-progress>
                                        </div>
                                    </td>
                                    <td class="pl-2 text-center">
                                        <el-button type="default" class="p-2">
                                            <i class="fas fa-stop mr-1 ml-1"></i> Tạm dừng
                                        </el-button>
                                        <el-button type="danger" class="p-2">
                                            <i class="fas fa-stop mr-1 ml-1"></i> Huỷ
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
                        <el-pagination
                            class=""
                            background
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="1000" />
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>
