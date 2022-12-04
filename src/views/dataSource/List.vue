<script lang="ts" src="@/scripts/dataSource/list.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100"
        v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4>
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>Nguồn dữ liệu</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">
                <div class="ml-1 mr-1">
                    <el-select v-model="sourceData" filterable placeholder="Nguồn dữ liệu.." size="large">
                        <el-option label="All" value="" />
                        <el-option v-for="item in organization" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </div>
                <div class="ml-1 mr-1">
                    <el-select v-model="typeDataFormat" filterable placeholder="Loại dữ liệu.." size="large">
                        <el-option v-for="item in typeOfData" :key="item.id" :label="item.name" :value="item.id"
                            style="height: auto;">
                            <div class="d-flex align-items-center">
                                <div class="mt-1 mb-1">
                                    <img :src="`/icons/databases/${item.iconName}`" style="width: 2rem;" />
                                </div>
                                <div class="ml-3">
                                    {{ item.name }}
                                </div>
                            </div>
                        </el-option>
                    </el-select>
                </div>
                <div class="ml-1 mr-1">
                    <el-input v-model="filterQuery" filterable placeholder="Nhập để lọc dữ liệu.." size="large"
                        style="min-width: 16rem">
                        <template #prepend>
                            <el-icon style="vertical-align: middle">
                                <Search />
                            </el-icon>
                        </template>
                    </el-input>
                </div>
                <div class="ml-1">
                    <el-button size="large" type="primary"
                        @click="$emit('onChangeView', { viewName: 'AddData', data: {} })">
                        <el-icon :size="20" style="vertical-align: middle">
                            <Plus />
                        </el-icon>
                    </el-button>

                    <el-button size="large" type="primary" @click="getDataSources()">
                        <el-icon :size="20" style="vertical-align: middle">
                            <Refresh />
                        </el-icon>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
            <div class="flex-fill d-flex flex-column"
                v-if="(datasources && datasources.length > 0)">
                <el-scrollbar class="w-100 flex-fill">
                    <div class="mt-2 mr-3">
                        <div class="row">
                            <div class="col-12 col-sm-6 col-md-4 mb-3" 
                                v-for="ds in datasources" :key="ds.id">
                                <el-card :body-style="{ padding: '0.5rem 0.8rem' }">
                                    <div class="d-flex">
                                        <div>
                                            <img src="/custom-img/postgre.png" class="mt-1" style="width: 5rem" />
                                        </div>
                                        <div class="ml-2 flex-fill">                                            
                                            <div>
                                                <strong class="text-navy">{{ ds.name }}</strong>
                                            </div>
                                            <div class="d-flex">
                                                <div class="flex-fill w-50">
                                                    <div class="text-muted" style="font-size: 85%">{{ ds.dialect }}</div>
                                                    <div class="text-muted" style="font-size: 85%">
                                                        {{ ds.organization }}
                                                    </div>
                                                    <div class="text-muted" style="font-size: 85%">
                                                        {{ $filters.prettyDate(ds.created_at) }}
                                                    </div>
                                                    <div class="text-muted" style="font-size: 85%">
                                                        <span>Chưa có mô tả</span>
                                                    </div>
                                                </div>
                                                <div class="ml-2 flex-fill w-50">
                                                    <div style="font-size: 85%">
                                                        <span class="text-muted">{{ ds.host }}</span>
                                                    </div>
                                                    <div class="text-muted" style="font-size: 85%">Port {{ ds.port }}</div>
                                                    <div class="text-muted" style="font-size: 85%">
                                                        <span>{{ds.username}}</span>
                                                    </div>
                                                    <div class="text-muted" style="font-size: 85%">
                                                        {{ ds.status ? "Good" : "Not good" }}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                        <div class="ml-2 align-self-start">
                                            <el-button size="large" link
                                                @click="$emit('onChangeView', { viewName: 'ModifyData', data: ds })">
                                                <el-icon :size="20" style="vertical-align: middle">
                                                    <Edit />
                                                </el-icon>
                                            </el-button>
                                        </div>
                                    </div>
                                </el-card>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>            
                <div class="mt-3 d-flex align-items-center pr-2 p-1">
                    <div class="flex-fill pl-2 d-flex align-items-center">
                        <el-icon class="text-primary mt-1 mr-1">
                            <Clock />
                        </el-icon>
                        <span><strong>Last update:</strong> 2 seconds ago</span>
                    </div>
                    <div>
                        <el-pagination class="" background layout="total, sizes, prev, pager, next, jumper" :total="1000" />
                    </div>
                </div>
            </div>
            <div v-else class="flex-fill d-flex flex-column">
                <no-data/>
            </div>
        </div>
    </div>
</template>