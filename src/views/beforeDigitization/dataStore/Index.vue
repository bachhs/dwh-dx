
import { CirclePlus } from '@element-plus/icons-vue';


import { Upload } from '@element-plus/icons-vue';


import { Coin } from '@element-plus/icons-vue';


import { CopyDocument } from '@element-plus/icons-vue';


import { ArrowLeftBold } from '@element-plus/icons-vue';

<script lang="ts" src="@/scripts/beforeDigitization/dataStore/index.ts"></script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.8rem 1rem' }">
        <div class="flex-fill d-flex flex-column w-100">
            <div class="d-flex align-items-center">
                <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-store text-danger mr-2"></i>
                    <strong>Kho dữ liệu</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">
                <!-- <div class="ml-1">
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
                                    </div> -->
                </div>
            </div>
            <div class="flex-fill d-flex flex-column w-100 pt-2 pb-0">
                <div class="row row-eq-height">
                    <div class="col-12 col-md-3">
                        <el-card style="height: calc(100vh - 10.5em);">
                            <div class="header d-flex">
                                <div class="flex-fill">
                                    <el-button class="mr-1" link type="primary">
                                        <i class="fas fa-database fa-2x"></i>
                                    </el-button>
                                    <el-button class="mr-1" link>
                                        <el-icon size="30">
                                            <DocumentCopy />
                                        </el-icon>
                                    </el-button>
                                </div>
                                <div>
                                    <el-button link>
                                        <el-icon size="30">
                                            <FolderOpened />
                                        </el-icon>
                                    </el-button>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <div class="d-flex align-items-center">
                                    <div class="mr-1">
                                        <el-icon class="mt-1">
                                            <ArrowLeftBold />
                                        </el-icon>
                                    </div>
                                    <div>
                                        <i class="fas fa-database text-navy mr-1"></i> Default
                                    </div>
                                </div>
                                <div>
                                    <div class="mt-2 d-flex align-items-center">
                                        <div class="flex-fill">
                                            <strong>Tables(2)</strong>
                                        </div>
                                        <div>
                                            <el-button link type="primary">
                                                <el-icon size="20">
                                                    <Plus />
                                                </el-icon>
                                            </el-button>
                                            <el-button link>
                                                <el-icon size="20">
                                                    <Refresh />
                                                </el-icon>
                                            </el-button>
                                        </div>
                                    </div>
                                    <div class="mt-2">
                                        <el-input placeholder="Lọc dữ liệu..." />
                                    </div>
                                    <div class="mt-2">
                                        <ul style="list-style-position: outside; list-style-type: none;"
                                            class="m-0 ml-0 p-0">
                                            <li class="pt-1">
                                                <el-button link>
                                                    <i class="fas fa-table text-navy mr-2"></i> Employee
                                                </el-button>
                                            </li>
                                            <li class="pt-1">
                                                <el-button link>
                                                    <i class="fas fa-table text-navy mr-2"></i> Pokes
                                                </el-button>
                                            </li>
                                            <li class="pt-1">
                                                <el-button link>
                                                    <i class="fas fa-table text-navy mr-2"></i> Pokes
                                                </el-button>
                                            </li>
                                            <li class="pt-1">
                                                <el-button link>
                                                    <i class="fas fa-table text-navy mr-2"></i> Pokes
                                                </el-button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                    <div class="col-12 col-md-9">
                        <el-card style="height: calc(100vh - 10.5em);">
                            <h4 class="d-flex align-items-center">
                                <el-icon class="text-primary">
                                    <Document />
                                </el-icon>
                                <strong class="ml-2">File browser</strong>
                            </h4>
                            <div class="mt-2 d-flex align-items-center">
                                <div>
                                    <el-input placeholder="Tìm kiếm file..." />
                                </div>
                                <div class="ml-2 flex-fill">
                                    <el-dropdown trigger="click">
                                        <el-button>
                                            <el-icon><Setting /></el-icon>
                                            <span> Thao tác </span>
                                            <el-icon class="el-icon--right"><arrow-down /></el-icon>
                                        </el-button>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item :icon="Plus">Action 1</el-dropdown-item>
                                                <el-dropdown-item :icon="CirclePlusFilled">
                                                    Action 2
                                                </el-dropdown-item>
                                                <el-dropdown-item :icon="CirclePlus">Action 3</el-dropdown-item>
                                                <el-dropdown-item :icon="Check">Action 4</el-dropdown-item>
                                                <el-dropdown-item :icon="CircleCheck">Action 5</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>

                                    <el-button class="ml-2">
                                        <el-icon><CopyDocument /></el-icon>
                                        <span> Sao chép Path </span> 
                                    </el-button>

                                    <el-button class="ml-2">
                                        <el-icon><Coin /></el-icon>
                                        <span> Mở trong trình nhập </span> 
                                </el-button>
                            </div>
                            <div>
                                <el-button type="primary" class="ml-2">
                                    <el-icon><UploadFilled /></el-icon>
                                    <span> Tải lên </span> 
                                </el-button>
                                <el-button class="ml-2">
                                    <el-icon><Plus /></el-icon>
                                    <span> Tạo mới </span> 
                                </el-button>
                            </div>
                        </div>
                        <div class="mt-3">
                            <el-breadcrumb>
                                <el-breadcrumb-item :to="{ path: '/' }"><i class="fas fa-home text-navy"></i> Home</el-breadcrumb-item>
                                <el-breadcrumb-item>dx_show</el-breadcrumb-item>
                                <el-breadcrumb-item>raw</el-breadcrumb-item>
                                <el-breadcrumb-item>sample</el-breadcrumb-item>
                            </el-breadcrumb>
                        </div>
                        <div class="mt-3">
                            <table class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                                <thead style="background-color: #dceaff;">
                                    <tr>
                                        <th style="width: 10px">
                                            <el-checkbox class="h-auto m-0 p-0" 
                                                size="large" />
                                        </th>
                                        <th>Tên file / thư mục</th>
                                        <th>Kích thước</th>
                                        <th>Người dùng</th>
                                        <th>Nhóm</th>
                                        <th>Quyền truy cập</th>
                                        <th>Ngày cập nhật</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in 12" :key="item">
                                        <td>1.</td>
                                        <td>Update software</td>
                                        <td>
                                            {{Math.round(((Math.random() * (100 - 30) + 30) + Number.EPSILON) * 100) / 100}} MB
                                        </td>
                                        <td>justeendh</td>
                                        <td>super visor</td>
                                        <td>drwxr-xr-x</td>
                                        <td>{{ $filters.prettyDate(new Date()) }}</td>
                                    </tr> 
                                </tbody>
                                </table>
                            </div>
                        </el-card>
                        </div>
                    </div>
                    <!-- <el-scrollbar class="w-100 flex-fill">
                            <div class="mt-2 mr-3">
                                <img class="w-100" src="/sample-images/kho-du-lieu.jpg" />
                            </div>
                            </el-scrollbar>   -->
            </div>
    </div>
</el-card>
</template>