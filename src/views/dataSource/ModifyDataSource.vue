<script lang="ts" src="@/scripts/dataSource/modifyDataSource.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100"
        v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill">
                <h4 class="mb-0 d-none d-md-block">
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>{{viewSettings.title}} [<span class="text-primary">{{viewSettings.dataItem.name}}</span>]</strong>
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
                    <el-button size="default" link type="danger"
                        class="d-block d-md-none"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null })">
                        <div>
                            <i class="fas fa-times"></i>
                        </div>
                    </el-button>

                    <el-button size="default" type="danger"
                        class="d-none d-md-block"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null })">
                        <div>
                            Thoát
                        </div>
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
                            <div class="ml-1">
                                Thông tin định danh
                            </div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-3 pl-1 pt-2">
                            <el-form
                                ref="ruleFormStep1Ref"
                                :model="itemModel"
                                :rules="rules.step1"
                                label-width="0"
                                class="ruleForm"
                                status-icon
                            >
                                <div class="mb-3">
                                    <div>
                                        <strong>Tên nguồn dữ liệu</strong
                                        ><span class="ml-1 text-danger">*</span>
                                    </div>
                                    <div class="mt-2">
                                        <el-form-item label="" prop="nameOfDS">
                                            <el-input
                                                v-model="itemModel.nameOfDS"
                                                size="large"
                                                placeholder="Tên nguồn dữ liệu"
                                                clearable
                                            />
                                        </el-form-item>
                                    </div>
                                    <div class="mt-4">
                                        <strong>Mô tả nguồn dữ liệu</strong
                                        ><span class="ml-1 text-danger">*</span>
                                    </div>
                                    <div class="mt-2">
                                        <el-form-item label="" prop="descOfDS">
                                            <el-input
                                                v-model="itemModel.descOfDS"
                                                size="large"
                                                :autosize="{
                                                    minRows: 2,
                                                    maxRows: 4,
                                                }"
                                                type="textarea"
                                                placeholder="Mô tả nguồn dữ liệu"
                                                clearable
                                            />
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <div>
                                        <strong>Đơn vị cung cấp</strong
                                        ><span class="ml-1 text-danger">*</span>
                                    </div>
                                    <div class="row mt-2">
                                        <div
                                            class="col-12 col-md-3 organization-item"
                                            v-for="item in organization"
                                            :key="item.id"
                                        >
                                            <label class="d-block">
                                                <input
                                                    type="radio"
                                                    class="radio-selection"
                                                    :value="item.id"
                                                    v-model="
                                                        itemModel.organizationSelected
                                                    "
                                                />
                                                <el-card
                                                    :body-style="{
                                                        padding: '1rem 0.8rem',
                                                    }"
                                                    style="
                                                        height: auto;
                                                        overflow: hidden;
                                                    "
                                                    class="mb-3"
                                                >
                                                    <div
                                                        class="position-relative d-flex align-items-center"
                                                    >
                                                        <div
                                                            class="flex-fill item--name text-nowrap"
                                                            style="
                                                                overflow-x: hidden;
                                                            "
                                                        >
                                                            {{ item.name }}
                                                        </div>
                                                        <div
                                                            class="ml-1 organization-item--icon-selected d-none"
                                                        >
                                                            <el-icon
                                                                :size="20"
                                                                color="white"
                                                                ><Check
                                                            /></el-icon>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </el-form>
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
                            <div class="ml-1">
                                Loại dữ liệu
                            </div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-3 pl-1 pt-2">
                            <div class="row mt-2 w-100">
                                <div
                                    class="col-12 col-md-2 type-datasource-item"
                                    v-for="item in databaseEngineOptions"
                                    :key="item.id"
                                >
                                    <label class="d-block">
                                        <input
                                            type="radio"
                                            class="radio-selection"
                                            :value="item.id"
                                            v-model="
                                                itemModel.databaseEngineSelected
                                            "
                                        />
                                        <el-card
                                            :body-style="{
                                                padding: '0.5rem 0.8rem',
                                            }"
                                            style="
                                                height: auto;
                                                overflow: hidden;
                                            "
                                            class="mb-3"
                                        >
                                            <div class="position-relative">
                                                <div class="mt-1 mb-1">
                                                    <img
                                                        :src="`/icons/databases/${item.iconName}`"
                                                        style="
                                                            height: 2.5rem;
                                                        "
                                                    />
                                                </div>
                                                <div
                                                    class="text-nowrap mt-2"
                                                >
                                                    <span
                                                        class="item--name"
                                                        >{{
                                                            item.name
                                                        }}</span
                                                    >
                                                </div>
                                                <div
                                                    class="position-absolute type-datasource-item--icon-selected d-none"
                                                    style="
                                                        right: 0.5rem;
                                                        top: 0.5rem;
                                                    "
                                                >
                                                    <el-icon
                                                        :size="40"
                                                        color="white"
                                                        ><Check
                                                    /></el-icon>
                                                </div>
                                            </div>
                                        </el-card>
                                    </label>
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
                                <i class="fas fa-plug"></i>
                            </div>
                            <div class="ml-1">
                                Cấu hình kết nối
                            </div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-3 pl-1 pt-2">
                            <div v-if="itemModel.typeOfDataIn === 'database'">
                                <div>
                                    <strong>Cấu hình kết nối</strong
                                    ><span class="ml-1 text-danger">*</span>
                                </div>
                                <div class="mt-2">
                                    <div class="row">
                                        <div
                                            class="col-12 col-sm-6 col-md-4 mb-2"
                                        >
                                            <div>
                                                <span style="font-size: 90%"
                                                    >IP address/ Host name</span
                                                >
                                            </div>
                                            <div class="mt-1">
                                                <el-input
                                                    v-model="itemModel.host"
                                                    size="large"
                                                    placeholder="IP address/ Host name"
                                                    clearable
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="col-12 col-sm-6 col-md-4 mb-2"
                                        >
                                            <div>
                                                <span style="font-size: 90%"
                                                    >Port</span
                                                >
                                            </div>
                                            <div class="mt-1">
                                                <el-input
                                                    v-model="itemModel.port"
                                                    size="large"
                                                    placeholder="Port"
                                                    clearable
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="col-12 col-sm-6 col-md-4 mb-2"
                                        >
                                            <div>
                                                <span style="font-size: 90%"
                                                    >Username</span
                                                >
                                            </div>
                                            <div class="mt-1">
                                                <el-input
                                                    v-model="itemModel.Username"
                                                    size="large"
                                                    placeholder="Username"
                                                    clearable
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="col-12 col-sm-6 col-md-4 mb-2"
                                        >
                                            <div>
                                                <span style="font-size: 90%"
                                                    >Password</span
                                                >
                                            </div>
                                            <div class="mt-1">
                                                <el-input
                                                    v-model="itemModel.Password"
                                                    type="password"
                                                    size="large"
                                                    placeholder="Password"
                                                    clearable
                                                    show-password
                                                />
                                            </div>
                                        </div>
                                        <div
                                            class="col-12 col-sm-6 col-md-4 mb-2"
                                        >
                                            <div>
                                                <span style="font-size: 90%"
                                                    >DB name</span
                                                >
                                            </div>
                                            <div class="mt-1">
                                                <el-input
                                                    v-model="itemModel.DBName"
                                                    size="large"
                                                    placeholder="DB name"
                                                    clearable
                                                />
                                            </div>
                                        </div>
                                    </div>
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
                                <i class="fas fa-tasks"></i>
                            </div>
                            <div class="ml-1">
                                Xem lại và lưu
                            </div>
                        </div>
                    </div>
                </template>
                <div>
                    <el-scrollbar style="height: calc(100vh - 15rem)">
                        <div class="mr-3 pl-1 pt-2">
                            <div class="mt-3">
                                <table class="table table-hover text-nowrap" >
                                    <thead>
                                        <tr>
                                            <th style="width: 1%">
                                                Tên thông tin
                                            </th>
                                            <th>Giá trị</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Tên nguồn dữ liệu</td>
                                            <td>
                                                {{ itemModel.nameOfDS }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Mô tả nguồn dữ liệu</td>
                                            <td>
                                                {{ itemModel.descOfDS }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Dữ liệu thuộc đơn vị</td>
                                            <td>
                                                Bộ thông tin và truyền thông
                                            </td>
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
                                            <td>{{ itemModel.host }}</td>
                                        </tr>
                                        <tr>
                                            <td>Cổng kết nối</td>
                                            <td>{{ itemModel.port }}</td>
                                        </tr>
                                        <tr>
                                            <td>Username</td>
                                            <td>
                                                {{ itemModel.Username }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td>
                                                {{ itemModel.Password }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>DB name</td>
                                            <td>{{ itemModel.DBName }}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
        &:checked+.el-card {
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
        &:checked+.el-card {
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
    border-color: rgba(203,213,224,var(--border-opacity));
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 4px;
}
</style>