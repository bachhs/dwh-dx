<script lang="ts" src="@/scripts/fileEmbedLink/add.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill">
                <h4 class="mb-0 d-none d-md-block">
                    <i class="fas fa-file-code text-lightblue mr-2"></i>
                    <strong>{{ viewSettings.title }}</strong>
                </h4>
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
        <el-scrollbar class="d-flex flex-fill mt-0 mt-md-3 pr-0">
            <div class="flex-fill d-flex flex-column w-100 pb-0 pt-2 mr-4">
                <el-form
                    v-if="itemModel"
                    ref="ruleFormStep1Ref" :model="itemModel" :rules="rules" 
                    label-width="0" class="ruleForm">
                    <div class="mb-3">
                        <div>
                            <strong>Tổ chức</strong><span class="ml-1 text-danger">*</span>
                        </div>
                        <div class="row mt-2" v-if="organization">
                            <div
                                class="col-12 col-md-3 organization-item"
                                v-for="item in organization"
                                :key="item.id">
                                <label class="d-block">
                                    <input
                                        type="radio"
                                        class="radio-selection"
                                        :value="item.id"
                                        v-model=" itemModel.organizationSelected "
                                        @change="onOrganizationChanged(item)" />
                                    <el-card
                                        :body-style="{ padding: '1rem 0.8rem', }" 
                                        style=" height: auto; overflow: hidden; "
                                        class="mb-3" >
                                        <div class="position-relative d-flex align-items-center" >
                                            <div
                                                class="flex-fill item--name text-nowrap"
                                                style=" overflow-x: hidden; " >
                                                {{ item.name }}
                                            </div>
                                            <div class="ml-1 organization-item--icon-selected d-none" >
                                                <el-icon :size="20" color="white" ><Check/></el-icon>
                                            </div>
                                        </div>
                                    </el-card>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4">
                        <div>
                            <strong>Thời gian có hiệu lực</strong
                            ><span class="ml-1 text-danger">*</span>
                        </div>
                        <div class="mt-2">
                            <el-form-item label="" prop="nameOfDS">
                                <el-date-picker v-model="itemModel.nameOfDS" 
                                    type="datetimerange" size="large"
                                    range-separator="Đến ngày" start-placeholder="Ngày có hiệu lực.."
                                    end-placeholder="Ngày hết hiệu lực" />
                            </el-form-item>
                        </div>
                    </div> 
                </el-form>
                <div
                    class="text-center mt-3 pt-3 pb-3"
                    style="background-color: #f5f7fa">
                    <el-button
                        size="large"
                        type="primary"
                        class="mr-1 ml-1">
                        <el-icon><Plus /></el-icon>
                        <span>Thêm mới Embed Link</span>
                    </el-button>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<style scoped lang="scss">
.upload-dropzone-wrap {
    --border-opacity: 1;
    border-color: #cbd5e0;
    border-color: rgba(203, 213, 224, var(--border-opacity));
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 4px;
}
.radio-selection {
    visibility: hidden;
    display: none;
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
</style>
