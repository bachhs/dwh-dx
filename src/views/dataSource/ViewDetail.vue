<script lang="ts" src="@/scripts/dataSource/viewDetail.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4 class="mb-0 d-flex align-items-center" v-if="ds && ds.name">
                    <i class="fas fa-info-circle text-lightblue mr-2"></i>
                    <el-button link style="font-size: 90%; padding: 0; margin: 0;"
                        v-for="(breadcrumbItem, indexBredcumb) in breadcrumbs"
                        :key="indexBredcumb"
                        @click="processingEvent({ eventName: breadcrumbItem.view, dataItem: breadcrumbItem.data })">
                        <el-icon
                            v-if="indexBredcumb > 0"
                            size="14"
                            class="ml-1 mr-1"
                            ><ArrowRight
                        /></el-icon>
                        {{ breadcrumbItem.label }}
                    </el-button>
                </h4>
            </div>
            <div class="d-flex align-items-center">
                <div class="ml-1 mr-4">
                    <el-button type="primary"
                        @click="refreshData">
                        <el-icon><Refresh /></el-icon>
                        <span>Refresh</span>
                    </el-button>

                    <el-button
                        size="default"
                        type="danger"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null, })" >
                        <div>Thoát</div>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="d-flex flex-fill mt-2 pr-0" v-if="ds">
            <div class="flex-fill pb-0 pt-2 mr-4">
                <div class="hoz-content-wrap mb-2 mb-md-0">
                    <el-scrollbar style="max-width: 100%">
                        <div class="scrollbar-flex-content mt-1 ml-1">
                            <div class="card p-2 pl-3 pr-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Đơn vị</div>
                                <h5 class="mt-1">{{ ds.organization.name }}</h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Dialect</div>
                                <!-- <h5 class="mt-1">{{ ds.dialect }}</h5> -->
                                <div class="d-flex align-items-center">
                                    <div class="mt-1 mb-1 mr-2"
                                        v-if="dataEngineItem && dataEngineItem !== null && dataEngineItem.iconName">
                                        <img :src="`/icons/databases/${dataEngineItem.iconName}`"
                                            style=" height: 1.5rem; " />
                                    </div>
                                    <div v-if="dataEngineItem && dataEngineItem !== null">
                                        <h5 class="mt-1">{{dataEngineItem.name}}</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Host</div>
                                <h5 class="mt-1">{{ ds.host }}</h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Port</div>
                                <h5 class="mt-1">{{ ds.port }}</h5>
                            </div>
                            
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Trạng thái</div>
                                <h5 class="mt-1">
                                    {{ ds.status ? "Good" : "Not good" }}
                                </h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item"
                                v-if="ds.metaData && ds.metaData.version">
                                <div>Version</div>
                                <h5 class="mt-1">
                                    {{ ds.metaData.version }}
                                </h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Ngày khởi tạo</div>
                                <h5 class="mt-1">
                                    {{ $filters.prettyDate(ds.created_at) }}
                                </h5>
                            </div>
                            <div class="flex-fill d-none d-md-flex align-items-center card p-2 pl-3 pr-3 ml-3 mr-1 scrollbar-dbinfo-item">
                                <div class="d-flex w-100">
                                    <div class="flex-fill">
                                        <el-tooltip placement="bottom" raw-content 
                                            v-if="ds.metaData && ds.metaData.description">
                                            <template #content>
                                                <div class="el-tooltip-text">
                                                    <div v-html="ds.metaData.description">
                                                        
                                                    </div>
                                                </div>
                                            </template>                                    
                                            <div class="text-normal text-left w-100 line-clamp-2" 
                                                v-html="ds.metaData.description">
                                        
                                            </div>
                                        </el-tooltip>
                                    </div>
                                    <div>                                        
                                        <SetDescriptionModal v-model="ds.metaData.description"
                                            @onFormSubmit="updateDataSourceDesc">
                                            <template #label>
                                                <span class="m-2 d-flex align-items-center">
                                                    <el-icon :size="20">
                                                        <Edit />
                                                    </el-icon>
                                                </span>
                                            </template>
                                        </SetDescriptionModal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <!-- <div class="card p-2 pl-3 pr-3"
                    v-if="ds.metaData.description">
                    <div class="d-flex">
                        <div class="flex-fill" v-html="ds.metaData.description">
                            
                        </div>
                        <div class="ml-2">
                            <SetDescriptionModal>
                                <template #label>
                                    <div class="m-2 d-flex align-items-center">
                                        <el-icon :size="20">
                                            <Edit />
                                        </el-icon>
                                        <span class="ml-2">Edit</span>
                                    </div>
                                </template>
                            </SetDescriptionModal>
                        </div>
                    </div>
                </div> -->
                <div>
                    <component ref="currentViewRef"
                        :is="currentView"
                        @processingEvent="processingEvent"
                        :viewSettings="currentViewProps"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hoz-content-wrap {
    width: calc(100vw - 3rem);
}

.scrollbar-flex-content {
    display: flex;
}

.scrollbar-dbinfo-item {
    flex-shrink: 0;
    width: auto;
}

@media screen and (min-width: 992px) {
    .hoz-content-wrap {
        width: calc(100vw - 3rem - 250px);
    }
}
</style>
