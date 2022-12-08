<script setup lang="ts">
    const listColumns = [
        { name: "id", dataType: "bigint", isPrimaryKey: true },
        { name: "name", dataType: "varchar(1)" },
        { name: "max_value_column", dataType: "varchar(1)" },
        { name: "max_value", dataType: "varchar(1)" },
    ];
</script>
<template>
    <div>
        <div>
            Type: Regular | Usage - 0th pctile | 0 Queries | 4 Columns | 1 rows
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
                    <el-scrollbar style="height: calc(100vh - 23rem);">
                        <div class="mr-3 pl-1 pt-2">
                            <table class="table table-borderless table-customize table-head-fixed text-nowrap table-striped">
                                <thead>
                                    <tr>
                                        <th>Column name</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Tags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="column in listColumns" :key="column.name">
                                        <td>
                                            <strong class="text-navy" style="font-size: 1rem;">
                                                <i class="fa-solid fa-key" v-if="column.isPrimaryKey"></i> {{column.name}}
                                            </strong>
                                        </td>
                                        <td>{{column.dataType}}</td>
                                        <td>No description</td>
                                        <td>
                                            <el-button size="small">
                                                <div>
                                                    <el-icon><Plus /></el-icon>
                                                    <span class="ml-1">Add tag</span>
                                                </div>
                                            </el-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </el-scrollbar>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-history"></i>
                            </div>
                            <div class="ml-1">Activity Feeds & Tasks <span class="ml-1 label label-counting">5</span></div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 23rem);">
                        <div class="mr-3 pl-1 pt-2">
                            
                        </div>
                    </el-scrollbar>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-vial"></i>
                            </div>
                            <div class="ml-1">Sample Data</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 23rem);">
                        <div class="mr-3 pl-1 pt-2">
                            
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
                            <div class="ml-1">Queries</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 23rem);">
                        <div class="mr-3 pl-1 pt-2">
                            
                        </div>
                    </el-scrollbar>
                </div>
            </el-tab-pane>
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-tasks"></i>
                            </div>
                            <div class="ml-1">Profiler & Data Quality</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 23rem);">
                        <div class="mr-3 pl-1 pt-2">
                            <table class="table table-borderless table-customize table-head-fixed text-nowrap table-stripped"> 
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Data Type</th>
                                        <th>Null %</th>
                                        <th>Unique %</th>
                                        <th>Distinct %</th>
                                        <th class="text-center">Value Count</th>
                                        <th class="text-center">Tests</th>
                                        <th class="text-center">Status</th>
                                        <th class="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="column in listColumns" :key="column.name">
                                        <td>
                                            <a class="text-navy" href="#">
                                                <strong>{{column.name}}</strong>
                                            </a>
                                        </td>
                                        <td>
                                            <div>{{column.dataType}}</div>
                                        </td>
                                        <td>
                                            <div data-testid="profiler-progress-bar-container" class="ant-row">
                                                <div>
                                                    <el-progress :stroke-width="10" :percentage="70"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div data-testid="profiler-progress-bar-container" class="ant-row">
                                                <div>
                                                    <el-progress :stroke-width="10" :percentage="50" color="#5cb87a"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div data-testid="profiler-progress-bar-container" class="ant-row">
                                                <div>
                                                    <el-progress :stroke-width="10" :percentage="20" color="#f56c6c"/>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">1</td>
                                        <td class="text-center">
                                            <a class="text-navy" href="#">0</a>
                                        </td>
                                        <td class="text-center">
                                            <span>
                                                <i class="fas fa-circle text-success"></i>
                                                <span class="ml-1">0</span>
                                            </span>
                                            <span class="ml-3">
                                                <i class="fas fa-circle text-warning"></i>
                                                <span class="ml-1">0</span>
                                            </span>
                                            <span class="ml-3">
                                                <i class="fas fa-circle text-danger"></i>
                                                <span class="ml-1">0</span>
                                            </span>
                                        </td>
                                        <td>
                                            
                                        </td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                    </el-scrollbar>
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
                    background: #001f3f linear-gradient(180deg, #26415c, #001f3f) repeat-x !important;
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