<template>
    <div class="flex-fill d-flex flex-column w-100">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-list text-danger mr-2"></i>
                    <strong>Danh sách hồ sơ</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                    
                <div class="ml-1">
                    <el-button size="large" type="primary">
                        Lưu dữ liệu
                    </el-button>

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
                                    <div style="font-size: 90%;">
                                        <div class="text-puple"><strong>10 ngày làm việc</strong></div>
                                        <div class="text-primary">- Ngày tiếp nhận: <strong>02/02/2023 09:02:58</strong></div>
                                        <div class="text-orange">- Hạn xử lý: <strong>16/02/2023 09:02:58</strong></div>
                                        <div class="text-indigo">- Ngày hẹn trả: <strong>15/02/2023 17:00:00</strong></div>
                                        <div class="text-info">- Ngày có KQ: <strong>08/02/2023 14:06:51</strong></div>
                                        <div class="text-success">- Ngày trả KQ: <strong>08/02/2023 14:17:20</strong></div>
                                    </div>
                                </td>
                                <td class="pl-2 text-left text-nowrap">
                                    <strong>NGUYỄN HƯNG HÀ</strong>
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
        </div>     
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
defineEmits(['changeView']);
const props = defineProps({
    ItemSelected: { type: Object, required: false, default: null }
});
</script>