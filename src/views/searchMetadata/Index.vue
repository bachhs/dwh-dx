<script lang="ts" src="@/scripts/searchMetadata">

</script>
<template>
    <div class="box-card p-1 w-100  h-100 flex-fill d-flex flex-column">
        <div>
            <el-card :body-style="{ padding: '0.5rem 0.8rem' }">
                <div class="d-flex align-items-center">
                    <div class="flex-fill">
                        <el-input
                            class="w-100"
                            size="large"
                            placeholder="Tìm kiếm Bảng, Topics, Dashboards, Pipelines and ML Models"
                            :prefix-icon="Search"
                        />
                    </div>
                    <div class="ml-2">
                        <el-button size="large" @click="searchMeta()">
                            <el-icon><Search /></el-icon> 
                            <span class="ml-2">Tìm kiếm</span>
                        </el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <section class="row row-eq-height mt-2 flex-fill">
            <div class="col-2">
                <el-card :body-style="{ padding: '0rem 0rem 0.5rem 0.8rem' }">
                    <el-scrollbar class="mt-2 pr-3" 
                        style="height: calc(100vh - 10.8rem);">
                        <nav class="mt-0">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                <li class="nav-item mb-2">
                                    <el-button link href="iframe.html">
                                        <el-icon class="nav-icon ml-0 text-danger">
                                            <Close />
                                        </el-icon>
                                        <span>Xoá tất cả bộ lọc</span>
                                    </el-button>
                                </li>
                                <hr class="m-0 mb-2"/>
                                <li class="nav-item mb-1">
                                    <label class="pl-2 mb-0 d-flex align-items-center">
                                        <div role="button" class="flex-fill user-select-none cursor-pointer">
                                            <span>Hiển thị các mục đã xoá</span>
                                        </div>
                                        <div>
                                            <el-switch  v-model="data.isShowDeleted" size="small" />
                                        </div>
                                    </label>
                                </li>
                                <hr class="m-0  mt-1 mb-2"/>

                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>LOẠI DỮ LIỆU</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.serviceTypeFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                0
                                            </span>
                                        </div>
                                    </label>
                                </li>

                                <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>TIER</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.tierFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                0
                                            </span>
                                        </div>
                                    </label>
                                </li>

                                <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>TAGS</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.tagsFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                0
                                            </span>
                                        </div>
                                    </label>
                                </li>

                                <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>NGUỒN DỮ LIỆU</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.dataSourceFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                0
                                            </span>
                                        </div>
                                    </label>
                                </li>

                                <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>DATABASE</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.databaseFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                0
                                            </span>
                                        </div>
                                    </label>
                                </li>

                                <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>SCHEMA</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.schemaFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                0
                                            </span>
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </nav>
                    </el-scrollbar>
                </el-card>
            </div>
            <div class="col-10">
                <el-card :body-style="{ padding: '0.5rem 0.8rem' }">
                    <el-tabs class="tab-data-result mt-0">
                        <el-tab-pane>
                            <template #label>
                                <div class="custom-tabs-label">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <i class="fas fa-columns"></i>
                                        </div>
                                        <div class="ml-1">
                                            <span>Bảng dữ liệu </span>
                                            <span class="ml-1 bage-count-result badge"> 10</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div>
                                <div>10 results</div>
                                <el-scrollbar class="mt-2 pr-3" style="height: calc(100vh - 19.5rem);">
                                    <div>
                                        <div v-for="itemResult in 10"
                                            class="mb-3">
                                            <el-card :body-style="{ padding: '0.3rem 0.8rem 0.5rem' }">
                                                <div>
                                                    <div class="text-muted"><small>covid_report.public</small></div>
                                                    <div class="d-flex align-items-center">
                                                        <div>
                                                            <img
                                                                src="/icons/databases/postgresql.svg"
                                                                style="width: 1.2rem"
                                                            />
                                                        </div>
                                                        <div class="ml-1">
                                                            <h5 class="m-0"><strong>danh_sach_f0</strong></h5>
                                                        </div>
                                                    </div>
                                                    <div class="mt-1">
                                                        No Owner | No Tier | Type: Regular
                                                    </div>
                                                    <div class="text-muted">
                                                        The resulting AsyncComp is a wrapper component that only calls the loader function when it is actually rendered on the page.
                                                    </div>
                                                    <div>
                                                        <span class="text-muted">Matches:</span> 1 in Name
                                                    </div>
                                                    <hr class="mb-2"/>
                                                    <div class="d-flex align-items-center">
                                                        <div>
                                                            <el-icon><PriceTag /></el-icon>
                                                        </div>
                                                        <div class="ml-2">
                                                            <span class="mr-2">#PersonalData.Personal</span>
                                                            <span class="mr-2">#PersonalData.Personal</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </div>
                                    </div>
                                </el-scrollbar>
                                <div class="mt-3">
                                    <el-pagination background layout="total, sizes, prev, pager, next" :total="1000" />
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane>
                            <template #label>
                                <div class="custom-tabs-label">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <i class="fas fa-columns"></i>
                                        </div>
                                        <div class="ml-1">
                                            <span>Topics </span>
                                            <span class="ml-1 bage-count-result badge"> 0</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div>
                                              
                            </div>
                        </el-tab-pane>

                        <el-tab-pane>
                            <template #label>
                                <div class="custom-tabs-label">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <i class="fas fa-columns"></i>
                                        </div>
                                        <div class="ml-1">
                                            <span>Dashboards </span>
                                            <span class="ml-1 bage-count-result badge"> 0</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div>
                                              
                            </div>
                        </el-tab-pane>

                        <el-tab-pane>
                            <template #label>
                                <div class="custom-tabs-label">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <i class="fas fa-columns"></i>
                                        </div>
                                        <div class="ml-1">
                                            <span>Pipelines </span>
                                            <span class="ml-1 bage-count-result badge"> 0</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div>
                                              
                            </div>
                        </el-tab-pane>

                        <el-tab-pane>
                            <template #label>
                                <div class="custom-tabs-label">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <i class="fas fa-columns"></i>
                                        </div>
                                        <div class="ml-1">
                                            <span>ML Models </span>
                                            <span class="ml-1 bage-count-result badge"> 0</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div>
                                              
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
.bage-count{
    background-color: #e7e7e7 !important;
    font-size: 0.8rem;
    color: #a7a7a7;
}

.tab-data-result{

    .bage-count-result{
        background-color: #e7e7e7 !important;
        font-size: 0.8rem;
        color: #a7a7a7;
    }

    .el-tabs__item{
        &.is-active{
            .bage-count-result{
                background-color: #409eff !important;
                font-size: 0.8rem;
                color: #fff;
            }
        }
    }
}
</style>