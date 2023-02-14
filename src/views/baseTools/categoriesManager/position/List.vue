<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<script lang="ts" src="@/scripts/baseTools/categoriesManager/position/list.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center pr-3">
            <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                <h4>
                    <i class="fas fa-file-code text-lightblue mr-2"></i>
                    <strong>{{ viewSettings.title }}</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">
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
                    <div class="mt-2 mr-3">
                        <table
                            class="table table-striped table-head-fixed text-nowrap table-borderless">
                            <thead>
                                <tr class="bg-white">
                                    <th style="width: 1%;"
                                        class="pl-0 pt-2 pb-2 text-nowrap align-middle">
                                        <button>ID</button>
                                    </th>
                                    <th class="pl-0 pt-2 pb-2 align-middle">
                                        <button>{{ viewSettings.title }}</button>
                                    </th> 
                                    <th class="pl-0 pt-2 pb-2 align-middle">
                                        <button>MÔ TẢ</button>
                                    </th> 
                                    <th
                                        class="pl-0 pt-2 pb-2 text-center align-middle">
                                        <button>THỜI GIAN THÊM</button>
                                    </th>
                                    <th
                                        class="pl-0 pt-2 pb-2 text-center align-middle">
                                        <button>LẦN CUỐI CHỈNH SỬA</button>
                                    </th>
                                    <th
                                        class="pl-0 pt-2 pb-2 text-center align-middle"
                                        style="width: 1%">
                                        <div>ACTION</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class=" ">
                                <tr v-for="(itemData, itemIndex) in listElements.data" :key="itemIndex">
                                    <td class="pl-2 text-left">{{itemData.id}}</td>
                                    <td class="pl-2">
                                        {{ viewSettings.title }} {{ itemIndex + 1 }}
                                    </td> 
                                    <td class="pl-2">
                                        Giới thiệu về {{ viewSettings.title }} {{ itemIndex + 1 }}
                                    </td> 
                                    <td class="pl-2 text-center text-nowrap" style="width: 1%;">
                                        {{$filters.prettyDate(itemData.created_at)}}
                                    </td>
                                    <td class="pl-2 text-center text-nowrap" style="width: 1%;">
                                        {{$filters.prettyDate(itemData.updated_at)}}
                                    </td>
                                    <td class="pl-2 text-center">
                                        <el-button type="default" class="p-2"
                                            @click="$emit( 'onChangeView', { viewName: 'ModifyData', data: itemData, })">
                                            <el-icon
                                                style="vertical-align: middle"
                                                :size="20">
                                                <Edit />
                                            </el-icon>
                                        </el-button> 
                                        <el-button type="danger" class="p-2"
                                            @click="deleteItem(itemData)">
                                            <el-icon
                                                style="vertical-align: middle"
                                                :size="20">
                                                <Delete />
                                            </el-icon>
                                        </el-button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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