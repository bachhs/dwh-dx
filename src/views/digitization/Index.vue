<script lang="ts" src="@/scripts/queryResult/index.ts"></script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.5rem 0.8rem' }">
        <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
            <div class="d-flex align-items-center pr-3">
                <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                    <h4>
                        <i class="fas fa-search text-lightblue mr-2"></i>
                        <strong>Truy vấn kết quả TTHC</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">
                    <div class="ml-1 mr-1 d-none d-md-block">
                        <el-select v-if="organization" style="width: 15rem"
                            filterable placeholder="Tổ chức.." size="large">
                            <el-option label="Tất cả" value="" />
                            <el-option v-for="item in organization" 
                                :key="item.id" :label="item.name"
                                :value="item.id" />
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
                                <Plus />
                            </el-icon>
                        </el-button>

                        <el-button size="large" type="primary">
                            <el-icon :size="20" style="vertical-align: middle">
                                <Refresh />
                            </el-icon>
                        </el-button>

                        <el-button size="large" type="primary"
                            @click="centerDialogVisible = true">
                            <el-icon :size="20" style="vertical-align: middle">
                                <Filter />
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
                                        <th class="pl-0 pt-2 pb-2 text-center text-nowrap">
                                            <button>
                                                <div>TGQD HỒ SƠ</div>
                                            </button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>NGƯỜI ĐĂNG KÝ</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>TÊN CƠ QUAN / TỔ CHỨC</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>BỘ PHẬN ĐANG XỬ LÝ</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>THANH TOÁN LỆ PHÍ</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>ĐỊA CHỈ</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>SỐ CMND</button>
                                        </th> 
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>SỐ LIÊN HỆ</button>
                                        </th>
                                        <th class="pl-0 pt-2 pb-2 text-center align-middle text-nowrap">
                                            <button>EMAIL</button>
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
                                        <td class="pl-2 text-left text-nowrap">
                                            <div>10 ngày làm việc</div>
                                            <div>- Ngày tiếp nhận:02/02/2023 09:02:58</div>
                                            <div>- Hạn xử lý:16/02/2023 09:02:58</div>
                                            <div>- Ngày hẹn trả:15/02/2023 17:00:00</div>
                                            <div>- Ngày có KQ:08/02/2023 14:06:51</div>
                                            <div>- Ngày trả KQ:08/02/2023 14:17:20</div>
                                        </td>
                                        <td class="pl-2 text-left text-nowrap">
                                            NGUYỄN HƯNG HÀ
                                        </td>
                                        <td class="pl-2 text-center">
                                            Sở Tài nguyên và Môi trường
                                        </td>
                                        <td class="pl-2 text-left">
                                            Trần Thị Thanh - Bộ phận TN và TKQ Sở TTTT- TKQ ngày08/02/2023 14:17:20
                                        </td>
                                        <td class="pl-2 text-center">
                                            Không có lệ phí
                                        </td>
                                        <td class="pl-2 text-left" style="min-width: 200px;">
                                            tổ 8, Phường Ỷ La, TP Tuyên Quang, Tỉnh Tuyên Quang
                                        </td>
                                        <td class="pl-2 text-left text-nowrap">
                                            <div>CMND 070659299</div>
                                            <div>Ngày cấp 25/03/2016</div>
                                            <div>Nơi cấp Tuyên Quang</div>
                                        </td> 
                                        <td class="pl-2 text-left">
                                            0986198996
                                        </td>
                                        <td class="pl-2 text-left">
                                            nhha.tnmt@gmail.com
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

        <el-dialog v-model="centerDialogVisible" title="Tìm kiếm nâng cao" width="30%" center>
            <div>
                <div class="mb-3">
                    <div>
                        <strong>Số hồ sơ</strong>
                    </div>
                    <div class="mt-2">
                        <el-input size="large" placeholder="Số hồ sơ.."/>
                    </div> 
                </div> 
                <div class="mb-3">
                    <div>
                        <strong>Tên cơ quan/ cá nhân nộp</strong>
                    </div>
                    <div class="mt-2">
                        <el-input size="large" placeholder="Tên cơ quan/ cá nhân.."/>
                    </div> 
                </div> 
                <div class="mb-3">
                    <div>
                        <strong>CMND người nộp</strong>
                    </div>
                    <div class="mt-2">
                        <el-input size="large" placeholder="CMND.."/>
                    </div> 
                </div> 
                <div class="mb-3">
                    <div>
                        <strong>Di động người nộp</strong>
                    </div>
                    <div class="mt-2">
                        <el-input size="large" placeholder="Di động người nộp.."/>
                    </div> 
                </div> 
                <div class="mb-3">
                    <div>
                        <strong>Về việc</strong>
                    </div>
                    <div class="mt-2">
                        <el-input size="large" placeholder="Về việc.."/>
                    </div> 
                </div> 
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">Đóng</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        Tìm kiếm
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>