<script lang="ts" src="@/scripts/dataSource/viewDetail.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4 class="mb-0">
                    <i class="fas fa-info-circle text-lightblue mr-2"></i>
                    <strong v-if="(ds && ds.name)">
                        {{ ds.name }}
                    </strong>
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
        <div class="d-flex flex-fill mt-2 pr-0" v-if="ds">
            <div class="flex-fill pb-0 pt-2 mr-4">
                <div class="hoz-content-wrap mb-2 mb-md-0" >
                    <el-scrollbar style="max-width: 100%;" >
                        <div class="scrollbar-flex-content mt-1 ml-1">
                            <div class="card p-2 pl-3 pr-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Đơn vị</div>
                                <h5 class="mt-1">{{ ds.organization }}</h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Dialect</div>
                                <h5 class="mt-1">{{ ds.dialect }}</h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Ngày khởi tạo</div>
                                <h5 class="mt-1">{{ $filters.prettyDate(ds.created_at) }}</h5>
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
                                <div>Username</div>
                                <h5 class="mt-1">{{ ds.username }}</h5>
                            </div>
                            <div class="card p-2 pl-3 pr-3 ml-3 text-nowrap scrollbar-dbinfo-item">
                                <div>Trạng thái</div>
                                <h5 class="mt-1">{{ ds.status ? "Good" : "Not good" }}</h5>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div>
                    <component :is="currentView" @processingEvent="processingEvent"></component>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.hoz-content-wrap{
    width: calc(100vw - 3rem);
}


.scrollbar-flex-content {
    display: flex;
}

.scrollbar-dbinfo-item {
    flex-shrink: 0;
    width: auto;
}

@media screen and (min-width: 992px){
    .hoz-content-wrap{
        width: calc(100vw - 3rem - 250px);
    }
}
</style>