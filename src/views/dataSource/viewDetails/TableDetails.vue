<script setup lang="ts">
import { ref } from "vue";
const activityFilter = ref("All Activity");
const contentHeight = "calc(100vh - 23rem)";
const contentNodataHeight = "calc(100vh - 24rem)";
const contentNodataWithFilterHeight = "calc(100vh - 28rem)";
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
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div class="mb-4">
                                <el-input
                                    placeholder="Find in table"
                                    class="input-with-select"
                                >
                                    <template #append>
                                        <el-button>
                                            <el-icon><Search /></el-icon>
                                        </el-button>
                                    </template>
                                </el-input>
                            </div>
                            <table
                                class="table table-borderless table-customize table-head-fixed text-nowrap table-striped"
                            >
                                <thead>
                                    <tr>
                                        <th>Column name</th>
                                        <th>Type</th>
                                        <th>Description</th>
                                        <th>Tags</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="column in listColumns"
                                        :key="column.name"
                                    >
                                        <td>
                                            <strong
                                                class="text-navy"
                                                style="font-size: 1rem"
                                            >
                                                <i
                                                    class="fa-solid fa-key"
                                                    v-if="column.isPrimaryKey"
                                                ></i>
                                                {{ column.name }}
                                            </strong>
                                        </td>
                                        <td>{{ column.dataType }}</td>
                                        <td>No description</td>
                                        <td>
                                            <el-button size="small">
                                                <div>
                                                    <el-icon><Plus /></el-icon>
                                                    <span class="ml-1"
                                                        >Add tag</span
                                                    >
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
                            <div class="ml-1">
                                Activity Feeds & Tasks
                                <span class="ml-1 label label-counting">5</span>
                            </div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mb-3">
                            <el-radio-group v-model="activityFilter">
                                <el-radio-button label="All Activity" />
                                <el-radio-button label="Mentions" />
                            </el-radio-group>
                        </div>
                        <div class="mr-3 pl-1 pt-2">
                            <div
                                class="flex-fill d-flex flex-column"
                                :style="`height: ${contentNodataWithFilterHeight};`"
                            >
                                <no-data />
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
                                <i class="fas fa-vial"></i>
                            </div>
                            <div class="ml-1">Sample Data</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div
                                class="flex-fill d-flex flex-column"
                                :style="`height: ${contentNodataHeight};`"
                            >
                                <no-data />
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
                            <div class="ml-1">Queries</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div
                                class="flex-fill d-flex flex-column"
                                :style="`height: ${contentNodataHeight};`"
                            >
                                <no-data />
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
                                <i class="fas fa-tasks"></i>
                            </div>
                            <div class="ml-1">Profiler & Data Quality</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div class="mb-2">
                                <div class="row">
                                    <div class="col-12 col-sm-6 col-md-3">
                                        <div class="info-box">
                                            <span
                                                class="info-box-icon bg-info elevation-1"
                                                ><i class="fas fa-list-ol"></i
                                            ></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text"
                                                    >Row Count</span
                                                >
                                                <span class="info-box-number">
                                                    10 rows
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 col-sm-6 col-md-3">
                                        <div class="info-box mb-3">
                                            <span
                                                class="info-box-icon bg-navy elevation-1"
                                                ><i class="fas fa-columns"></i
                                            ></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text"
                                                    >Column Count</span
                                                >
                                                <span class="info-box-number"
                                                    >4 columns</span
                                                >
                                            </div>
                                        </div>
                                    </div>

                                    <div class="clearfix hidden-md-up"></div>
                                    <div class="col-12 col-sm-6 col-md-3">
                                        <div class="info-box mb-3">
                                            <span
                                                class="info-box-icon bg-success elevation-1"
                                                ><i class="fas fa-tablets"></i
                                            ></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text"
                                                    >Table Sample %</span
                                                >
                                                <span class="info-box-number"
                                                    >100%</span
                                                >
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-12 col-sm-6 col-md-3">
                                        <div class="info-box mb-3">
                                            <span
                                                class="info-box-icon bg-lightblue elevation-1"
                                                ><i class="far fa-thumbs-up"></i
                                            ></span>
                                            <div class="info-box-content">
                                                <span class="info-box-text"
                                                    >Status</span
                                                >
                                                <span class="info-box-number">
                                                    <span class="text-success"
                                                        >Success 0</span
                                                    >
                                                    <span
                                                        class="text-orange ml-2"
                                                        >Aborted 0</span
                                                    >
                                                    <span
                                                        class="text-danger ml-2"
                                                        >Failed 0</span
                                                    >
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mb-3">
                                <el-input
                                    placeholder="Find in table"
                                    class="input-with-select"
                                >
                                    <template #append>
                                        <el-button>
                                            <el-icon><Search /></el-icon>
                                        </el-button>
                                    </template>
                                </el-input>
                            </div>
                            <table
                                class="table table-borderless table-customize table-head-fixed text-nowrap table-stripped"
                            >
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
                                    <tr
                                        v-for="column in listColumns"
                                        :key="column.name"
                                    >
                                        <td>
                                            <el-button
                                                link
                                                class="text-navy"
                                                @click="
                                                    $emit('processingEvent', {
                                                        eventName:
                                                            'ColumnDetails',
                                                        dataItem: {},
                                                    })
                                                "
                                            >
                                                <strong>{{
                                                    column.name
                                                }}</strong>
                                            </el-button>
                                        </td>
                                        <td>
                                            <div>{{ column.dataType }}</div>
                                        </td>
                                        <td>
                                            <div
                                                data-testid="profiler-progress-bar-container"
                                                class="ant-row"
                                            >
                                                <div>
                                                    <el-progress
                                                        :stroke-width="10"
                                                        :percentage="70"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                data-testid="profiler-progress-bar-container"
                                                class="ant-row"
                                            >
                                                <div>
                                                    <el-progress
                                                        :stroke-width="10"
                                                        :percentage="50"
                                                        color="#5cb87a"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div
                                                data-testid="profiler-progress-bar-container"
                                                class="ant-row"
                                            >
                                                <div>
                                                    <el-progress
                                                        :stroke-width="10"
                                                        :percentage="20"
                                                        color="#f56c6c"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-center">1</td>
                                        <td class="text-center">
                                            <a class="text-navy" href="#">0</a>
                                        </td>
                                        <td class="text-center">
                                            <span>
                                                <i
                                                    class="fas fa-circle text-success"
                                                ></i>
                                                <span class="ml-1">0</span>
                                            </span>
                                            <span class="ml-3">
                                                <i
                                                    class="fas fa-circle text-warning"
                                                ></i>
                                                <span class="ml-1">0</span>
                                            </span>
                                            <span class="ml-3">
                                                <i
                                                    class="fas fa-circle text-danger"
                                                ></i>
                                                <span class="ml-1">0</span>
                                            </span>
                                        </td>
                                        <td></td>
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
                                <i class="fas fa-project-diagram"></i>
                            </div>
                            <div class="ml-1">Diagram</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div
                                class="flex-fill d-flex flex-column"
                                :style="`height: ${contentNodataHeight};`"
                            >
                                <no-data />
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
                                <i class="fas fa-list"></i>
                            </div>
                            <div class="ml-1">Custom Properties</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar :style="`height: ${contentHeight};`">
                        <div class="mr-3 pl-1 pt-2">
                            <div
                                class="flex-fill d-flex flex-column"
                                :style="`height: ${contentNodataHeight};`"
                            >
                                <no-data />
                            </div>
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
