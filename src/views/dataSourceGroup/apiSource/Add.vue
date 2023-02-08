<script lang="ts" src="@/scripts/dataSourceGroup/apiSource/add.ts"></script>
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
                    <div class="mb-2">
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
                                        v-model=" itemModel.organizationId "
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
                </el-form>
                <div class="mt-1">
                    <div>
                        <!-- <div class="mt-2">
                            <strong>CẤU HÌNH THAM SỐ API</strong><span class="ml-1 text-danger">*</span>
                        </div> -->
                        <div class="mt-3 d-flex">
                            <div class="flex-fill">
                                <el-input
                                    class="input-with-select"
                                    v-model="itemModel.url"
                                    size="large"
                                    placeholder="Dán URL API dữ liệu nguồn vào đây.." >
                                    <template #prepend>
                                        <el-select v-model="itemModel.method" size="large" style="width: 150px;">
                                            <el-option v-for="item in restfulMethods" :key="item"
                                                :label="item" :value="item" />
                                        </el-select>
                                    </template>
                                </el-input>
                            </div>
                            <div></div>
                        </div>
                        <div>
                            <el-tabs v-model="activeTabName">
                                <el-tab-pane label="Params" name="params">
                                    <div>
                                        <!-- <div class="mb-2">
                                            <strong>Query params</strong><span class="ml-1 text-danger">*</span>
                                        </div> -->
                                        <div>
                                            <el-form ref="ruleFormParamsRef" :model="itemModelAddParams" :rules="rules" 
                                                label-width="0" class="ruleForm">
                                                <table class="table table-hover table-striped table-borderless text-nowrap" >
                                                    <thead>
                                                        <tr style="background-color: #dceaff;">
                                                            <th style="width: 50px;"></th>
                                                            <th>KEY</th>
                                                            <th>GIÁ TRỊ</th>
                                                            <th>MÔ TẢ</th>
                                                            <th style="width: 50px;"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="queryParam in queryParams" :key="queryParam.key">
                                                            <td></td>
                                                            <td>{{queryParam.key}}</td>
                                                            <td>{{queryParam.value}}</td>
                                                            <td>{{queryParam.description}}</td>
                                                            <td></td>
                                                        </tr>
                                                        <tr>
                                                            <td></td>
                                                            <td>
                                                                <el-form-item label="" prop="key">
                                                                    <el-input v-model="itemModelAddParams.key" placeholder="Key" size="large"/>
                                                                </el-form-item>                                                
                                                            </td>
                                                            <td>
                                                                <el-form-item label="" prop="value">
                                                                    <el-input v-model="itemModelAddParams.value" placeholder="Giá trị" size="large"/>
                                                                </el-form-item>                                                
                                                            </td>
                                                            <td>
                                                                <el-form-item label="" prop="description">
                                                                    <el-input v-model="itemModelAddParams.description" placeholder="Mô tả" size="large"/>
                                                                </el-form-item>                                                
                                                            </td>
                                                            <td>
                                                                <el-button size="large" type="primary" class="pl-3 pr-3"
                                                                    @click="submitAddParam">
                                                                    <i class="fas fa-check" style="font-size: 150%;"></i>
                                                                </el-button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </el-form>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="Authorization" name="authorization">Authorization</el-tab-pane>
                                <el-tab-pane label="Headers (12)" name="headers">Headers</el-tab-pane>
                                <el-tab-pane label="Body" name="body">Body</el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </div> 
                <div
                    class="text-center mt-3 pt-3 pb-3"
                    style="background-color: #f5f7fa">
                    <el-button
                        size="large"
                        type="primary"
                        class="mr-1 ml-1"
                        @click="addItemSubmit">
                        <el-icon><Plus /></el-icon>
                        <span>{{ viewSettings.title }}</span>
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
