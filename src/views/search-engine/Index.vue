<script lang="ts" src="@/scripts/search-engine">

</script>
<template>
    <div class="box-card p-1 w-100 flex-fill d-flex flex-column">        
        <section class="row row-eq-height mt-0 flex-fill">
            <div class="col-2">
                <el-card class="h-100"
                    :body-style="{ padding: '0.5rem 0.8rem' }">
                    <!-- <h5 class="mb-3 ml-2">
                        <i class="fas fa-search text-navy"></i> 
                        <strong>Công cụ tìm kiếm</strong>
                    </h5> -->
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                            data-accordion="false">
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><House /></el-icon>
                                    <span>Tổng quan</span>
                                </el-button>
                            </li>
                            <li class="nav-header text-muted ml-0 pl-2 mb-1">CONFIGURE</li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Chỉ mục</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Đề xuất truy vấn</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Từ điển</span>
                                </el-button>
                            </li>
                            <li class="nav-header text-muted ml-0 pl-2 mb-1">OBSEVER</li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Phân tích</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>A/B Testing</span>
                                </el-button>
                            </li>
                            <li class="nav-header text-muted ml-0 pl-2 mb-1">ENHANCE</li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Các quy tắc</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Phát hiện từ đồng nghĩa</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Xếp hạng lại</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Cá nhân hoá</span>
                                </el-button>
                            </li>
                            <li class="nav-header text-muted ml-0 pl-2 mb-1">API MONITORING</li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Cách sử dụng</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Hoạt động</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Hiệu năng</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Trạng thái</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Nhật ký</span>
                                </el-button>
                            </li>
                            <li class="nav-header text-muted ml-0 pl-2 mb-1">NGUỒN DỮ LIỆU</li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Các sự kiện</span>
                                </el-button>
                            </li>
                            <li class="nav-item mb-2">
                                <el-button link href="iframe.html">
                                    <el-icon class="nav-icon ml-0 text-primary"><ArrowRight /></el-icon>
                                    <span>Các chỉ số</span>
                                </el-button>
                            </li>
                        </ul>
                    </nav>
                </el-card>
            </div>
            <div class="col-10">
                <el-card class="h-100"
                    :body-style="{ padding: '0.5rem 0.8rem' }">
                    <div class="d-flex align-items-center">
                        <div class="flex-fill">
                            <h4 class="mb-1 ml-2">
                                <i class="fas fa-indent text-primary"></i> 
                                <strong class="ml-2">Chỉ mục</strong>
                            </h4>
                        </div>
                        <div>
                            <div class="text-muted mb-1"><small>Application</small></div>
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    DTC SOLUTIONS 1
                                    <el-icon class="el-icon--right">
                                        <arrow-down />
                                    </el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>DTC SOLUTIONS 1</el-dropdown-item>
                                        <el-dropdown-item>DTC SOLUTIONS 2</el-dropdown-item>
                                        <el-dropdown-item>DTC SOLUTIONS 3</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </div>
                    <hr class="mt-1 mb-2"/>
                    <div>
                        <span>No. records</span>
                        <span class="ml-2">0</span>
                        <span class="ml-3">avg. record size</span>
                        <span class="ml-2">0B</span>
                    </div>
                    <div class="mt-3">
                        <el-select placeholder="New...">
                            <el-option label="Index" value="Index" />
                            <el-option label="Replica" value="Replica" />
                        </el-select>
                        
                        <el-select class="ml-2" placeholder="Add records...">
                            <el-option label="Upload file" :value="1" />
                            <el-option label="Use the API" :value="2" />
                            <el-option label="Add manually" :value="3" />
                        </el-select>
                        
                        <el-select class="ml-2" placeholder="Manage index...">
                            <el-option label="Upload file" :value="1" />
                            <el-option label="Use the API" :value="2" />
                            <el-option label="Add manually" :value="3" />
                        </el-select>

                        <el-button class="ml-2">
                            <el-icon><CopyDocument /></el-icon>
                        </el-button>
                        <el-button class="ml-2">
                            <el-icon><Refresh /></el-icon>
                        </el-button>
                    </div>
                    <div class="mt-2">
                        <el-tabs value="Browse">
                            <el-tab-pane label="Browse" name="Browse">Browse</el-tab-pane>
                            <el-tab-pane label="Configuration" name="Configuration">Configuration</el-tab-pane>
                            <el-tab-pane label="Replicas" name="Replicas">Replicas</el-tab-pane>
                            <el-tab-pane label="Search API Logs" name="SearchAPILogs">Search API Logs</el-tab-pane>
                            <el-tab-pane label="Stats" name="Stats">Stats</el-tab-pane>
                            <el-tab-pane label="UI Demos" name="UIDemos">UI Demos</el-tab-pane>
                        </el-tabs>
                    </div>
                </el-card>
            </div>
        </section>
    </div>
</template>