<!-- eslint-disable vue/no-deprecated-v-on-native-modifier -->
<script lang="ts" src="@/scripts/dataSourceGroup/dataSource/list.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center pr-3">
            <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                <h4>
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>Nguồn dữ liệu</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">
                <div class="ml-1 mr-1 d-none d-md-block">
                    <el-select
                        v-if="organization"
                        style="width: 15rem"
                        v-model="filterData.organization_id"
                        filterable
                        placeholder="Tổ chức.."
                        size="large">
                        <el-option label="Tất cả" value="" />
                        <el-option
                            v-for="item in organization"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" />
                    </el-select>
                </div>
                <!-- <div class="ml-1 mr-1 d-none d-md-block">
                    <el-select
                        v-if="databaseEngineOptions"
                        v-model="filterData.dialect"
                        filterable
                        placeholder="Database engine.."
                        size="large"
                        @change="filterDataFn">
                        <el-option label="Tất cả" value="" />
                        <el-option
                            v-for="item in databaseEngineOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            style="height: auto">
                            <div class="d-flex align-items-center">
                                <div class="mt-1 mb-1">
                                    <img
                                        :src="`/icons/databases/${item.iconName}`"
                                        style="width: 2rem" />
                                </div>
                                <div class="ml-3">
                                    {{ item.name }}
                                </div>
                            </div>
                        </el-option>
                    </el-select>
                </div> -->
                <div class="ml-1 mr-1">
                    <el-input
                        v-model="filterData.name"
                        filterable
                        placeholder="Nhập để lọc dữ liệu.."
                        size="large"
                        style="min-width: 16rem"
                        @input="filterDataDebounceFn"
                        @keyup.enter.native="filterDataFn">
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
                        @click="
                            $emit('onChangeView', {
                                viewName: 'AddData',
                                data: null,
                            })
                        ">
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
            <!-- Old datasource list -->
            <!-- <div class="flex-fill d-flex flex-column" v-if="listElements.data && listElements.data.length > 0">
                <el-scrollbar class="w-100 flex-fill">
                    <div class="mt-2 mr-3">
                        <div class="row row-eq-height">
                            <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3 d-flex" v-for="ds in listElements.data"
                                :key="ds.id">
                                <el-card :body-style="{ padding: '0.5rem 0.8rem' }" class="w-100" 
                                        v-bind:class="{ 'ds-health-error': !ds.status, }">
                                    <div class="d-flex">
                                        <div>
                                            <img v-if="ds && ds.dialectIcon"
                                                v-lazy="`/icons/databases/${ds.dialectIcon}`" class="mt-1"
                                                style="width: 5rem" />
                                            <img v-else
                                                v-lazy="`/icons/databases/${getDbEngineIcon(ds, ds.dialect)}`"
                                                class="mt-1" style="width: 5rem" />
                                        </div>
                                        <div class="ml-2 flex-fill">
                                            <div class="mb-1">
                                                <el-button size="large" link class="m-0 p-0" style="font-size: 1rem"
                                                    @click="
                                                        $emit('onChangeView', {
                                                            viewName:
                                                                'ViewDetail',
                                                            data: ds,
                                                        })
                                                    ">
                                                    <strong class="text-navy">{{
                                                        ds.name
                                                    }}</strong>
                                                </el-button>
                                            </div>

                                            <div class="text-muted mb-1" style="font-size: 85%">
                                                <Waypoint :tag="'div'"
                                                    @change="(waypointState: any) => { onChangeWaitpoint(ds, waypointState) }">
                                                    <el-tooltip placement="bottom" raw-content 
                                                        v-if=" ds.metaData && ds.metaData .description ">
                                                        <template #content>
                                                            <div class="el-tooltip-text">
                                                                <div v-html="ds.metaData.description"></div>
                                                            </div>
                                                        </template>
                                                        <text-clamp
                                                            :text="ds.metaData.description.replace(/<[^>]*>/g, '')"
                                                            :max-lines="1">
                                                        </text-clamp>
                                                    </el-tooltip>
                                                </Waypoint>
                                            </div>
                                            <div class="d-flex">
                                                <div class="flex-fill w-50">
                                                    <div class="text-muted" style="font-size: 85%">
                                                        <span v-if=" ds.organization " 
                                                            class="d-flex align-items-center">
                                                            <el-icon class="text-primary">
                                                                <OfficeBuilding />
                                                            </el-icon>
                                                            <span class="ml-1">{{ ds.organization.name }}</span>
                                                        </span>
                                                    </div>
                                                    <div class="text-muted" style="font-size: 85%">
                                                        <span class="d-flex align-items-center">
                                                            <el-icon class="text-primary">
                                                                <Calendar />
                                                            </el-icon>
                                                            <span class="ml-1">{{
                                                                $filters.prettyDate(ds.created_at)}}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="ml-2 flex-fill w-50">
                                                    <div class="text-muted" style="font-size: 85%">
                                                        <span class="d-flex align-items-center">
                                                            <el-icon class="text-primary">
                                                                <Collection />
                                                            </el-icon>
                                                            <span class="ml-1">{{ ds.dialect }}</span>
                                                        </span>
                                                    </div>
                                                    <div class="text-muted">
                                                        <span class="d-flex align-items-center">
                                                            <el-icon v-if="ds.status" class="text-success">
                                                                <SuccessFilled />
                                                            </el-icon>
                                                            <el-icon v-else class="text-danger">
                                                                <CircleCloseFilled />
                                                            </el-icon>
                                                            <span style="font-size: 85%;" class="ml-1">{{ ds.status ? 'Good' : 'Not good' }}</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ml-3 align-self-start">
                                            <el-dropdown trigger="click">
                                                <span class="el-dropdown-link">
                                                    <el-icon>
                                                        <MoreFilled />
                                                    </el-icon>
                                                </span>
                                                <template #dropdown>
                                                    <el-dropdown-menu>
                                                        <el-dropdown-item
                                                            @click="$emit('onChangeView', { viewName: 'ModifyData', data: ds, })">
                                                            <el-icon :size="15" style=" vertical-align: middle; ">
                                                                <Edit />
                                                            </el-icon>
                                                            <span class="ml-1">Chỉnh sửa</span>
                                                        </el-dropdown-item>
                                                        <el-dropdown-item @click="
                                                            $emit('onChangeView', { viewName: 'AddData', data: ds, } )">
                                                            <el-icon :size="15" style="vertical-align: middle; ">
                                                                <CopyDocument />
                                                            </el-icon>
                                                            <span class="ml-1">Sao chép</span>
                                                        </el-dropdown-item>
                                                        <el-dropdown-item 
                                                            @click=" deleteDataSource( ds ) ">
                                                            <el-icon :size="15" class="text-danger" 
                                                                style=" vertical-align: middle; ">
                                                                <Delete />
                                                            </el-icon>
                                                            <span class="ml-1">Xoá</span>
                                                        </el-dropdown-item>
                                                    </el-dropdown-menu>
                                                </template>
                                            </el-dropdown>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
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
                        <el-pagination v-if=" listElements.data && listElements.data.length > 0 " 
                            class="" background layout="total, sizes, prev, pager, next"
                            v-model:current-page="listElements.pagination.page"
                            :page-size="listElements.pagination.size" :page-count="listElements.pagination.totalPages"
                            :total="listElements.pagination.totalElements" @size-change="getListData"
                            @current-change="getListData" />
                    </div>
                </div>
            </div> -->
            <!-- New datasource list with group -->
            <div class="flex-fill d-flex flex-column" v-if="listElements && listElements.length > 0">
                <el-scrollbar class="w-100 flex-fill">
                    <div class="mt-2 mr-3">
                        <div
                            class="mb-4"
                            v-for="(gItem, gIndex) in listElements" :key="gItem.id">
                            <div class="flex-fill d-none d-sm-none d-md-none d-lg-block">
                                <h5>
                                    <i class="fas fa-sitemap text-lightblue mb-1 mr-2"></i>
                                    <strong>{{ gItem.groupItem.name }} ({{ gItem.dataItems.length }} Dataset)</strong>
                                </h5>
                            </div>
                            <div class="row row-eq-height"> 
                                <div class="col-12 col-sm-12 col-md-6 col-lg-4 mb-3 d-flex"
                                    v-for="ds in gItem.dataItems" :key="ds.id">
                                    <el-card :body-style="{ padding: '0.5rem 0.8rem', }" class="w-100" 
                                        v-bind:class="{ 'ds-health-error': !ds.status, }">
                                        <div class="d-flex">
                                            <div>
                                                <img v-if="ds && ds.dialectIcon" 
                                                    v-lazy=" `/icons/databases/${ds.dialectIcon}` " class="mt-1" style="width: 5rem" />
                                                <img v-else v-lazy=" `/icons/databases/${getDbEngineIcon( ds, ds.dialect )}` " 
                                                    class="mt-1" style="width: 5rem" />
                                            </div>
                                            <div class="ml-2 flex-fill">
                                                <div class="mb-1">
                                                    <el-button size="large" link class="m-0 p-0" style="font-size: 1rem"
                                                        @click="
                                                            $emit(
                                                                'onChangeView',
                                                                {
                                                                    viewName:
                                                                        'ViewDetail',
                                                                    data: ds,
                                                                }
                                                            )
                                                        ">
                                                        <strong class="text-navy">{{
                                                            ds.name
                                                        }}</strong>
                                                    </el-button>
                                                </div>

                                                <div class="text-muted mb-1" style="font-size: 85%">
                                                    <Waypoint :tag="'div'"
                                                        @change="(waypointState: any) => { onChangeWaitpoint(ds, waypointState) }">
                                                        <el-tooltip placement="bottom" raw-content 
                                                            v-if=" ds.metaData && ds.metaData .description ">
                                                            <template #content>
                                                                <div class="el-tooltip-text">
                                                                    <div v-html=" ds .metaData .description "></div>
                                                                </div>
                                                            </template>
                                                            <text-clamp :text="
                                                                ds.metaData.description.replace( /<[^>]*>/g, '' ) " :max-lines="1">
                                                            </text-clamp>
                                                        </el-tooltip>
                                                    </Waypoint>
                                                </div>
                                                <div class="d-flex">
                                                    <div class="flex-fill w-50">
                                                        <div class="text-muted" style=" font-size: 85%; ">
                                                            <span v-if=" ds.organization " class="d-flex align-items-center">
                                                                <el-icon class="text-primary">
                                                                    <OfficeBuilding />
                                                                </el-icon>
                                                                <span class="ml-1">{{ ds.organization.name }}</span>
                                                            </span>
                                                        </div>
                                                        <div class="text-muted" style=" font-size: 85%; ">
                                                            <span class="d-flex align-items-center">
                                                                <el-icon class="text-primary">
                                                                    <Calendar />
                                                                </el-icon>
                                                                <span class="ml-1">{{
                                                                    $filters.prettyDate(
                                                                        ds.created_at
                                                                    )
                                                                }}</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div class="ml-2 flex-fill w-50">
                                                        <div class="text-muted" style=" font-size: 85%; ">
                                                            <span class="d-flex align-items-center">
                                                                <el-icon class="text-primary">
                                                                    <Collection />
                                                                </el-icon>
                                                                <span class="ml-1">{{
                                                                    ds.dialect
                                                                }}</span>
                                                            </span>
                                                        </div>
                                                        <div class="text-muted">
                                                            <span class="d-flex align-items-center">
                                                                <el-icon v-if="
                                                                    ds.status
                                                                " class="text-success">
                                                                    <SuccessFilled />
                                                                </el-icon>
                                                                <el-icon v-else class="text-danger">
                                                                    <CircleCloseFilled />
                                                                </el-icon>
                                                                <span style=" font-size: 85%; " class="ml-1">
                                                                    {{ ds.status ? 'Good' : 'Not good' }}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ml-3 align-self-start">
                                                <el-dropdown trigger="click">
                                                    <span class="el-dropdown-link">
                                                        <el-icon>
                                                            <MoreFilled />
                                                        </el-icon>
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
                                                            <el-dropdown-item @click=" $emit( 'onChangeView', { viewName: 'ModifyData', data: ds, } ) ">
                                                                <el-icon :size="15" style=" vertical-align: middle; ">
                                                                    <Edit />
                                                                </el-icon>
                                                                <span class="ml-1">Chỉnh
                                                                    sửa</span>
                                                            </el-dropdown-item>
                                                            <el-dropdown-item @click=" $emit( 'onChangeView', { viewName: 'AddData', data: ds, } ) ">
                                                                <el-icon :size="15" style=" vertical-align: middle; ">
                                                                    <CopyDocument />
                                                                </el-icon>
                                                                <span class="ml-1">Sao
                                                                    chép</span>
                                                            </el-dropdown-item>
                                                            <el-dropdown-item @click=" deleteDataSource( ds ) ">
                                                                <el-icon :size="15" class="text-danger" 
                                                                    style=" vertical-align: middle; ">
                                                                    <Delete />
                                                                </el-icon>
                                                                <span class="ml-1">Xoá</span>
                                                            </el-dropdown-item>
                                                        </el-dropdown-menu>
                                                    </template>
                                                </el-dropdown>
                                            </div>
                                        </div>
                                    </el-card>
                                </div>
                            </div>
                            <hr v-if="gIndex < listElements.length - 1"/>
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
                </div>
            </div>
            <div v-else class="flex-fill d-flex flex-column">
                <no-data />
            </div>
        </div>
    </div>
</template>
<style scoped>
.ds-health-error {
    /* background-color: #ffe0e0; */
}
</style>
