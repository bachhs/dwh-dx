<script lang="ts" src="@/scripts/dataSource/addDataSource.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill">
                <h4 class="mb-0 d-none d-md-block">
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>{{ viewSettings.title }}</strong>
                </h4>
                <div class="d-block d-md-none">
                    <strong v-if="stepWizard === 0">Thông tin định danh</strong>
                    <strong v-if="stepWizard === 1">Thông tin kết nối</strong>
                    <!-- <strong v-if="stepWizard === 3">Cấu hình kết nối</strong> -->
                    <strong v-if="stepWizard === 2">Xem lại và lưu</strong>
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
        <div class="mt-3 pr-4 d-none d-md-block">
            <el-steps
                :active="stepWizard"
                class="w-100"
                simple
                finish-status="success">
                <el-step title="Thông tin định danh" />
                <el-step title="Thông tin kết nối" />
                <!-- <el-step title="Cấu hình kết nối" /> -->
                <el-step title="Xem lại và lưu" />
            </el-steps>
        </div>
        <el-scrollbar class="d-flex flex-fill mt-0 mt-md-3 pr-0">
            <div class="flex-fill d-flex flex-column w-100 pb-0 pt-2 mr-4">
                <div>
                    <el-card class="flex-fill d-flex flex-column w-100 mt-1">
                        <div v-if="stepWizard === 0">
                            <IdentityStep1
                                v-if="itemModel"
                                ref="identityStep1Ref"
                                :dataSourceItem="itemModel"
                                :organization="organization"
                                @onFormSubmit="(valid) => { if(valid) stepWizard = stepWizard + 1 }" />
                        </div>
                        <div v-if="stepWizard === 1">
                            <div>
                                <strong>Nguồn dữ liệu</strong
                                ><span class="ml-1 text-danger">*</span>
                            </div>
                            <div class="mt-2">
                                <el-radio-group
                                    v-model="itemModel.typeOfDataIn">
                                    <el-radio-button :label="`database`">Database</el-radio-button>
                                    <el-radio-button disabled :label="`file`">File</el-radio-button>
                                    <el-radio-button :label="`api`">API</el-radio-button>
                                </el-radio-group>
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'database'">
                                <DataSourceTypeDBStep2
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel"
                                    :databaseEngineOptions="databaseEngineOptions" />
                                <div class="mb-2 mt-3">
                                    <strong>Cấu hình kết nối</strong><span class="ml-1 text-danger">*</span>
                                </div>
                                <ConfigDatabaseStep3
                                    ref="identityStep3Ref"
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel"
                                    @onFormSubmit="(valid) => { if(valid) stepWizard = stepWizard + 1 }" />
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'file'">
                                <DataSourceTypeFileStep2
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel"
                                    :fileTypeDataSourceOptions="fileTypeDataSourceOptions" />
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'api'">
                                <DataSourceTypeAPIStep2
                                    v-if="itemModel"
                                    :dataSourceItem="itemModel" />
                            </div>
                        </div>
                        <div class="mt-0" v-if="stepWizard === 2">
                            <div>
                                <div class="text-center w-100">
                                    <h5>
                                        <strong>Xem lại các thông tin</strong>
                                    </h5>
                                </div>
                                <div class="mt-3">
                                    <SummaryInfoStep4
                                        v-if="itemModel"
                                        :dataSourceItem="itemModel" />
                                </div>
                            </div>
                        </div>
                    </el-card>
                </div>
                <div
                    class="text-center mt-3 pt-4 pb-4"
                    style="background-color: #f5f7fa">
                    <el-button
                        size="large"
                        type="primary"
                        v-if="stepWizard > 0"
                        class="mr-1 ml-1"
                        @click="stepWizard = stepWizard - 1">
                        <el-icon class="mr-2"><DArrowLeft /></el-icon>
                        <span>Quay lại</span>
                    </el-button>

                    <el-button
                        size="large"
                        type="primary"
                        v-if="stepWizard < totalStepWizard"
                        class="mr-1 ml-1"
                        @click="submitStep(stepWizard)">
                        <span>Bước tiếp theo</span>
                        <el-icon class="ml-2"><DArrowRight /></el-icon>
                    </el-button>

                    <el-button
                        size="large"
                        type="primary"
                        v-if="stepWizard === totalStepWizard"
                        class="mr-1 ml-1"
                        @click="addDatasource()">
                        <el-icon><CircleCheck /></el-icon>
                        <span>Lưu dữ liệu</span>
                    </el-button>
                </div>
            </div>
        </el-scrollbar>
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

.upload-dropzone-wrap {
    --border-opacity: 1;
    border-color: #cbd5e0;
    border-color: rgba(203, 213, 224, var(--border-opacity));
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 4px;
}
</style>
