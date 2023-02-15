<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.8rem 0.1rem 0.8rem 1rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center pr-3">
                <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                    <h4>
                        <i class="fas fa-link text-lightblue mr-2"></i>
                        <strong>Chia sẻ dữ liệu KQ TTHC</strong>
                    </h4>
                </div>
                <div class="d-flex align-items-center">

                </div>
            </div>
            <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
                <div class="flex-fill d-flex flex-column">
                    <el-scrollbar class="w-100 flex-fill">
                        <div class="mt-0 mr-3">
                            <div class="mb-5">
                                <div style="line-height: 1.4rem;">
                                    <p class="text-muted">
                                        Chúng tôi cung cấp các điều khiển dưới dạng Restful API. Thật dễ dàng và thuận tiện để tích hợp tương tác với dtcsolution từ ứng dụng của bạn.<br/>
                                        Bạn có thể dễ dàng gửi các yêu cầu API để lấy tất cả dữ liệu được chia sẻ, tắt nó, v.v.
                                    </p>
                                </div>
                                <hr />
                                <div class="d-flex align-items-center">
                                    <div>
                                        <el-switch v-model="isApiEnabled" class="m-0"></el-switch>
                                    </div>
                                    <div class="ml-3 pt-1 flex-fill text-muted">
                                        Cho phép truy cập vào API dtcsolution
                                    </div>
                                </div>
                                <div class="mt-3" style="max-width: 50rem;" v-if="isApiEnabled">
                                    <div class="text-muted">
                                        <p>Để thực hiện yêu cầu API REST, bạn kết hợp các phương thức HTTP&nbsp;<code>GET</code>,&nbsp;<code>POST</code>,&nbsp;<code>PUT</code>,&nbsp;<code>PATCH</code>,
                                            hoặc&nbsp;<code>DELETE</code>&nbsp;, URL tới dịch vụ API, URI tới tài nguyên để truy vấn, gửi dữ liệu tới, cập nhật hoặc xóa và một hoặc nhiều&nbsp;<strong>HTTP
                                                request headers</strong>.</p>
                                    </div>
                                    <table class="table table-bordered table-sm text-muted">
                                        <tbody>
                                            <tr>
                                                <td style="width: 1%;" class="text-nowrap">
                                                    1.URL dịch vụ API
                                                </td>
                                                <td class="pl-5">
                                                    {{endpoint}}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="width: 1%; vertical-align: middle;" class="text-nowrap">2.API
                                                    Token</td>
                                                <td class="pl-5 text-nowrap" style="vertical-align: middle;">
                                                    <span v-if="token.apiToken" class="text-nowrap">{{
                                                        token.apiToken
                                                    }}</span>
                                                    <el-button size="small" class="m-0 ml-3 p-2" type="primary" round
                                                        @click="copyToClipboard(token.apiToken)">
                                                        <i class="el-icon-copy-document"></i> Sao chép
                                                    </el-button>
                                                    <el-button size="small" class="m-0 ml-1 p-2" type="primary" round
                                                        @click="enabledApi(true)">
                                                        <i class="el-icon-refresh"></i> Làm mới
                                                    </el-button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="mt-5">
                                        <h5>Giới hạn tên miền & địa chỉ IP</h5>
                                        <div>
                                            <p class="mb-2">Chúng tôi chỉ chấp nhận yêu cầu từ miền hoặc
                                                 IP trong danh sách bên dưới.</p>
                                            <div class="d-flex align-items-start">
                                                <div class="mr-2">
                                                    <el-input placeholder="Vui lòng nhập tên miền hoặc địa chỉ IP"
                                                        v-model="domainOrIpInput" @keyup.enter.native="addRestrictions"
                                                        size="small" style="width: 20rem;"></el-input>
                                                    <div class="text-danger" style="font-size:80%; margin-top: 3px;"
                                                        v-if="!domainOrIpInputIsValid">
                                                        <i>Vui lòng nhập tên miền hoặc  Địa chỉ IP hợp lệ</i>
                                                    </div>
                                                </div>
                                                <div>
                                                    <el-button type="primary" size="small" @click="addRestrictions"
                                                        :disabled="domainOrIpInput === ''">
                                                        <i class="el-icon-circle-plus-outline"></i>
                                                        Thêm bản ghi
                                                    </el-button>
                                                </div>
                                            </div>
                                            <div class="mt-4"
                                                v-if="domainOrIpList !== null && domainOrIpList.length > 0">
                                                <el-tag closable class="mr-2 mb-2" @close="removeRestrictions(item)"
                                                    :key="itemIndex" v-for="(item, itemIndex) in domainOrIpList">
                                                    {{ item }}
                                                </el-tag>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="mt-5">
                                        <h5>Tài liệu API</h5>
                                        <div>
                                            <p>Để sử dụng API dtcsolution, vui lòng tham khảo tài liệu về API tại liên kết bên dưới. Tài liệu tham khảo bao gồm các thông số API chi tiết và cung cấp công cụ Kiểm tra.</p>
                                            <p>Tài liệu: <a target="_blank"
                                                    href="https://docs.dtcsolution.vn/system-features/dtcsolution-apis/">https://docs.dtcsolution.vn/system-features/dtcsolution-apis/</a>
                                            </p>
                                            <p>Kiểm tra API và các chức năng khác: <a target="_blank"
                                                    href="https://api-m.dtcsolution.vn/index.html">https://api-m.dtcsolution.vn/index.html</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </el-card>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const endpoint = ref('https://api-m.dtcsolution.vn');
const isApiEnabled = ref(true);
const token = ref({
    apiToken: 'lsnHoOTxq5rFDaPDbjOLUxPCNXOozj7hbgHlnInon6gca6Q5nfurMbMR6wK6xUN26lmFhgBmL4-prEO_XglJ2w',
    clientId: null,
    secretKey: null,
});
const domainOrIpInput = ref('');
const domainOrIpInputIsValid = ref(true);
const domainOrIpList = ref([]);
const firstLoad = ref(true);

const copyToClipboard = (item: any) => {

};
const enabledApi = (item: any) => {

};
const addRestrictions = () => {

};
const removeRestrictions = (item: any) => {

};
</script>


<style scoped>
.v-application code {
    background-color: #42a5f5;
    color: #ffffff;
    padding: 0 .4rem;
}
</style>