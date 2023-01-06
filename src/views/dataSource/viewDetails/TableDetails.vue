<script
    lang="ts"
    src="@/scripts/dataSource/viewDetails/tableDetail.ts"></script>
<template>
    <div class="w-100vw  overflow-hidden"
        v-loading="isLoading">
        <div class="d-flex w-100">
            <div class="d-flex align-items-center">
                <el-icon class="text-primary"><InfoFilled /></el-icon>
                <div class="ml-1 text-nowrap">
                    Loại bảng: <span v-if="tableInfo && tableInfo.tableType">{{tableInfo.tableType}}</span> • Bao gồm {{columns.length}} Cột
                </div>
            </div>
            <div class="flex-fill ml-3 d-flex align-items-center">
                <el-icon class="text-primary"><PriceTag /></el-icon>
                <div class="ml-1 text-nowrap overflow-hidden">
                    <el-button class="button-new-tag ml-1" size="small">
                        Xem tất cả
                    </el-button>
                    <TagsEdit class="d-inline" :tagList="tagList"/>
                </div>
            </div>
        </div>
        <el-tabs type="border-card" class="tab-data mt-3">
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-columns"></i>
                            </div>
                            <div class="ml-1">Schema</div>
                        </div>
                    </div>
                </template>
                <div>
                    <SchemaView :viewSettings="props.viewSettings" :columns="columns"/>                    
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-history"></i>
                            </div>
                            <div class="ml-1">
                                Lịch sử và tác vụ
                                <span class="ml-1 label label-counting">5</span>
                            </div>
                        </div>
                    </div>
                </template>
                <div>
                    <ActivityFeedsAndTaskView :viewSettings="props.viewSettings"/>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-vial"></i>
                            </div>
                            <div class="ml-1">Dữ liệu mẫu</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div
                                class="flex-fill d-flex flex-column"
                                :style="`height: ${contentNodataHeight};`">
                                <SampleDataView :viewSettings="props.viewSettings" />
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-caret-square-right"></i>
                            </div>
                            <div class="ml-1">Truy vấn</div>
                        </div>
                    </div>
                </template>
                <div>
                    <QueriesView :viewSettings="props.viewSettings"/>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-tasks"></i>
                            </div>
                            <div class="ml-1">Hồ sơ & Chất lượng dữ liệu</div>
                        </div>
                    </div>
                </template>
                <div>
                    <ProfilerDataQualityView :viewSettings="props.viewSettings" :columns="columns"/>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-project-diagram"></i>
                            </div>
                            <div class="ml-1">Lineage</div>
                        </div>
                    </div>
                </template>
                <div>
                    <LineageView :viewSettings="props.viewSettings"/>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-list"></i>
                            </div>
                            <div class="ml-1">Thuộc tính tùy chỉnh</div>
                        </div>
                    </div>
                </template>
                <div>
                    <CustomerPropertiesView :viewSettings="props.viewSettings"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped lang="scss">
.tab-data {
    .el-tabs__item {
        .custom-tabs-label {
            .label-counting {
                background: #909399 !important;
                color: #fff;
            }
        }

        &.is-active {
            .custom-tabs-label {
                color: #001f3f !important;

                .label-counting {
                    background: #001f3f
                        linear-gradient(180deg, #26415c, #001f3f) repeat-x !important;
                    color: #fff;
                }
            }
        }
    }
}

.table-customize {
    thead {
        tr {
            th {
                box-shadow: none !important;
                background-color: #d3eaff !important;
                border: none !important;

                &:before {
                    display: none !important;
                }
            }
        }
    }

    tbody {
        tr {
            &:nth-of-type(even) {
                background-color: #e5e5e5;
            }

            .link-schema {
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
