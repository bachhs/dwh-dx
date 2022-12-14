<script lang="ts" src="@/scripts/dataSource/addModifyDataSource.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100"
        v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4 class="mb-0">
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>{{viewSettings.title}}</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                
                <div class="ml-1 mr-4">                    
                    <!-- <el-button size="large" type="primary">
                        <el-icon><CircleCheck /></el-icon>
                        <span>Lưu dữ liệu</span>
                    </el-button> -->

                    <el-button size="medium" type="danger"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null })">
                        <div>
                            Thoát
                        </div>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="mt-3 pr-3">
            <el-steps :active="stepWizard" class="w-100" simple 
                finish-status="success">
                <el-step title="Thông tin định danh"/>
                <el-step title="Loại dữ liệu"/>
                <el-step title="Cấu hình kết nối"/>
                <el-step title="Xem lại và lưu"/>
            </el-steps>
        </div>
        <el-scrollbar class="d-flex flex-fill mt-3 pr-0">
            <div class="flex-fill d-flex flex-column w-100 pb-0 pt-2 mr-4">
                <div class="mb-3" v-if="stepWizard === 1">
                    <div><strong>Tên nguồn dữ liệu</strong><span class="ml-1 text-danger">*</span></div>
                    <div class="mt-2">
                        <el-input v-model="itemModel.nameOfDS" size="large" placeholder="Tên nguồn dữ liệu" clearable />
                    </div>
                    <div class="mt-2"><strong>Mô tả nguồn dữ liệu</strong><span class="ml-1 text-danger">*</span></div>
                    <div class="mt-2">
                        <el-input v-model="itemModel.descOfDS" size="large" 
                            :autosize="{ minRows: 2, maxRows: 4 }"
                            type="textarea"
                            placeholder="Mô tả nguồn dữ liệu" clearable />
                    </div>
                </div>
                <div v-if="stepWizard === 1">
                    <div><strong>Đơn vị cung cấp</strong><span class="ml-1 text-danger">*</span></div>
                    <div class="row mt-2">
                        <div class="col-12 col-md-3 organization-item"
                            v-for="item in organization" :key="item.id">
                            <label  class="d-block">
                                <input type="radio" class="radio-selection" 
                                    :value="item.id" v-model="itemModel.organizationSelected"/>
                                <el-card :body-style="{ padding: '1rem 0.8rem' }"
                                        style="height: auto; overflow: hidden;"
                                        class="mb-3">
                                    <div class="position-relative d-flex align-items-center">
                                        <div class="flex-fill item--name text-nowrap" style="overflow-x: hidden;">
                                            {{item.name}}
                                        </div>
                                        <div class="ml-1 organization-item--icon-selected d-none">                                        
                                            <el-icon :size="20" color="green"><Check /></el-icon>
                                        </div>
                                    </div>
                                    
                                </el-card>
                            </label>
                        </div>
                    </div>
                </div>
                <div v-if="stepWizard === 2">
                    <div><strong>Loại dữ liệu</strong><span class="ml-1 text-danger">*</span></div>
                    <div class="mt-2">
                        <el-radio-group v-model="itemModel.typeOfDataIn">
                            <el-radio-button :label="1">Database</el-radio-button>
                            <el-radio-button :label="2">File</el-radio-button>
                            <el-radio-button :label="3">API</el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="row mt-2 w-100">
                        <div class="col-12 col-md-2 type-datasource-item" 
                            v-for="item in typeOfDataSource" :key="item.id">
                            <label class="d-block">
                                <input type="radio" class="radio-selection" 
                                :value="item.id" v-model="itemModel.typeOfDataSourceSelected"/>
                                <el-card :body-style="{ padding: '0.5rem 0.8rem' }"
                                    style="height: auto; overflow: hidden;"
                                    class="mb-3">
                                    <div class="position-relative">
                                        <div class="mt-1 mb-1">
                                            <img :src="`/icons/databases/${item.iconName}`" style="height: 2.5rem;" />
                                        </div>
                                        <div class="text-nowrap mt-2">
                                            <span class="item--name">{{ item.name }}</span>
                                        </div>
                                        <div class="position-absolute type-datasource-item--icon-selected d-none"
                                            style="right: 0.5rem; top: 0.5rem;">
                                            <el-icon :size="40" color="green"><Check /></el-icon>
                                        </div>
                                    </div>
                                </el-card>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="mb-1" v-if="stepWizard === 3">
                    <div><strong>Cấu hình kết nối</strong><span class="ml-1 text-danger">*</span></div>
                    <div class="mt-2">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4 mb-2">
                                <div><span style="font-size: 90%">IP address/ Host name</span></div>
                                <div class="mt-1">
                                    <el-input v-model="itemModel.host" size="large" placeholder="IP address/ Host name" clearable />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 mb-2">
                                <div><span style="font-size: 90%">Port</span></div>
                                <div class="mt-1">
                                    <el-input v-model="itemModel.port" size="large" placeholder="Port" clearable />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 mb-2">
                                <div><span style="font-size: 90%">Username</span></div>
                                <div class="mt-1">
                                    <el-input v-model="itemModel.Username" size="large" placeholder="Username" clearable />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 mb-2">
                                <div><span style="font-size: 90%">Password</span></div>
                                <div class="mt-1">
                                    <el-input v-model="itemModel.Password" type="password" size="large" placeholder="Password" clearable show-password/>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-4 mb-2">
                                <div><span style="font-size: 90%">DB name</span></div>
                                <div class="mt-1">
                                    <el-input v-model="itemModel.DBName" size="large" placeholder="DB name" clearable/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-0" v-if="stepWizard === 4">                
                    <div>                    
                        <div class="text-center w-100"><h5><strong>Xem lại các thông tin</strong></h5></div>
                        <div class="mt-3">
                            <table class="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th style="width: 1%;">Tên thông tin</th>
                                        <th>Giá trị</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tên nguồn dữ liệu</td>
                                        <td>{{itemModel.nameOfDS}}</td>
                                    </tr>
                                    <tr>
                                        <td>Mô tả nguồn dữ liệu</td>
                                        <td>{{itemModel.descOfDS}}</td>
                                    </tr>
                                    <tr>
                                        <td>Dữ liệu thuộc đơn vị</td>
                                        <td>Bộ thông tin và truyền thông</td>
                                    </tr>
                                    <tr>
                                        <td>Loại dữ liệu</td>
                                        <td>Database</td>
                                    </tr>
                                    <tr>
                                        <td>Database Engine</td>
                                        <td>PostgreSQL</td>
                                    </tr>
                                    <tr>
                                        <td>IP address/ Host name</td>
                                        <td>{{itemModel.host}}</td>
                                    </tr>
                                    <tr>
                                        <td>Cổng kết nối</td>
                                        <td>{{itemModel.port}}</td>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>{{itemModel.Username}}</td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td>{{itemModel.Password}}</td>
                                    </tr>
                                    <tr>
                                        <td>DB name</td>
                                        <td>{{itemModel.DBName}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-3 pt-2 pb-2" 
                    style="background-color: #f5f7fa;">
                    <el-button size="large" type="primary"
                        v-if="stepWizard > 1"
                        class="mr-1 ml-1"
                        @click="stepWizard = stepWizard - 1">
                        <el-icon class="mr-2"><DArrowLeft /></el-icon>
                        <span>Quay lại</span>
                    </el-button>

                    <el-button size="large" type="primary"
                        v-if="stepWizard < totalStepWizard"
                        class="mr-1 ml-1"
                        @click="stepWizard = stepWizard + 1">
                        <span>Bước tiếp theo</span>
                        <el-icon class="ml-2"><DArrowRight /></el-icon>
                    </el-button>

                    <el-button size="large" type="primary"
                        v-if="stepWizard === totalStepWizard"
                        class="mr-1 ml-1">
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
        &:checked+.el-card {
            background-color: #c4deff;

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
        &:checked+.el-card {
            background-color: #c4deff;

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