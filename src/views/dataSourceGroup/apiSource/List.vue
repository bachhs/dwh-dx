
import { Download } from '@element-plus/icons-vue';


import { OfficeBuilding } from '@element-plus/icons-vue';

<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<script lang="ts" src="@/scripts/dataSourceGroup/apiSource/list.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center pr-3">
            <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                <h4>
                    <i class="fas fa-external-link-alt text-lightblue mr-2"></i>
                    <strong>API Data source</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">
                <div class="ml-1 mr-1 d-none d-md-block">
                    <el-select v-if="organization"
                        style="width: 15rem"
                        v-model="filterData.organization_id"
                        filterable
                        placeholder="Tổ chức.."
                        size="large"
                        @change="filterDataFn" >
                        <el-option label="Tất cả" value="" />
                        <el-option v-for="item in organization"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
                </div>
                <div class="ml-1 mr-1">
                    <el-input
                        v-model="filterData.name"
                        filterable
                        placeholder="Nhập để lọc dữ liệu.."
                        size="large"
                        style="min-width: 16rem"
                        @input="filterDataDebounceFn"
                        @keyup.enter.native="filterDataFn" >
                        <template #prepend>
                            <el-icon style="vertical-align: middle">
                                <Search />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="ml-1 text-nowrap">
                    <el-button
                        size="large"
                        type="primary"
                        @click="$emit('onChangeView', { viewName: 'AddData', data: null, })">
                        <el-icon :size="20" style="vertical-align: middle">
                            <Plus />
                        </el-icon>
                    </el-button>

                    <el-button
                        size="large"
                        type="primary"
                        @click="refreshDataFn()">
                        <el-icon :size="20" style="vertical-align: middle">
                            <Refresh />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
            <div
                class="flex-fill d-flex flex-column"
                v-if="listElements.data && listElements.data.length > 0">
                <el-scrollbar class="w-100 flex-fill">
                    <div class="mt-2 mr-3 row">
                        <div v-for="(itemData, itemIndex) in listElements.data" :key="itemIndex"
                            class="mb-3 col-12 col-md-6">
                            <el-card :body-style="{ padding: '0.5rem 0.8rem' }">
                                <div class="d-flex">
                                    <div class="d-none d-md-block mr-3">
                                        <img src="/img/api-application-icon.png"
                                            style="height: 5.5rem;" />
                                    </div>
                                    <div class="d-flex flex-column flex-md-row flex-fill">
                                        <div class="text-left">
                                            <div>#{{itemData.id}} <strong>{{itemData.name}}</strong></div>
                                            <div class="text-muted text-nowrap text-left line-clamp-1" style="font-size: 85%;">
                                                <strong class="text-uppercase text-primary">{{itemData.method}}</strong> {{itemData.url}}
                                            </div>
                                            <div class="text-muted line-clamp-1" style="font-size: 85%;">{{ itemData.description }}</div>
                                            <div style="font-size: 85%;" class="text-muted">
                                                <span v-if="itemData.organization">
                                                    <el-icon class="text-primary mr-1">
                                                        <OfficeBuilding />
                                                    </el-icon>
                                                    {{ itemData.organization.name }}
                                                </span>
                                            </div>
                                        </div> 
                                        <!-- <div class="ml-0 ml-md-4 text-left">
                                            <div class="d-none d-md-block text-muted" style="font-size: 85%;">Headers: {{itemData.headers}}</div>
                                            <div class="d-none d-md-block text-muted" style="font-size: 85%;">Params: {{itemData.params}}</div>
                                            <div class="d-none d-md-block text-muted" style="font-size: 85%;">Body: {{itemData.body}}</div>
                                        </div>  -->
                                    </div>
                                    <div class="ml-2 mt-1 mt-md-0 ml-md-4 text-right">
                                        <div>
                                            <el-button type="default" class="p-2"
                                                @click="$emit( 'onChangeView', { viewName: 'ModifyData', data: itemData, })">
                                                <el-icon
                                                    style="vertical-align: middle"
                                                    :size="20">
                                                    <Edit />
                                                </el-icon>
                                            </el-button>
                                            <!-- <el-button type="default" class="p-2">
                                                <el-icon
                                                    style="vertical-align: middle"
                                                    :size="20">
                                                    <Edit />
                                                </el-icon>
                                            </el-button> -->
                                            <el-button type="danger" class="p-2"
                                                @click="deleteItem(itemData)">
                                                <el-icon
                                                    style="vertical-align: middle"
                                                    :size="20">
                                                    <Delete />
                                                </el-icon>
                                            </el-button>

                                            <el-dropdown trigger="click" class="ml-2">
                                                <span class="el-dropdown-link">
                                                    <el-icon><MoreFilled /></el-icon>
                                                </span>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item>
                                                            <el-icon
                                                                :size="15"
                                                                style="vertical-align: middle;" >
                                                                <Download />
                                                            </el-icon>
                                                            <span class="ml-1">Tạo luồng lấy dữ liệu</span>
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                        </div>
                                        
                                        <div class="ml-2 mt-2 ml-md-4 text-left d-none d-md-block">
                                            <div style="font-size: 85%;" class=" text-nowrap text-muted">
                                                <el-icon class="text-primary mr-1">
                                                    <Plus />
                                                </el-icon>
                                                <span>{{$filters.prettyDate(itemData.created_at)}}</span>
                                            </div>
                                            <div style="font-size: 85%;" class=" text-nowrap text-muted">
                                                <el-icon class="text-primary mr-1">
                                                    <Edit />
                                                </el-icon>
                                                <span>{{$filters.prettyDate(itemData.updated_at)}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </div>
                </el-scrollbar>
                <div class="mt-3 d-flex align-items-center pr-2 p-1">
                    <div class="flex-fill pl-2 d-flex align-items-center">
                        <div class="d-none d-md-block">
                            <el-icon class="text-primary mt-1 mr-1">
                                <Clock />
                            </el-icon>
                            <span>
                                <strong>Last update:</strong>
                                {{ lastDataLoading }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <el-pagination
                            v-if="listElements.data && listElements.data.length > 0"
                            class=""
                            background
                            layout="total, sizes, prev, pager, next"
                            v-model:current-page="listElements.pagination.page"
                            :page-size="listElements.pagination.size"
                            :page-count="listElements.pagination.totalPages"
                            :total="listElements.pagination.totalElements"
                            @size-change="getListData"
                            @current-change="getListData"
                        />
                    </div>
                </div>
            </div>
            <div v-else class="flex-fill d-flex flex-column">
                <no-data />
            </div>
        </div>
    </div>
</template>