<script lang="ts" src="@/scripts/dataSourceGroup/dataSource/modifyDataSource.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill">
                <h4 class="mb-0">
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong
                        ><span class="d-none d-md-inline"
                            >{{ viewSettings.title }}
                        </span>
                        [<span class="text-primary">{{
                            viewSettings.dataItem.name
                        }}</span
                        >]</strong
                    >
                </h4>
                <div class="d-block d-md-none">
                    <!-- <strong v-if="stepWizard === 1">Thông tin định danh</strong>
                    <strong v-if="stepWizard === 2">Loại dữ liệu</strong>
                    <strong v-if="stepWizard === 3">Cấu hình kết nối</strong>
                    <strong v-if="stepWizard === 4">Xem lại và lưu</strong> -->
                </div>
            </div>
            <div class="d-flex align-items-center">
                <div class="ml-1 mr-4 w-100">
                    <el-button
                        size="default"
                        link
                        type="danger"
                        class="d-block d-md-none"
                        @click="
                            $emit('onChangeView', {
                                viewName: 'ListData',
                                data: null,
                            })
                        ">
                        <div>
                            <i class="fas fa-times"></i>
                        </div>
                    </el-button>

                    <el-button
                        size="default"
                        type="danger"
                        class="d-none d-md-block"
                        @click="
                            $emit('onChangeView', {
                                viewName: 'ListData',
                                data: null,
                            })
                        ">
                        <div>Thoát</div>
                    </el-button>
                </div>
            </div>
        </div>
        <el-tabs type="border-card" class="tab-data mt-3 mr-4">
            <el-tab-pane>
                <template #label>
                    <div class="custom-tabs-label">
                        <div class="d-flex align-items-center">
                            <div>
                                <i class="fas fa-info-circle"></i>
                            </div>
                            <div class="ml-1">Thông tin định danh</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-0 mr-md-3 pl-1 pt-2">
                            <IdentityStep1
                                v-if="itemModel"
                                ref="identityStep1Ref"
                                :dataSourceItem="itemModel"
                                :organization="organization"
                                :isEditMode="true"/>
                            <div
                                class="text-center mt-3 pt-4 pb-4"
                                style="background-color: #f5f7fa">
                                <el-button
                                    type="primary"
                                    size="large"
                                    @click="submitTab(1)">
                                    <el-icon><CircleCheck /></el-icon>
                                    <span>SAVE CHANGE</span>
                                </el-button>
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
                                <i class="far fa-list-alt"></i>
                            </div>
                            <div class="ml-1">Thông tin kết nối</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-0 mr-md-3 pl-1 pt-2">
                            <!-- <div class="mt-2">
                                <el-radio-group v-model="itemModel.typeOfDataIn" >
                                    <el-radio-button :label="`database`">Database</el-radio-button>
                                    <el-radio-button :label="`file`">File</el-radio-button>
                                    <el-radio-button :label="`api`">API</el-radio-button>
                                </el-radio-group>
                            </div> -->
                            <div v-if="itemModel.typeOfDataIn === 'database'">
                                <DataSourceTypeDBStep2
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel"
                                    :allowedEdit="false"
                                    :databaseEngineOptions="
                                        databaseEngineOptions
                                    " />
                                <div class="mb-2 mt-3">
                                    <strong>Cấu hình kết nối</strong
                                    ><span class="ml-1 text-danger">*</span>
                                </div>
                                <ConfigDatabaseStep3
                                    ref="identityStep3Ref"
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel"/>
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'file'">
                                <DataSourceTypeFileStep2
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel"
                                    :fileTypeDataSourceOptions="
                                        fileTypeDataSourceOptions
                                    " />
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'api'">
                                <DataSourceTypeAPIStep2
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel" />
                            </div>
                            <div
                                class="text-center mt-3 pt-4 pb-4"
                                style="background-color: #f5f7fa">
                                <el-button
                                    type="primary"
                                    size="large"
                                    v-if="!isShowTestConnectionBtn"
                                    @click="submitTab(2)">
                                    <el-icon><CircleCheck /></el-icon>
                                    <span>SAVE CHANGE</span>
                                </el-button>

                                <el-button size="large" 
                                    type="primary" 
                                    v-if="isShowTestConnectionBtn" 
                                    class="mr-1 ml-1"
                                    @click="TestDatabase">
                                    <i class="fas fa-database mr-2"></i>
                                    <span>Check connection</span>
                                </el-button>
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
                            <div class="ml-1">Tổng quan</div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-0 mr-md-3 pl-1 pt-2">
                            <div class="mt-3">
                                <SummaryInfoStep4
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel" />
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- <el-scrollbar class="d-flex flex-fill mt-0 mt-md-3 pr-0">
            <div class="flex-fill d-flex flex-column w-100 pb-0 pt-2 mr-4">
                
            </div>
        </el-scrollbar> -->
    </div>
</template>

<style scoped lang="scss">
.radio-selection {
    visibility: hidden;
    display: none;
}

.type-datasource-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked + .el-card {
            background-color: #5ca6e5;
            color: #fff;

            .item--name {
                font-weight: 600;
            }

            .type-datasource-item--icon-selected {
                display: block !important;
            }
        }
    }
}

.organization-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked + .el-card {
            background-color: #5ca6e5;
            color: #fff;

            .item--name {
                font-weight: 600;
            }

            .organization-item--icon-selected {
                display: block !important;
            }
        }
    }
}

.upload-dropzone-wrap {
    --border-opacity: 1;
    border-color: #cbd5e0;
    border-color: rgba(203, 213, 224, var(--border-opacity));
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 4px;
}
</style>
