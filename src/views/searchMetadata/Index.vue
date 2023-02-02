<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<script lang="ts" src="@/scripts/searchMetadata">

</script>
<template>
    <div class="box-card p-1 w-100  h-100 flex-fill d-flex flex-column"
        v-loading="isLoading">
        <div>
            <el-card :body-style="{ padding: '0.5rem 0.8rem' }">
                <div class="d-flex align-items-center">
                    <div class="flex-fill">
                        <el-input
                            class="w-100"
                            size="large"
                            v-model="data.queryStr"
                            @keyup.enter.native="searMetaData"
                            placeholder="Tìm kiếm Bảng, Topics, Dashboards, Pipelines and ML Models"
                            :prefix-icon="Search"
                        />
                    </div>
                    <div class="ml-2">
                        <el-button size="large" @click="searMetaData">
                            <el-icon><Search /></el-icon> 
                            <span class="ml-2">Tìm kiếm</span>
                        </el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <section class="row row-eq-height mt-2 flex-fill">
            <div class="col-20p">
                <el-card :body-style="{ padding: '0rem 0rem 0.5rem 0.8rem' }">
                    <el-scrollbar class="mt-2 pr-3" 
                        style="height: calc(100vh - 10.8rem);">
                        <nav class="mt-0">
                            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                <li class="nav-item mb-2">
                                    <el-button link @click="clearAllFilter">
                                        <el-icon class="nav-icon ml-0 text-danger">
                                            <Close />
                                        </el-icon>
                                        <span>Xoá tất cả bộ lọc</span>
                                    </el-button>
                                </li>
                                <hr class="m-0 mb-2"/>
                                <!-- <li class="nav-item mb-1">
                                    <label class="pl-2 mb-0 d-flex align-items-center">
                                        <div role="button" class="flex-fill user-select-none cursor-pointer">
                                            <span>Hiển thị các mục đã xoá</span>
                                        </div>
                                        <div>
                                            <el-switch  v-model="data.isShowDeleted" size="small" />
                                        </div>
                                    </label>
                                </li> -->

                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>LOẠI DỮ LIỆU</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.serviceTypeFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" @change="searMetaData" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                {{filterItem.docCount}}
                                            </span>
                                        </div>
                                    </label>
                                </li>

                                <!-- <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>TIER</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.tierFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" @change="searMetaData" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                {{filterItem.docCount}}
                                            </span>
                                        </div>
                                    </label>
                                </li> -->

                                <hr class="m-0  mt-1 mb-2"/>
                                <li class="nav-header text-muted ml-0 pl-2 mb-0 mt-0 pt-0">
                                    <strong>TAGS</strong>
                                </li>
                                <li class="nav-item mb-1"
                                    v-for="filterItem in data.tagsFilter"
                                    :key="filterItem.label">
                                    <label class="pl-2 mb-1 d-flex align-items-center">
                                        <div>
                                            <el-checkbox  v-model="filterItem.selected" @change="searMetaData" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                {{filterItem.docCount}}
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
                                            <el-checkbox  v-model="filterItem.selected" @change="searMetaData" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                {{filterItem.docCount}}
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
                                            <el-checkbox  v-model="filterItem.selected" @change="searMetaData" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                {{filterItem.docCount}}
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
                                            <el-checkbox  v-model="filterItem.selected" @change="searMetaData" class="mb-0 h-auto"/>
                                        </div>
                                        <div role="button" class="ml-2 flex-fill user-select-none cursor-pointer">
                                            <span>{{filterItem.label}}</span>
                                        </div>
                                        <div>                                        
                                            <span class="ml-1 bage-count badge">
                                                {{filterItem.docCount}}
                                            </span>
                                        </div>
                                    </label>
                                </li>
                            </ul>
                        </nav>
                    </el-scrollbar>
                </el-card>
            </div>
            <div class="col-80p">
                <el-card :body-style="{ padding: '0.5rem 0.8rem' }"
                    class="position-relative">
                    <div class="position-absolute"
                        style="right: 1rem; z-index: 10;">
                        <el-select v-model="resultData.sortField" 
                            @change="searMetaData"
                            placeholder="Sắp xếp theo">
                            <el-option v-for="item in sortFieldOptions" :key="item.value" :label="item.name" :value="item.value" />
                        </el-select>
                        <el-select class="ml-2" v-model="resultData.sortOrder" 
                            @change="searMetaData"
                            placeholder="Sắp xếp tăng/giảm">
                            <el-option label="Tăng dần" value="asc" />
                            <el-option label="Giảm dần" value="desc" />
                        </el-select>
                    </div>
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
                                            <span class="ml-1 bage-count-result badge"> {{resultData.tableData.total}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div v-if="resultData.tableData.total > 0">
                                <div>{{resultData.tableData.total}} results</div>
                                <el-scrollbar class="mt-2 pr-3" style="height: calc(100vh - 19.5rem);">
                                    <div>
                                        <div v-for="itemResult in resultData.tableData.data" :key="itemResult._id"
                                            class="mb-3">
                                            <el-card :body-style="{ padding: '0.3rem 0.8rem 0.5rem' }">
                                                <div>
                                                    <div class="text-muted"><small>{{itemResult._source.fullyQualifiedName}}</small></div>
                                                    <div class="d-flex align-items-center">
                                                        <div>
                                                            <img
                                                                src="/icons/databases/postgresql.svg"
                                                                style="width: 1.2rem"
                                                            />
                                                        </div>
                                                        <div class="ml-1">
                                                            <h6 class="m-0"><strong>{{itemResult._source.name}}</strong></h6>
                                                        </div>
                                                    </div>
                                                    <div class="mt-1">
                                                        {{itemResult._source.tier === null ? 'No Tier' : itemResult._source.tier}} | Type: {{itemResult._source.tableType}}
                                                    </div>
                                                    <div class="text-muted"
                                                        v-if="itemResult._source.description"
                                                        v-html="itemResult._source.description.replace(/<[^>]*>/g, '')">
                                                        
                                                    </div>
                                                    <!-- <div>
                                                        <span class="text-muted">Matches:</span> 1 in Name
                                                    </div> -->
                                                    <hr class="mb-2" v-if="itemResult._source.tags.length > 0"/>
                                                    <div class="d-flex align-items-center"
                                                        v-if="itemResult._source.tags.length > 0">
                                                        <div>
                                                            <el-icon><PriceTag /></el-icon>
                                                        </div>
                                                        <div class="ml-2">
                                                            <span class="mr-2" v-for="tagItem in itemResult._source.tags" :key="tagItem.tagFQN">
                                                                #{{tagItem.tagFQN}}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </div>
                                    </div>
                                </el-scrollbar>
                                <div class="mt-3">
                                    <el-pagination background layout="sizes, prev, pager, next" 
                                        v-model:current-page="resultData.tableData.pageIndex"
                                        v-model:page-size="resultData.tableData.pageSize"
                                        :total="resultData.tableData.total"
                                        :page-sizes="[50, 100, 200, 300, 400]"
                                        @size-change="searMetaData"
                                        @current-change="searMetaData"/>
                                </div>
                            </div>
                            <no-data v-else style="height: calc(100vh - 14.2rem);" title="Không tìm thấy dữ liệu"
                                :subTitle="`Chúng tôi không tìm thấy bảng nào phù hợp với từ khoá <strong>${data.queryStr}</strong>`"/>
                        </el-tab-pane>

                        <!-- <el-tab-pane>
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
                        </el-tab-pane> -->
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

.col-20p {
    -ms-flex: 0 0 20%;
    flex: 0 0 20%;
    max-width: 20%;
    position: relative;
    width: 100%;
    padding-right: 7.5px;
    padding-left: 7.5px;
}
.col-80p {
    -ms-flex: 0 0 80%;
    flex: 0 0 80%;
    max-width: 80%;
    position: relative;
    width: 100%;
    padding-right: 7.5px;
    padding-left: 7.5px;
}
</style>