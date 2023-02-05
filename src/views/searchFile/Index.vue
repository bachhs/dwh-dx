<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column"
        :body-style="{ padding: '0.5rem 0.8rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center pr-3">
                <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                    <h4>
                        <i class="fas fa-search text-lightblue mr-2"></i>
                        <strong>Công cụ kiếm File</strong>
                    </h4>
                </div>
                <!-- <div class="d-flex align-items-center"></div> -->
            </div>
            <div class="flex-fill d-flex flex-column w-100 pt-2 pb-0">
                <div>
                    <h5 v-if="filterRequest.query" class="mb-0 text-nowrap overflow-hidden">Tìm kiếm kết quả cho từ khoá "<strong class="text-primary">{{ filterRequest.query }}</strong>"</h5>
                    <h5 v-else class="mb-0 text-nowrap overflow-hidden">Vui lòng nhập từ khoá để tìm kiếm...</h5>
                </div>
            </div>
            <div class="pb-1"  v-loading="isLoading">
                <section class="row row-eq-height mt-0 flex-fill">
                    <div class="col-20p">
                        <el-card :body-style="{ padding: '0.5rem 0.8rem' }"
                            class="position-relative"
                            style="height: calc(100vh - 12rem);">
                            <h6 class="mt-2">
                                <i class="fas fa-filter text-lightblue mr-2"></i>
                                <strong>Lọc & tìm nâng cao</strong>
                            </h6>
                            <div class="mt-1">
                                <!-- <div class="d-flex align-items-center mb-2">
                                    <div>
                                        <el-switch />
                                    </div>
                                    <div class="flex-fill ml-2 text-muted">
                                        Tìm kiếm nội dung file
                                    </div>
                                </div>
                                <div class="d-flex align-items-center mb-2">
                                    <div>
                                        <el-switch />
                                    </div>
                                    <div class="flex-fill ml-2 text-muted">
                                        Tìm kiếm đường dẫn file
                                    </div>
                                </div>
                                <hr class="mb-2"/> -->
                                <div class="mb-2">
                                    <div>
                                        <span class="text-muted ml-1" style="font-size: 85%;">Từ khoá tìm kiếm</span>
                                    </div>
                                    <div class="mt-1">
                                        <el-input v-model="filterRequest.query" class="w-100" size="large" placeholder="Nhập từ khoá tìm kiếm.."/>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <div>
                                        <span class="text-muted ml-1" style="font-size: 85%;">Tổ chức</span>
                                    </div>
                                    <div class="mt-1">
                                        <el-select v-model="filterRequest.organization_name" class="w-100" size="large" placeholder="Chọn tổ chức..">
                                            <el-option label="Tất cả" value="" />
                                            <el-option v-for="item in organization" :key="item.id" :label="item.name" :value="item.name" />
                                        </el-select>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <div>
                                        <span class="text-muted ml-1" style="font-size: 85%;">Embed link</span>
                                    </div>
                                    <div class="mt-1">
                                        <el-input v-model="filterRequest.embedded_id" class="w-100" size="large" placeholder="Embed ID.."/>
                                    </div>
                                </div>
                                <!-- <div class="mb-2">
                                    <div>
                                        <span class="text-muted ml-1" style="font-size: 85%;">Dung lượng file</span>
                                    </div>
                                    <div class="mt-1">
                                        <el-select v-model="value" class="w-100" placeholder="Chọn dung lượng file">
                                            <el-option v-for="item in 99" :key="item" :label="`Options ${item}`" :value="item" />
                                        </el-select>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <div>
                                        <span class="text-muted ml-1" style="font-size: 85%;">Ngày tải lên</span>
                                    </div>
                                    <div class="mt-1">
                                        <el-select v-model="value" class="w-100" placeholder="Chọn ngày tải lên">
                                            <el-option v-for="item in 99" :key="item" :label="`Options ${item}`" :value="item" />
                                        </el-select>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <div>
                                        <span class="text-muted ml-1" style="font-size: 85%;">Phân loại file</span>
                                    </div>
                                    <div class="mt-1">
                                        <el-select v-model="value" class="w-100" placeholder="Chọn phân loại file">
                                            <el-option v-for="item in 99" :key="item" :label="`Options ${item}`" :value="item" />
                                        </el-select>
                                    </div>
                                </div> -->
                                <div  class="mt-4">
                                    <el-button class=" w-100" size="large" type="primary" @click="searchFileData">
                                        <i class="fas fa-search"></i> <span  class="ml-2">Tìm kiếm</span>
                                    </el-button>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-80p">
                        <div class="pt-2 pl-2" style="background-color: #f3f3f3; border-radius: 5px;">
                            <el-scrollbar class="mt-1 pr-3" style="height: calc(100vh - 15.5rem);">
                                <div v-if="searchResult.data.length > 0">
                                    <div v-for="itemResult in searchResult.data" :key="itemResult"
                                        class="mb-3">
                                        <el-card :body-style="{ padding: '0.3rem 0.8rem 0.5rem' }">
                                            <div>
                                                <div class="d-flex align-items-start">
                                                    <div>
                                                        <i class="fas fa-file-text fa-3x text-lightblue mt-2"></i>
                                                    </div>
                                                    <div class="ml-3">
                                                        <div class="d-flex align-items-center">
                                                            <div class="ml-0 mb-1 mt-1">
                                                                <el-button link>
                                                                    <h6 class="m-0">
                                                                        <span class="right badge badge-danger mr-2">{{itemResult.embedded_id ? 'Embed Link': 'Upload'}}</span>
                                                                        <strong>{{itemResult.name}}</strong>
                                                                    </h6>
                                                                </el-button>
                                                            </div>
                                                        </div> 
                                                        <div class="text-muted" style="font-size: 85%;">
                                                            <strong>{{ itemResult.organization }}</strong> | Khởi tạo {{ $filters.prettyDate(itemResult.created_at) }}
                                                        </div>
                                                        <!-- <div class="text-muted" style="font-size: 85%;">
                                                            Các doanh nghiệp như Sungroup, Novaland, FPT, Dầu khí Đông Phương, Trung Nam… đang trong quá trình xin đầu tư dự án trên địa bàn tỉnh Khánh Hòa với quy mô, số vốn "khủng".
                                                        </div> -->
                                                    </div>
                                                </div> 
                                                <!-- <hr class="mb-2"/>
                                                <div class="d-flex align-items-center">
                                                    <div>
                                                        <el-icon><PriceTag /></el-icon>
                                                    </div>
                                                    <div class="ml-2">
                                                        <span class="mr-2" v-for="tagItem in 2" :key="tagItem">
                                                            #tag{{tagItem}}
                                                        </span>
                                                    </div>
                                                </div> -->
                                            </div>
                                        </el-card>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="mt-2">
                            <el-pagination
                                v-if="searchResult.data && searchResult.data.length > 0"
                                class=""
                                background
                                layout="total, sizes, prev, pager, next"
                                v-model:current-page="filterRequest.page"
                                :page-size="filterRequest.size"
                                :total="searchResult.total"
                                @size-change="searchFileData"
                                @current-change="searchFileData"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </el-card>
</template>

<script lang="ts" src="@/scripts/searchFile/index.ts"></script>