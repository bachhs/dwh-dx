<script
    lang="ts"
    src="@/scripts/dataSource/viewDetails/tablesAndViews.ts"
></script>
<template>
    <el-tabs type="border-card" class="tab-data">
        <el-tab-pane>
            <template #label>
                <div class="custom-tabs-label">
                    <div class="d-flex align-items-center">
                        <div>
                            <i class="fas fa-table"></i>
                        </div>
                        <div class="ml-1">
                            Table
                            <span class="ml-1 label label-counting">292</span>
                        </div>
                    </div>
                </div>
            </template>
            <div>
                <el-scrollbar style="height: calc(100vh - 21rem)">
                    <div class="mr-3 pl-1 pt-2">
                        <div class="card p-2" v-for="t in tables" :key="t.id">
                            <div>
                                <el-button
                                    link
                                    class="text-navy"
                                    @click="
                                        $emit('processingEvent', {
                                            eventName: 'TableDetails',
                                            dataItem: {},
                                        })
                                    "
                                >
                                    <span
                                        ><i
                                            class="fa-solid fa-table-cells mr-1"
                                        />
                                        <strong>{{ t.name }}</strong>
                                    </span>
                                </el-button>
                            </div>
                            <div class="text-muted">
                                Setup Prometheus monitor service(Hadoop,
                                openmetadata,datahub, keycloak ....)
                            </div>
                            <div>
                                <small class="text-muted"
                                    >demo_app.public</small
                                >
                            </div>
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
                            <i class="fas fa-glasses"></i>
                        </div>
                        <div class="ml-1">
                            View
                            <span class="ml-1 label label-counting">5</span>
                        </div>
                    </div>
                </div>
            </template>
            <div>
                <el-scrollbar style="height: calc(100vh - 21rem)">
                    <div class="mr-3 pl-1 pt-2">
                        <div class="card p-2" v-for="item in 5" :key="item">
                            <div>
                                <el-button link class="text-navy">
                                    <span
                                        ><i class="fas fa-table mr-1"></i>
                                        <strong>View {{ item }}</strong></span
                                    >
                                </el-button>
                            </div>
                            <div class="text-muted">
                                Setup Prometheus monitor service(Hadoop,
                                openmetadata,datahub, keycloak ....)
                            </div>
                            <div>
                                <small class="text-muted"
                                    >demo_app.public</small
                                >
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-tab-pane>
    </el-tabs>
</template>

<style scoped lang="scss">
.label-counting {
    font-size: 75%;
    padding: 0.1rem 0.3rem !important;
}

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
</style>
