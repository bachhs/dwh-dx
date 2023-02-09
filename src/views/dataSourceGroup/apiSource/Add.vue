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
                    ref="ruleFormApiRef" :model="itemModel" :rules="rules" 
                    label-width="0" class="ruleForm">
                    <div class="mb-2 card p-2 pl-3 pr-3 ml-1">
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
                    <div>
                        <div class="card p-2 pl-3 pr-3 ml-1 mt-3">
                            <div class="row">
                                <div class="col-12 col-md-12">
                                    <div class="mt-2">
                                        <div>
                                            <strong>Tên API</strong><span class="ml-1 text-danger">*</span>
                                        </div>
                                        <div class="mt-2">
                                            <el-form-item label="" prop="name">
                                                <el-input v-model="itemModel.name"
                                                    size="large" placeholder="Tên API"
                                                    clearable />
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-12">
                                    <div class="mt-1">
                                        <div>
                                            <strong>Mô tả</strong><span class="ml-1 text-danger">*</span>
                                        </div>
                                        <div class="mt-2">
                                            <el-form-item label="" prop="description">
                                                <el-input v-model="itemModel.description"
                                                    :autosize="{ minRows: 2, maxRows: 4 }"
                                                    type="textarea"
                                                    size="large" placeholder="Mô tả"
                                                    clearable />
                                            </el-form-item>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-12">
                                <div class="mt-1 pt-3 card p-2 pl-3 pr-3 ml-1">
                                    <div class="d-flex">
                                        <div>
                                            <el-select v-model="itemModel.method" size="large" style="width: 150px;">
                                                <el-option v-for="item in restfulMethods" :key="item"
                                                    :label="item" :value="item" />
                                            </el-select>
                                        </div>
                                        <div class="ml-3 flex-fill">
                                            <el-form-item label="" prop="url">
                                                <el-input
                                                    class="input-with-select"
                                                    v-model="itemModel.url"
                                                    size="large"
                                                    placeholder="URL API .." >
                                                </el-input>
                                            </el-form-item>                            
                                        </div>
                                        <div></div>
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </el-form>
                <div class="mt-2 pl-1 pr-1">
                    <div>
                        <el-tabs v-model="activeTabName" type="border-card">
                            <el-tab-pane label="Params" name="params">
                                <div class="mb-2"><strong>Danh sách Params</strong></div>
                                <div>
                                    <KeyValueEdit ref="refParamsEdit"
                                        :queryParamsModel="queryParams"
                                        @onFormParamsSubmit="(dataEvt:Array<any>) =>{ queryParams = dataEvt }"/>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="Headers" name="headers">
                                <div class="mb-2"><strong>Danh sách Headers</strong></div>
                                <KeyValueEdit ref="refHeadersEdit"
                                        :queryParamsModel="queryHeaders"
                                        @onFormParamsSubmit="(dataEvt:Array<any>) =>{ queryHeaders = dataEvt }"/>
                            </el-tab-pane>
                            <el-tab-pane label="Body" name="body">
                                <div class="mb-2">
                                    <el-radio-group v-model="bodyContentType" @change="contentTypeChanged">
                                        <el-radio-button label="none">Không</el-radio-button>
                                        <el-radio-button label="form-data">Form-data</el-radio-button>
                                        <el-radio-button label="x-www-form-urlencode">x-www-form-urlencode</el-radio-button>
                                        <!-- <el-radio-button label="binary">Binary</el-radio-button> -->
                                        <!-- <el-radio-button label="GraphQL">GraphQL</el-radio-button> -->
                                    </el-radio-group>
                                </div>
                                <KeyValueEdit ref="refBodyEdit" v-if="['form-data', 'x-www-form-urlencode'].includes(bodyContentType)"
                                        :queryParamsModel="queryBody"
                                        @onFormParamsSubmit="(dataEvt:Array<any>) =>{ queryBody = dataEvt }"/>
                                <!-- <div v-if="bodyContentType === 'binary'">
                                    <el-input v-model="fileBinarySelected" type="file" placeholder="Chọn file..." />
                                </div> -->
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div> 
                <div
                    class="text-center mt-3 pt-3 pb-3"
                    style="background-color: #f5f7fa">
                    <el-button
                        size="large"
                        type="primary"
                        class="mr-1 ml-1"
                        @click="submitItemSubmit">
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
